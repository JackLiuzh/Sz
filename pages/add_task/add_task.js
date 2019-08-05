// pages/add_task/add_task.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var uid = app.globalData.uid
    var params = {
      "uid":uid
    }
    app.sz.xcxUserTasklist(params).then(d=>{
        that.setData({list:d.data.data})
    })
  },
  //删除任务
  cancel:function(e) {
      var that = this
      let user_task_id = e.currentTarget.dataset.user_task_id
      
      wx.showModal({
        title: '提示',
        content: '确定要取消任务吗？',
        success(res) {
           if(res.confirm){
             var uid = app.globalData.uid
             var params = {
               "uid": uid,
               "user_task_id": user_task_id
             }
             app.sz.xcxDelUserTask(params).then(d => {
                if(d.data.status==0){
                  that.onLoad()
                }
             })
           }else if(res.cnacel){

           }
        }
      })
      
  },
  add: function(e) {
    var that = this
    let task_id = e.currentTarget.dataset.taskid
    let user_task_id = e.currentTarget.dataset.user_task_id
    console.log(task_id)
      wx.showModal({
        title: '提示',
        content: '添加新的任务吗？',
        success(res){
           if(res.confirm){
             var uid = app.globalData.uid
             var task_id = e.currentTarget.dataset.taskid
             var params = {
               "uid": uid,
               "task_id": task_id,
               "user_task_id": user_task_id
             }
             app.sz.xcxAddUserTask(params).then(d => {
               that.onLoad()
             })
           }else if(res.cancel){

           }
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