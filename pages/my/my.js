// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // region: ['广东省', '广州市', '海珠区'],
    // customItem: '全部'
    
    avatarUrl: "../../images/weidenglu.png",//用户头像
    nickName: "去登陆",//用户昵称
   
    showModal: false,
    user_area: '',
    dphone: '',
    isbuy: 0,
    code: '',
    userphone: '',
    code:'',
    iv:'',
    encryptedData:'',

  },

  getPhoneNumber: function (e) {
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
              app.wechat.setStorage('isauth', true);
              app.wechat.setStorage('token', d.data.token);
              app.wechat.setStorage('uid', d.data.uid);
              app.globalData.uid = d.data.uid;
              app.wechat.setStorage('userInfo', d.data.userInfo)
              if (d.data.isfirstlogin == 1) {
                // wx.switchTab({ url: '../today_task/today_task' })
                // wx.switchTab({ url: '../first_page/first_page' })
                that.xcxSubmitTask(d.data.uid)
                var uid = wx.getStorageSync('uid');
                var token = wx.getStorageSync('token');
                var params = {
                  "uid": uid,
                  "token": token,
                }

                // console.log(params)

                app.sz.xcxMy(params).then(d => {
                  if (d.data.status == 1) {
                    // that.setData({ isbuy: d.data.data.isbuy, avatarUrl: d.data.data.avatar, })
                    that.setData({ isbuy: d.data.data.isbuy, avatarUrl: d.data.data.avatar, nickName: d.data.data.name })
                    if (d.data.data.phone != '')
                      that.setData({ userphone: d.data.data.phone })
                    // console.log(this.data.userphone)
                  } else {
                    // console.log(d.data.msg)
                  }
                })
              }
               else {
                var uid = wx.getStorageSync('uid');
                var token = wx.getStorageSync('token');
                var params = {
                  "uid": uid,
                  "token": token,
                }

                // console.log(params)

                app.sz.xcxMy(params).then(d => {
                  if (d.data.status == 1) {
                    // that.setData({ isbuy: d.data.data.isbuy, avatarUrl: d.data.data.avatar, })
                    that.setData({ isbuy: d.data.data.isbuy, avatarUrl: d.data.data.avatar, nickName: d.data.data.name })
                    if (d.data.data.phone != '')
                      that.setData({ userphone: d.data.data.phone })
                    // console.log(this.data.userphone)
                  } else {
                    // console.log(d.data.msg)
                  }
                })
              }
              //自动创建任务

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this;
    // var that = this;
    // wx.getUserInfo({
    //   success: function (res) {
    //     // console.log(avatarUrl);
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       [avatarUrl]: res.userInfo.avatarUrl,
    //       [nickName]: res.userInfo.nickName,
    //     })
    //   }
    // })
    // var userinfo = wx.getStorageSync('userInfo');
    // this.setData({ nickName: userinfo.name, avatarUrl: userinfo.avatar, userphone: userinfo.phone})
    // // console.log(this.data.nickName)
    // console.log(this.data.avatarUrl)
    // console.log(this.data.userphone)

    let islogin = wx.getStorageSync('isauth');
    if (islogin){
      var uid = wx.getStorageSync('uid');
      var token = wx.getStorageSync('token');
      var params = {
        "uid": uid,
        "token": token,
      }

      // console.log(params)

      app.sz.xcxMy(params).then(d => {
        if (d.data.status == 1) {
          that.setData({ isbuy: d.data.data.isbuy, avatarUrl: d.data.data.avatar, nickName: d.data.data.name })
          if (d.data.data.phone != '')
            that.setData({ userphone: d.data.data.phone })
          // console.log(this.data.userphone)
        } else {
          // console.log(d.data.msg)
        }
      })
    }
    
    
    // wx.login({
    //   success: res => {
    //     that.setData({ code: res.code})
    //   }
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.onLoad();

    this.setData({
      user_area: wx.getStorageSync('address')
    })
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

  inputphone: function (e) {
    this.setData({
      dphone: e.detail.value
    })
    console.log(this.data.dphone)
  },

  inputcode: function (e) {
    this.setData({
      code: e.detail.value
    })
    console.log(this.data.code)
  },

  getYzm: function (e) {
    // this.setData({
    //   dphone: e.detail.value
    //  })
    // console.log(this.data.dphone)

    var token = wx.getStorageSync('token');
    var phone = this.data.dphone; 
    // console.log(phone)
    var params = {
      "token": token,
      "phone": phone,
    }
    console.log(params)
    app.sz.xcxMyGetyzm(params).then(d => {
      if (d.data.status == 1) {
        console.log(console.log(d.data.msg))
      } else {
        console.log(console.log(d.data.msg))
      }
    })
  },

  Sendyzm: function () {
    var token = wx.getStorageSync('token');
    var uid = wx.getStorageSync('uid');
    var phone = this.data.dphone; 
    var params = {
      "uid": uid,
      "token": token,
      "phone": phone,
      "code": this.data.code,
    }
    // console.log(params)
    app.sz.xcxMySendyzm(params).then(d => {
      if (d.data.status == 1) {
        
        console.log(d.data.msg)
      } else {
        console.log(d.data.msg)
      }
    })
    this.setData({
      showModal: false
    })

  },

  showModal: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },

  go: function () {
    this.setData({
      showModal: false
    })
  },

  feedback: function () {
    wx.navigateTo({
      url: '../my_feedback/my_feedback'
    })
  },

  addAddress: function () {
    wx.navigateTo({
      url: '../my_addr/my_addr'
    })
  },

  mySet: function () {
    wx.navigateTo({
      url: '../my_set/my_set'
    })
  },

  downloadApp: function () {
    wx.navigateTo({
      url: '../download_app/download_app'
    })
  },
  

  // getPhoneNumber: function (e) {
  //   var that = this
  //   wx.checkSession({
  //     success: function () {
  //       if (e.detail.errMsg == "getPhoneNumber:ok") {
  //         let iv = encodeURIComponent(e.detail.iv);
  //         let encryptedData = encodeURIComponent(e.detail.encryptedData);
  //         let uid = app.globalData.uid;
  //         var params = {
  //           "code": that.data.code,
  //           "iv": iv,
  //           "encryptedData": encryptedData,
  //           "uid": uid,
  //           "XDEBUG_SESSION_START": 141454
  //         }
  //         app.sz.xcxphone(params).then(d => {
  //           if (d.data.status == 0) {
  //             that.setData({ userphone: d.data.data.phoneNumber })
  //             console.log(d.data.msg)
  //           } else {
  //             console.log(d.data.msg)
  //           }
  //         })

  //       } else {
  //         // that.setData({
  //         //   showModal: true
  //         // })
  //       }                    
  //     },
  //     fail: function () {
  //       console.log("code失效");
  //       wx.login({
  //         success: res => {
  //           that.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
  //           if (e.detail.errMsg == "getPhoneNumber:ok") {

  //             let iv = encodeURIComponent(that.data.iv);
  //             let encryptedData = encodeURIComponent(that.data.encryptedData);
  //             let uid = app.globalData.uid;
  //             var params = {
  //               "code": that.data.code,
  //               "iv": iv,
  //               "encryptedData": encryptedData,
  //               "uid": uid,
  //               "XDEBUG_SESSION_START": 141454
  //               // "code": this.data.code,
  //             }
  //             console.log(params)
  //             app.sz.xcxphone(params).then(d => {
  //               if (d.data.status == 0) {
  //                 console.log(d.data.msg)
  //               } else {
  //                 console.log(d.data.msg)
  //               }
  //             })
  //           } else {
  //             // that.setData({
  //             //   showModal: true
  //             // })
  //           }
  //         }
  //       })
  //     }
  //   })
  // },

  go_youhuiquan: function () {
    wx.navigateTo({
      url: '../my_youhuiquan/my_youhuiquan'
    })
  },
  
})