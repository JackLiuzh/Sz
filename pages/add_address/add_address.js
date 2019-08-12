// pages/add_address/add_address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    phone: '',
    name: '',
    addr_info:'',
    province_name:'',
    city_name:'',
    area_name:'',
    address:'',
    name_phone:'',
    // customIt,em: '全部'
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

  nameinput: function (e) {
    this.setData({
      name: e.detail.value
    
    })
    // wx.setStorageSync('name', this.data.name)
    // var cs = wx.getStorageSync('name')
    console.log(this.data.name)
    // console.log(cs)
  },
  phoneinput: function (e) {
    this.setData({
      phone: e.detail.value
    })
    // wx.setStorageSync('phone', this.data.phone)
    console.log(this.data.phone)
  },
  addrinput: function (e) {
    this.setData({
      addr_info: e.detail.value
    })
    // wx.setStorageSync('addr_info', this.data.addr_info)
    console.log(this.data.addr_info)
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
    // var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      // "uid": uid,
      "token": token,
      "name": this.data.name,
      "phone": this.data.phone,
      "province_name": this.data.province_name,
      "city_name": this.data.city_name,
      "area_name": this.data.area_name,
      "addr_info": this.data.addr_info
    }
    console.log(params)
    app.sz.xcxaddUserAddress(params).then(d => {
      if (d.data.status == 1) {
        console.log(d.data.msg)
      } else {
        console.log(d.data.msg)
      }
    })

    this.setData({
      name_phone: this.data.name + ' ' + this.data.phone,
      address: this.data.province_name + this.data.city_name + this.data.area_name + this.data.addr_info
    })
    wx.setStorageSync('namephone', this.data.name_phone)
    wx.setStorageSync('address', this.data.address)
    // var hh = wx.getStorageSync('namephone')

    // console.log(hh)

    wx.navigateBack({
      delta: 1
    })
  },

  


})