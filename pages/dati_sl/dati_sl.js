// pages/dati_sl/dati_sl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isquestion: true,
    clientHeight: 500,
    ismany:true,
    // null_jiaojuan:true,
    youhuiquan: ['材料一', '材料二', '材料三', '材料四', '材料一', '材料二', '材料三', '材料四'], 
    current_cailiao: 0, //预设当前项的值

  },

  switchTab: function (e) {
    this.setData({
      current_cailiao: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式 
  swichNav: function (e) {
    var that = this
    var cur = e.target.dataset.current;
    var category_id = e.target.dataset.category_id
    if (that.data.currentTaB == cur) { return false; }
    else {
      that.setData({
        current_cailiao: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。 
  checkCor: function () {
    if (this.data.current_cailiao > 4) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

quxiao: function(){
  this.setData({
    null_jiaojuan: false
  })
},

  submit: function () {
    this.setData({
      null_jiaojuan: true
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