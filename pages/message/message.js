// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      messagelist: '',
      page: 1,
      hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      var uid = app.globalData.uid
      var params = {
         "uid": uid,
         "page": that.data.page
      }
      app.sz.xcxCommentThumbsList(params).then(d=>{
         if(d.data.status == 0 ) {
            // console.log("成功列表获取好吃呢公共")
            // console.log(d)
            that.setData({ messagelist : d.data.data })
         }else {
            console.log("接口错误")
         }
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
      var uid = app.globalData.uid
      var params = {
         "uid":uid
      }
      app.sz.xcxEliminateCommentThumbs(params).then(d=>{
         if(d.data.status == 0 ) {
            console.log("清除已读成功")
         }else {
            console.log("清除已读接口错误")
         }
      })

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
      this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 加载更过数据
   * 
   */
  loadMore : function() {
     var that = this
    if (!that.data.hasMore) return
     wx.showLoading({ title:'拼命加载中...' })
     var uid = app.globalData.uid
     var params = {
         "uid" : uid,
         "page" : that.data.page++,
     }
    return app.sz.xcxCommentThumbsList(params).then(d=>{
         if(d.data.data.length) {
            that.setData({ messagelist : that.data.messagelist.concat(d.data.data) })
         }else {
            that.setData({ hasMore: false })
         }
         wx.hideLoading()
    } )
  }
})