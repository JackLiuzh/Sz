// pages/assessment_detail/assessment_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back:1,
    h_id: 0, //任务id
    kemu_id:0,
    id:0,
    timestamp:0, //当前时间戳 秒
    lookxa : false,  
    end_time:0,  //直播课结束时时间戳 秒
    pinggu:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = (Date.parse(new Date()))/1000;
    let that = this;
    var h_id = options.h_id
    var kemu_id = options.kemu_id
    var uid = app.globalData.uid
    if (options.back == 0){
      that.setData({
        back: options.back
      })
    }
    var params = {
      "uid": uid,
      "h_id": h_id,
      "kemu_id": kemu_id
    }
    app.sz.pigobaogao(params).then(d => {
      console.log(d.data);
      if (d.data.status == 0) {
        var end_time = parseInt(d.data.data.end_time) 
        that.setData({
          h_id: h_id,
          kemu_id: kemu_id,
          pinggu: d.data.data,
          end_time: end_time,
          timestamp: timestamp
        })
      } else {
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
    if(this.data.back != 0){
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

  },
  //直播
  gozhibo: function(e) {
       let that = this
       var video_id = that.data.pinggu.video_id
       var lesson_id = that.data.pinggu.lesson_id
       if (video_id){
         wx.navigateTo({
           url: '../live/live?video_id=' + video_id + '&lesson_id=' + lesson_id
         });
       }
  },

  close: function(){
  
    this.setData({
      lookxa: false
    })
  },

  look: function(){
     console.log(111);
    this.setData({
      lookxa : true
    })
  
  },

  gojiexi : function(){
    let kemu_id = this.data.kemu_id
    let h_id = this.data.h_id
    
    wx.navigateTo({
      url: '../test_dati/test_dati?all=1&id=' + h_id + '&kemu_id=' + kemu_id
    });
  }


})