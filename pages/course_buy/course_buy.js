// pages/course_buy/course_buy.js
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {

    name_phone:'',
    addr:'',
    system_id:'',
    miaosha:'',
    data:'',
    courseinfo:'',
    coupon:'',//优惠券
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // console.log(this.data.name_phone)
    var course = JSON.parse(options.course)
    this.setData({ courseinfo: course,miaosha:options.miaosha,system_id:options.system_id})
    this.initdata(options.system_id,options.miaosha)
  },
  zhifu: function() {
     var that =this
     console.log(222)
     
     wx.login({
        success(res){
     var token = wx.getStorageSync("token")
     var uid = wx.getStorageSync("uid")
     var order_sn = that.data.data.order_sn
     var type = 3  
     var addr_id = that.data.data.address.addr_id
     var is_datum = that.data.data.courseInfo.is_datum
     var coupon_id = that.data.coupon.coupon_id
     if(is_datum == 0){ //不填地址可以生成订单
         var params = {
           token: token,
           uid: uid,
           order_sn: order_sn,
           type: 3,
           coupon_id:coupon_id,
           code:res.code
         }
         app.sz.coursePay(params).then(d=>{
           if (d.data.data.paystr) {
             var ob = JSON.parse(d.data.data.paystr)
             var timeStamp = ob.timeStamp
             var nonceStr = ob.nonceStr
             var pack = ob.package
             var paySign = ob.paySign
             that.laqizhifu(timeStamp, nonceStr, pack, paySign)
           } else {
             console.log("支付接口错误")
           }
         })
     }else{
          if(addr_id > 0){
            var copid = ''
            if(coupon_id){
               copid = coupon_id
            }
            var params = {
              token: token,
              uid: uid,
              order_sn: order_sn,
              type: 3,
              addr_id: addr_id,
              coupon_id: copid,
              code:res.code
            }
            app.sz.coursePay(params).then(d => {
              // console.log(d.data.data.paystr)
              if (d.data.data.paystr) {
                var ob = JSON.parse(d.data.data.paystr)
                var timeStamp = ob.timeStamp
                var nonceStr = ob.nonceStr
                var pack = ob.package
                var paySign = ob.paySign
                that.laqizhifu(timeStamp, nonceStr, pack, paySign)
              } else {
                console.log("支付接口错误")
              }
            })

          }else{
            wx.showToast({
              title: '请添加地址',
              icon: 'none',
              duration: 2000
            })
          }
     }

     
      }
    }) 
  },
  //拉起微信支付
  laqizhifu: function (timeStamp, nonceStr, pack, paySign){
    wx.requestPayment({
      timeStamp: timeStamp, 
      nonceStr: nonceStr,
      package: pack,
      signType: 'MD5',
      paySign: paySign,
      success(res) { 
        console.log(11)
        wx.navigateBack({
          delta: 1
        })
      },
      fail(res) { 
        console.log("失败")
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   name_phone: wx.getStorageSync('namephone'),
    //   addr: wx.getStorageSync('address')
    // })
    // this.initdata(this.data.system_id, this.data.miaosha)
    this.initaddr(this.data.system_id, this.data.miaosha)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // hh: function () {
  //   this.setData({
  //     name_phone : wx.getStorageSync('namephone'),
  //     addr : wx.getStorageSync('address')
  //   })
  //   console.log(this.data.name_phone)
  // },

  add_addr: function () {
    wx.navigateTo({
      url: '../add_address/add_address'
    })
  },
  initdata: function(system_id,miaosha){
     var that = this
     var token = wx.getStorageSync("token")
     var uid  = wx.getStorageSync("uid")
     var params = {
        system_id:system_id,
        miaosha: miaosha,
        token: token,
        uid :uid
     }
     app.sz.createCourseOrder(params).then(d=>{
        //  console.log(d)
        if(d.data.status == 1){
          // that.data.amount = d.data.data.amount d.data.data.coupon
          that.setData({ data: d.data.data, coupon: d.data.data.coupon})
          var coupon_pice = parseFloat(d.data.data.coupon.c_price)
          var ddd = that.data.data.amount
          if(coupon_pice){
            var zong = parseFloat(that.data.data.amount)
             ddd = (zong - coupon_pice).toFixed(2)
          }
          that.setData({ count:ddd})

        }else {
          console.log("生成订单接口报错")
        }
         
     }) 
  },
  initaddr: function (system_id, miaosha){
    var that = this
    var token = wx.getStorageSync("token")
    var uid = wx.getStorageSync("uid")
    var params = {
      system_id: system_id,
      miaosha: miaosha,
      token: token,
      uid: uid
    }
    app.sz.xcxorderaddress(params).then(d => {
      //  console.log(d)
      if (d.data.status == 1) {
        console.log(d.data.data.address)
        // that.data.amount = d.data.data.amount d.data.data.coupon
        if (d.data.data.address){
          var r = 'data.address'
          that.setData({ [r]: d.data.data.address })
        }
      } else {
        console.log("获取收货地址接口错误")
      }

    }) 
  }

})