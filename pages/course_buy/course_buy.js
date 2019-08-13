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
    courseinfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // console.log(this.data.name_phone)
    var course = JSON.parse(options.course)
    this.setData({ courseinfo: course,miaosha:options.miaosha})

    this.initdata(options.system_id,options.miaosha)
  },
  zhifu: function() {
     var that =this
     console.log(222)
     var token = wx.getStorageSync("token")
     var uid = wx.getStorageSync("uid")
     var order_sn = that.data.data.order_sn
     var type = 3  
     var addr_id = that.data.data.address.addr_id
     if(addr_id> 0){
        var params = {
          token: token,
          uid : uid,
          order_sn: order_sn,
          type: 3,
          addr_id :addr_id
        }
        app.sz.coursePay(params).then(d=>{
           console.log(d)
        })
     }else {
         wx.showToast({
           title: '请添加地址',
           icon: 'none',
           duration: 2000
         })
     }
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
          // that.data.amount = d.data.data.amount
          that.setData({data:d.data.data})
        }else {
          console.log("生成订单接口报错")
        }
         
     }) 
  }

})