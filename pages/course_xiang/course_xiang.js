// pages/course_xiang/course_xiang.js
var total_micro_second = 10000 * 10000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      clock:'',
      currentData: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.count_down(this);
  },

  bindchange:function(e){
     const that = this;
     that.setData({
         currentData: e.detail.current
     })
  },

  checkCurrent: function(e){
     const that = this
     if(that.data.currentData === e.target.dataset.current){
        return false;
     }else{
        that.setData({
           currentData: e.target.dataset.current
        })
     }
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

  },

  count_down: function(that){

      that.setData({
        clock: that.date_format(total_micro_second)
      });
      
      if(total_micro_second <= 0){
         that.setData({clock:'已经截止'});
         return;
      };
      
      setTimeout(function(){
         total_micro_second -= 10;
         that.count_down(that);
      },10)
  },

  date_format:function(micro_second){
    var that = this
    var second = Math.floor(micro_second / 1000);
    // 小时位
    var hr = Math.floor(second / 3600);
    // 分钟位
    var min = that.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
    // 秒位
    var sec = that.fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = that.fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
    
    return hr + ":" + min + ":" + sec ;
  },

  fill_zero_prefix: function(num){
     return num < 10 ? '0' + num : num
  }
  
  


})