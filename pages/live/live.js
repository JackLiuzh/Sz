// pages/live/live.js
const app = getApp()
var num = 0; //记录时长
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    setInter: '',//定时器名
    lesson_id:0,
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    // let url = decodeURIComponent(options.url)
    let video_id = options.video_id
    if (options.lesson_id){
      this.setData({ lesson_id: options.lesson_id})
    }
  
    this.geturl(video_id)
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
    // wx.hideLoading()
    this.setData({ flag: true })
  },
  //请求接口
  geturl: function(video_id){
      var that = this
      var uid = wx.getStorageSync('uid')
      var params = {
         uid: uid,
         video_id: video_id
      }
      app.sz.xcxliveUrl(params).then(d=>{
          console.log(d)
          if(d.data.status ==0){
            // that.setData({url: })
            that.setData({url: d.data.data.url})
            if (d.data.data.url){
              that.setData({
                setInter: setInterval(function () {
                  num++;
                  console.log('setInterval==' + num);
                }, 1000)
              })
            }
          }else {
             console.log("接口错误")
          }
          wx.hideLoading()
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
    clearInterval(this.data.setInter)
    if (num > 1800 && this.data.lesson_id){
        var that = this
        var uid = wx.getStorageSync('uid')
        var params = {
          uid: uid,
          lesson_id: that.data.lesson_id,
          duration: num
        }
      app.sz.xcxaddvideoProject(params).then(d => {
          console.log(d)
          if (d.data.status == 0) {
            // that.setData({url: })
            console.log(num)
          } else {
            console.log("接口错误")
          }
        })
    }
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