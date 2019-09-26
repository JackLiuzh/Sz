// pages/shuati_sl_jump/shuati_sl_jump.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // h_id:85,
    zblive:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    let that = this
    var h_id = options.h_id
    console.log(h_id)
    
    that.setData({
      h_id: h_id,
    })
      // var params = {
      //   "h_id": h_id,
      // }
    var params = {
      "h_id": that.data.h_id,
    }
    console.log(params)
    app.sz.xcxShenlunZhibo(params).then(d => {
      if (d.data.status == 0) {
        that.setData({
          zblive: d.data.data
        })
        console.log('获取成功')
        wx.hideLoading();
      } else {
        console.log('接口错误')
        wx.hideLoading();
      }
    })


  },

  pblive: function(){
    wx.navigateTo({
      url: '../live/live?video_id=' + this.data.zblive.video_id + '&lesson_id=' + this.data.zblive.lesson_id,
    });
  },

  zblive: function () {
    wx.navigateTo({
      url: '../live/live?video_id=' + this.data.zblive.video_id + '&lesson_id=' + this.data.zblive.lesson_id,
    });
  },

  back_first: function () {
    wx.navigateTo({
      url: '../first_page/first_page'
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
    if (this.data.back != 0) {
      wx.navigateBack({
        delta: 1
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