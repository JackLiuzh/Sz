// pages/special_subject/special_subject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    youhuiquan: ['行测', '申论'],
    currentTab: 0, //预设当前项的值 
    //message: 'Hello MINA!'
    list: '',
    shenlun:'',
    first_tip: true,
  },


  go_dati_sl: function(e){
    var id = e.currentTarget.dataset.id;
    let that = this
    console.log(id)
    that.setData({ first_tip: wx.getStorageSync('first_tip')})
    console.log(this.data.first_tip)
    if (this.data.first_tip){
      wx.navigateTo({
        url: '../dati_sl/dati_sl?id=' + id
      })
      
    }else{
      wx.navigateTo({
        url: '../question_know/question_know?id=' + id
      })
      wx.setStorageSync('first_tip', this.data.first_tip)
      // console.log(this.data.shenlun[hh].id)
    }
    
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this
    // that.setData({ first_tip: wx.getStorageSync('first_tip')})
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
    var that = this
    var uid = app.globalData.uid
    var params = {
      'uid': uid
    }
    app.sz.xcxgetSpecialList(params).then(d => {
      console.log(d);
      if (d.data.status == '0') {
        that.setData({ list: d.data.data, shenlun: d.data.shenlun })
      } else {
        console.log('获取专题列表失败');
      }
    })
  },

  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    console.log(that.data.currentTab)
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式 
  swichNav: function (e) {
    var that = this
    var cur = e.target.dataset.current;
    if (that.data.currentTaB == cur) { return false; }
    else {
      that.setData({
        currentTab: cur
      })
    }
    console.log(that.data.currentTab)
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。 
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
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