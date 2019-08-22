// pages/course_new/course_new.js
const filter = require('../../utils/filter.js');
const app = getApp()

Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
      livesrc:'',
      list:[],
      sys: '',
      iswxuser:false,
      avatar: 'http://shangzheng.oss-cn-beijing.aliyuncs.com/img/member/Header-profile-photo.png',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      // this.initdata()
      this.iswxuser()
  },
  bindGetUserInfo(e){
      var that = this
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            var bendiuserinfo = wx.getStorageSync("userInfo")
            bendiuserinfo.name = e.detail.userInfo.nickName
            bendiuserinfo.avatar = e.detail.userInfo.avatarUrl
            wx.setStorageSync('userInfo', bendiuserinfo)
            that.saveuserinfo()
          }else{
             console.log("用户拒绝授权")
          }
        }
      })
  },
  iswxuser:function(){
      var that = this
      var avatar = that.data.avatar
      var bendiava = wx.getStorageSync("userInfo").avatar
      var bendname = wx.getStorageSync("userInfo").name
      if(bendname){
        if (bendname.indexOf('szgk') != -1) {
          that.setData({ iswxuser: false })
        } else {
          that.setData({ iswxuser: true })
        }
      }
      
  },
  //保存授权信息信息
  saveuserinfo: function () {
    var that = this
    var uid = wx.getStorageSync("uid")
    var token = wx.getStorageSync("token")
    var wxname = wx.getStorageSync("userInfo").name
    var wxava = wx.getStorageSync("userInfo").avatar
    var params = {
      uid: uid,
      name: wxname,
      avatar: wxava
    }
    app.sz.xcxuserInfo(params).then(d => {
      console.log(d)
      if (d.data.status == 0) {
        wx.navigateTo({
          url: '/pages/live/live?url=' + that.data.livesrc,
        })
        console.log("保存成功")
      } else {
        console.log("保存失败")
      }
    })

  },
  //全部专题课跳转
  gokanvideo:function(){
    wx.navigateTo({
      url: '/pages/first_page/first_page',
    })
  },
  //跳转直播
  golive: function(e){
    // var url = encodeURIComponent(e.currentTarget.dataset.playbackurl)
    var video_id = e.currentTarget.dataset.video_id
    // console.log(e)
    wx.navigateTo({
      url: '/pages/live/live?video_id=' + video_id,
    })
  },
  zangolive: function(e){
     this.data.livesrc = encodeURIComponent(e.currentTarget.dataset.playbackurl)
  },
  //跳转待播
  godaibo: function(){
      wx.navigateTo({
        url: '/pages/course_newxiang/course_newxiang',
      })
  },
  //看回放
  gohuifang:function(e){
    // var url = encodeURIComponent(e.currentTarget.dataset.playbackurl)
    // console.log(e)
    var video_id = e.currentTarget.dataset.video_id
    wx.navigateTo({
      url: '/pages/live/live?video_id='+video_id,
    })
  },
  //购买详情页
  gocourse_xiang:function(e){
      console.log(e.currentTarget.dataset.system_id)
     var system_id = e.currentTarget.dataset.system_id
      wx.navigateTo({
        url: '/pages/course_xiang/course_xiang?system_id=' + system_id,
      })
  },
  initdata(){
     wx.showLoading({
       title: '加载中...',
     })
     var that = this
     var uid =  wx.getStorageSync('uid')
     var params ={
       uid: uid
     }
    app.sz.xcxNewCourse(params).then(d=>{
         if(d.data.status == 0){
            that.setData({list: d.data.data.list,sys:d.data.data.sys})
         }else{
            console.log("课程接口错误")
         }
         wx.hideLoading()
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

    this.initdata()
    this.iswxuser()
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
}))

