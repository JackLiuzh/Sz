// pages/kan_video/kan_video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    system_id: '',
    lesson_id: '',
    
    pinglun: [],
    // videoUrl: '',
    
    
    videoimage: "block"


  },

  bindplay: function (e) {
    this.setData({
      tab_image: "none"
    }),
      this.videoCtx.play()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.system_id)
    console.log(options.lesson_id)
    var video = ''
    this.data.system_id = options.system_id;
    this.data.lesson_id = options.lesson_id;
    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "lesson_id": this.data.lesson_id,
      "system_id": this.data.system_id,
      "token": token,
    }
    // console.log(params)
    app.sz.xcxkanVideo(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ pinglun: d.data.data.pinglun, videoUrl: d.data.data.videoUrl, avatar: d.data.data.avatar})
        
        
      } else {
        // console.log(d.data.msg)
      }
    })
    // console.log(this.data.videoUrl)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
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

  },

  tip: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '要下载APP才能评论哦~',
      success: function (res) {
        if (res.confirm) {
          // console.log('弹框后点取消')
        } else {
          // console.log('弹框后点取消')
        }
      }
    })
  }
})