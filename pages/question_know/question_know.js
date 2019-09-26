// pages/question_know/question_know.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  nevertip: function(){
    // let first_sl = wx.getStorageSync("first_sl")
    if(this.data.first_tip == ''){
      this.setData({
        first_tip: !this.data.first_tip
      }); 
    }else{
      this.setData({
        first_tip: !this.data.first_tip
      }); 
    }
    
    wx.setStorageSync("first_tip", this.data.first_tip)
  },

  iknow: function (){
    // if (this.data.first_tip == '') {
    //   this.setData({
    //     first_tip: true
    //   }); 
    //   wx.setStorageSync("first_tip", this.data.first_tip)
    // }
    
    console.log(this.data.id +'==========question_know')
    wx.navigateTo({
      url: '../dati_sl/dati_sl?id=' + this.data.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var id = options.id
    // let first_tip = wx.getStorageSync('first_tip')
    that.setData({ first_tip: wx.getStorageSync('first_tip'),id : id })
    console.log(that.data.id)
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