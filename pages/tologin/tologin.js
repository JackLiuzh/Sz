// pages/tologin/tologin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindGetUserInfo: function(e) {
    wx.showLoading({
      title: '登录中...',
    })
    var that =this;
    // app.wechat.setStorage('userInfo',e.detail.userInfo);
    // 获取用户信息
    if (e.detail.userInfo) {
      console.log(e);
      app.wechat.setStorage('userInfo', e.detail.userInfo);
      var userInfo = e.detail.userInfo;
      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;
      //var uid = app.wechat.getStorage('uid');
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            app.wechat.setStorage('isauth', true);
            app.wechat.login().then(d=>{
               //console.log("zheshi"+d.code)
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
                          // wx.redirectTo({ url: '../today_task/today_task' })
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

    // wx.getUserInfo({
    //   success: function (res) {
    //     var userInfo = res.userInfo
    //     var nickName = userInfo.nickName
    //     var avatarUrl = userInfo.avatarUrl
    //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //     var province = userInfo.province
    //     var city = userInfo.city
    //     var country = userInfo.country
    //     console.log(res)
    //   }
    // })
    
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