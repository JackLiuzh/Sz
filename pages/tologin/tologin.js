// pages/tologin/tologin.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    iv: '',
    encryptedData: '',
  },
  //获取手机号登陆微信小程序
  getPhoneNumber: function(e){
    wx.showLoading({
      title: '登录中...',
    })
    wx.login({
      success: res => {
        // that.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
        if (e.detail.errMsg == "getPhoneNumber:ok") {
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
              app.wechat.setStorage('isauth', true);
              app.wechat.setStorage('token', d.data.token);
              app.wechat.setStorage('uid', d.data.uid);
              app.globalData.uid = d.data.uid;
              app.wechat.setStorage('userInfo',d.data.userInfo)
              if (d.data.isfirstlogin == 1) {
                // wx.switchTab({ url: '../today_task/today_task' })
                wx.switchTab({ url: '../course_new/course_new' })
              }else{
                wx.redirectTo({ url: '../first_comming/first_comming' })
              }
            } else {
              app.wechat.setStorage('isauth', false);
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
  bindGetUserInfo: function(e) {
    wx.showLoading({
      title: '登录中...',
    })
    var that =this;
    // 获取用户信息
    if (e.detail.userInfo) {
      console.log(e);
      app.wechat.setStorage('userInfo', e.detail.userInfo);
      var userInfo = e.detail.userInfo;
      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            app.wechat.setStorage('isauth', true);
            app.wechat.login().then(d=>{
                console.log(d)
                var params = {
                  "code": d.code,
                  "encryptedData": encryptedData,
                  "iv": iv,
                  "userinfo": userInfo
                }
                app.sz.loginregister(params).then(d => {
                    app.wechat.setStorage("uid",d.data.uid).then(s=>{
                        wx.hideLoading()
                        if(d.data.isfirstlogin == 1){
                          wx.switchTab({ url: '../today_task/today_task' })
                          wx.setStorageSync("token", d.data.token)
                          app.globalData.token = d.data.token
                        }else{
                          wx.redirectTo({ url: '../first_comming/first_comming'})
                        }
                    })
                })

            })
            
          } else {
            app.wechat.setStorage('isauth', false);
          }
          
        }
      })
      
    } else {
       console.log("用户拒绝授权用户信息")
       wx.hideLoading()
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  tiao: function() {
      wx.switchTab({ url: '../daka/daka' })
    // wx.navigateBack({
    //   delta: 1
    // })
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

  }
})