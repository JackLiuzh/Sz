// pages/my_addr/my_addr.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['','' ,''],
    // customItem: '全部'
    province_name: '',
    city_name: '',
    area_name: '',
    addrinfo: '',
    // uid: '', 
    // token: '', 
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    bindRegionChange: function (e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value) 
      this.setData({
        region: e.detail.value 
      
      })
      this.setData({
        province_name: this.data.region[0],
        city_name: this.data.region[1],
        area_name: this.data.region[2]
      })
      console.log(this.data.province_name)
      console.log(this.data.city_name)
      console.log(this.data.area_name)
      console.log(this.data.region)
    },

    saveAddr: function () {
      var uid = wx.getStorageSync('uid');
      var token = wx.getStorageSync('token');
      var params = {
        "uid": uid,
        "token": token,
        "province_name": this.data.province_name,
        "city_name": this.data.city_name,
        "area_name": this.data.area_name,
        "addrinfo": this.data.addrinfo
      }
      console.log(params)
      app.sz.xcxMyAddr(params).then(d => {
        if (d.data.status == 1) {
          console.log("succeed")
        } else {
          console.log("接口错误")
        }
      })

      wx.navigateBack({
        delta: 1
      })
    },

    input: function (e) {
      this.setData({
        addrinfo: e.detail.value
      })
      console.log(this.data.addrinfo)
    }, 



})