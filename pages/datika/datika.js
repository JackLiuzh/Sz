// pages/datika/datika.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datika:'',
    total_nums:'',
    correct_nums:0,
    error_nums:0,
    unzuo_nums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var datika = JSON.parse(options.datika)
    var total_nums = options.total_nums
    var correct_nums = 0;
    var error_nums = 0;
    var unzuo_nums = 0;
    
    for (var i = 0; i < datika.length; i++ ){
      if (datika[i]["iswrong"] == 0){ //做错
        error_nums = Number(error_nums) + 1;
      } else if (datika[i]["iswrong"] == 1){
        correct_nums = Number(correct_nums)  + 1;
      }else{
        unzuo_nums = Number(unzuo_nums) + 1;
      }
    }

    that.setData({
      datika: datika,
      total_nums: total_nums,
      correct_nums: correct_nums,
      error_nums: error_nums,
      unzuo_nums: unzuo_nums
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