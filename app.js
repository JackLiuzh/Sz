
const tiku = require('./utils/tiku.js')
const sz = require ('./utils/sz.js')
const wechat = require('./utils/wechat.js')

//app.js
App({
  data: {

  },
  tiku: tiku,
  sz: sz,
  wechat : wechat,
  onLaunch: function () {
    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     wechat.setStorage('islogin',res.authSetting['scope.userInfo']);
    //     if (res.authSetting['scope.userInfo']) {
          
         
    //     }else {
    //        wx.showModal({
    //          title: '警告',
    //          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
    //          success: function (res) {
    //             if (res.confirm) {
    //               console.log('用户点击确定')
    //               wx.navigateTo({
    //                 url: '../tologin/tologin',
    //               })
    //             }
    //          }
    //        })
    //     }
    //   }
    // })
    this.checkIsIPhoneX()
    
  },
  checkIsIPhoneX: function() {
     const self = this
     wx.getSystemInfo({
       success: function(res) {
         if(res.model.search('iPhone X') != -1) {
            self.globalData.isIPX = true
         }
       },
     })
  },
  globalData: {
    userInfo: null,
    testdata: '我是测试数据',
    uid:'',
    isIPX: false,
    token:''
  },
  aData: {
     show: false,
     answerquestions:''
  },
})