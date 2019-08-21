// pages/course_newxiang/course_newxiang.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     url:'',
     isflag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var params = {course_id:5}
    app.sz.xcxNewCourseDetail(params).then(d=>{
        console.log(d)
        if(d.data.status == 0){
           console.log("")
          setTimeout(function () {
            that.setData({ url: d.data.data })
            that.setData({isflag: true})
            wx.hideLoading()
          }, 3000)
        }else{
          console.log("接口失败")
        }
        console.log(d.data.data)
        // that.setData({url:d.data.data.url})
          // setTimeout(function () {
          //   wx.hideLoading()
          // }, 2000)
        // wx.hideLoading()
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