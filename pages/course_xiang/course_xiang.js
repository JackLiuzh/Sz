// pages/course_xiang/course_xiang.js
var total_micro_second = 10000 * 10000;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock:'',
    currentData: 0,
    info:'',
    system_id:'',
    system_id:'',
    clientHeight:500,

    uid:0,
    time: "获取验证码",
    currentTime: 61,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.system_id)
    this.data.system_id = options.system_id
    this.setData({system_id:options.system_id})
    this.initscreen()

    var uid = wx.getStorageSync('uid');
    this.setData({ uid: uid })
  },
  onShow:function(){
     var options ={
       system_id: this.data.system_id
     }
    console.log(options);
    this.initData(options.system_id)
  },
  // 初始化屏幕高度
  initscreen: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ clientHeight: res.windowHeight })
      },
    })
  },
  bindchange:function(e){
     const that = this;
     that.setData({
         currentData: e.detail.current
     })
  },
  //跳转去看视频
  gokan_video: function (e){
    var system_id = e.currentTarget.dataset.system_id
    var lesson_id = e.currentTarget.dataset.lesson_id
    // console.log(e)
    wx.navigateTo({
      url: '/pages/kan_video/kan_video?system_id=' + system_id + '&lesson_id=' + lesson_id,
    })
  },

  checkCurrent: function(e){
     const that = this
     if(that.data.currentData === e.target.dataset.current){
        return false;
     }else{
        that.setData({
           currentData: e.target.dataset.current
        })
     }
  },
  
  //初始化详情页数据
  initData: function (system_id){
     var that = this
     var token = wx.getStorageSync("token")
     var uid  = wx.getStorageSync("uid")
     var params = {
        token : token,
        system_id: system_id,
        uid: uid
     }
    app.sz.courseDetail(params).then(d=>{
         if(d.data.status ==1){
             that.setData({info: d.data.data})
             that.count_down(this);
             that.zhankai()
         }else{
            console.log("详情页数据接口错误")
         }
    })
  },
  //默认展开
  zhankai:function(){
      var that = this
      var info = that.data.info.info
      if(info){
          info.forEach(function(item,index){
            var dd = 'info.info[' + index + '].iszhedie'
            that.setData({ [dd]: true })
          })
      }

  },
  zhedie: function(e){
    //  console.log(e)
     var index = e.currentTarget.dataset.index
    if (this.data.info.info[index].iszhedie){
      var dd = 'info.info[' + index + '].iszhedie'
      this.setData({ [dd]: false })
    }else{
      var dd = 'info.info[' + index + '].iszhedie'
      this.setData({ [dd]: true })
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
  gobuy_page: function(){
    var that = this
    var miaosha = 0
    if (that.data.info.discount_price){
      miaosha = 1
    }
    var course = {
       title: that.data.info.title,
       video_tot : that.data.info.video_tot,
       point_tot : that.data.info.point_tot,
       question_tot: that.data.info.question_tot,
       price: that.data.info.price,
       discount_price: that.data.info.discount_price
    }
    var dd = JSON.stringify(course)
     wx.navigateTo({
       url: '/pages/course_buy/course_buy?system_id=' + that.data.system_id+'&miaosha=' + miaosha +'&course=' + dd,
     })
  },
  count_down: function(that){
      var newTime = new Date().getTime()
      var endTime = that.data.info.discount_end_time * 1000;
      that.setData({
        clock: that.date_format(endTime)
      });
      
     
      if (newTime - endTime > 0){
        that.setData({ clock: '已经截止' });
        return;
      }
      
      setTimeout(function(){
         //total_micro_second -= 10;
         that.count_down(that)
        //  console.log("hh")
      },1000)
  },

  date_format: function (endTime){
    var that = this
    var newTime = new Date().getTime()
    var time = (endTime - newTime) /1000
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    
    var obj ={
      day: that.fill_zero_prefix(day),
      hou: that.fill_zero_prefix(hou),
      min: that.fill_zero_prefix(min),
      sec: that.fill_zero_prefix(sec)
    }
    // return hr + ":" + min + ":" + sec ;
    // console.log(obj)
    return obj
  },

  fill_zero_prefix: function(num){
     return num < 10 ? '0' + num : num
  },

  my_login_mk: function (e) {
    this.setData({
      mkdl_showModal: true  //买课登录蒙层
    })
  },

  go_mk: function () {
    this.setData({
      mkdl_showModal: false     //关闭买课登录蒙层，x图标
    })
  },

  inputphone: function (e) {
    this.setData({
      dphone: e.detail.value
    })
    console.log(this.data.dphone)
  },

  //登录输入验证码
  inputcode: function (e) {
    this.setData({
      code: e.detail.value
    })
    console.log(this.data.code)
  },

  //获取验证码
  getYzm: function (e) {
    var that = this
    var token = wx.getStorageSync('token');
    var phone = this.data.dphone;
    if (this.data.disabled || !phone) {
      return;
    }
    // console.log(phone)
    var params = {
      "token": token,
      "phone": phone,
    }
    console.log(params)
    app.sz.xcxMyGetyzm(params).then(d => {
      if (d.data.status == 1) {
        console.log('成功')
        that.setData({
          disabled: true
        })
        let interval = null;
        let currentTime = that.data.currentTime;
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            time: currentTime,
            suffix: ' s '
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: '重新发送',
              suffix: '',
              currentTime: 61,
              disabled: false
            })
          }
        }, 1000)
      } else {
        wx.showToast({
          title: d.data.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },


  //买课输入验证码登录
  Sendyzm_mk: function (e) {

    var that = this
    var phone = this.data.dphone;
    var params = {
      "phone": phone,
      "code": this.data.code,
    }
    if (!phone || !this.data.code) {
      return;
    }
    app.sz.loginRegister(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ isbuy: d.data.data.isbuy, avatarUrl: d.data.data.avatar, nickName: d.data.data.name })
        if (d.data.data.phone != '')
          this.setData({ userphone: d.data.data.phone })
        console.log(d.data.msg)
        wx.setStorageSync("uid", d.data.data.uid)
        wx.setStorageSync("token", d.data.data.token)
        wx.setStorageSync('userInfo', d.data.data)

        that.gobuy_page()
        // console.log(this.data.system_id + 'cscscscs')
        // wx.navigateTo({
        //   url: '/pages/course_xiang/course_xiang?system_id=' + this.data.system_id,
        // })
        this.setData({
          // showModal_pb: false,
          mkdl_showModal: false
        })

      } else {
        wx.showToast({
          title: d.data.msg,
          icon: 'none',
          duration: 1000
        })
        console.log(d.data.msg)
      }

    })
    
  },

  getPhoneNumber_mk: function (e) {
    var that = this

    wx.login({
      success: res => {
        // that.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          wx.showLoading({
            title: '登录中...',
          })
          let iv = encodeURIComponent(e.detail.iv);
          let encryptedData = encodeURIComponent(e.detail.encryptedData);
          let code = res.code
          var params = {
            "code": code,
            "iv": iv,
            "encryptedData": encryptedData
          }
          console.log(params)
          app.sz.loginregister(params).then(d => {
            // console.log(d)
            if (d.data.status == 0) {
              // app.wechat.setStorage('isauth', true);
              app.wechat.setStorage('token', d.data.token);
              app.wechat.setStorage('uid', d.data.uid);
              app.globalData.uid = d.data.uid;
              app.wechat.setStorage('userInfo', d.data.userInfo)
              // if (d.data.isfirstlogin == 1) {
              // wx.switchTab({ url: '../today_task/today_task' })
              // wx.switchTab({ url: '../first_page/first_page' })
              // console.log(this.data.system_id + 'cscscscs')
              // wx.navigateTo({
              //   url: '/pages/course_xiang/course_xiang?system_id=' + this.data.system_id,
              // })
              that.gobuy_page()
              this.setData({
                // showModal_pb: false,
                mkdl_showModal: false
              })
              // }
              // else {

              // }
              //自动创建任务

            } else {
              // app.wechat.setStorage('isauth', false);
            }
            wx.hideLoading()
          })
        } else {
          // that.setData({
          //   showModal: true
          // })
        }
      }
    })
  },
  
  


})