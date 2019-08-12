// pages/course_buy/course_buy.js
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {

    name_phone:'',
    addr:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // console.log(this.data.name_phone)

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
    this.setData({
      name_phone: wx.getStorageSync('namephone'),
      addr: wx.getStorageSync('address')
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
  // hh: function () {
  //   this.setData({
  //     name_phone : wx.getStorageSync('namephone'),
  //     addr : wx.getStorageSync('address')
  //   })
  //   console.log(this.data.name_phone)
  // },

  add_addr: function () {
    wx.navigateTo({
      url: '../add_address/add_address'
    })
  },

})