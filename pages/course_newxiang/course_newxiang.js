// pages/course_newxiang/course_newxiang.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var params = {course_id:5}
    app.sz.xcxNewCourseDetail(params).then(d=>{
        console.log(d)
        if(d.data.status == 0){
           console.log("")
           that.setData({url:d.data.data})
        }else{
          console.log("接口失败")
        }
        console.log(d.data.data)
        // that.setData({url:d.data.data.url})
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