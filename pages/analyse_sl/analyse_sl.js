// pages/analyse_sl/analyse_sl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientHeight: 1000,
    // h_id:85,
    // hq_id:9328,
    sl:[],
    currentTab: 0,
    isquestion: false, //材料/问题按钮判断
  
  
    
    
    current_cailiao: 0, //多材料滚动条预设当前项的值
    
    
    total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    var that = this
    //初始化数据
    // var user_task_id = options.user_task_id
    var h_id = options.h_id
    that.setData({ h_id: h_id })
    var uid = wx.getStorageSync('uid')
    var params = {
      "uid": uid,
      "h_id": that.data.h_id,
      // "hq_id": that.data.hq_id
    }
    app.sz.xcxShenlunList(params).then(d => {
      if (d.data.status == 0) {
        that.setData({
          sl : d.data.data.shenlun_list,
          total: d.data.data.shenlun_list.length
        })
        for (let i = 0; i < that.data.sl.length; i++) {
          // var cs = that.data.sl[i].record.attach.split(",")
          // console.log(cs + '======cs')
          // var hh = []
          // hh.push(that.data.sl[i].record.attach.split(","))
          // console.log(hh + '======hh')
          var ccs = "sl[" + i + "].img"//添加键值对
          that.setData({
            [ccs]: that.data.sl[i].record.attach.split(",")
          })
          // that.data.sl[i].img.push()
          console.log(that.data.sl[i].img )
        }
        
        wx.hideLoading();
      } else {
        console.log("接口错误");
        wx.hideLoading();
      }
    })
    // console.log(that.data.sl +'======sl')
    
  },

  //材料按钮
  cailiao: function () {
    let that = this
    that.setData({
      isquestion: false
    })
  },

  //问题按钮
  answer: function () {
    let that = this
    that.setData({
      isquestion: true
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

  },

  swiperchangefinish: function (e) {
    var that = this
    var current = Number(e.detail.current)  // 当前的
    var currentTab = Number(this.data.currentTab); //显示的做题序号
    var sl = this.data.sl;
    if (sl[current] == undefined) {
      that.setData({
        currentTab: currentTab
      })
    }
    console.log(current, "===============", currentTab);
    // console.log(this.data.sl_list.length)
    //最后一题滑动， 跳到评估页面
    if ((current + 1) == (this.data.sl.length)) {

      // that.gopingguClick();
      console.log(this.data.sl.length + '试题结束')
    }

  },
  //手动滑页
  swiperchange: function (e) {
    var that = this
    var current = Number(e.detail.current)  // 当前的
    var currentTab = Number(this.data.currentTab); //上一个
    //获取试题
    var sl = this.data.sl;
    var length = sl.length;
    //获取几个试题
    // let lang = 10;
    // //增加的试题id
    // var main_id = [];

    that.setData({
      currentTab: current
    })
    // if()
    //右滑
    // if (current > currentTab) {
    //   //下一个不存在 则
    //   if (sl_list[current + 1] == undefined) {
    //     for (let i = current; i < sl_list.length; i++) {
    //       if (i < current + lang) {
    //         main_id.push(sl_list[i].id);
    //       }
    //     }
    //   }
    // }

    //左滑
    if (current < currentTab) {
      current = current - 1
      //上一个不存在
      // if (current >= 0 && sl_list[current].isfull == 0) {
      //   for (let i = current; i >= 0; i--) {
      //     if (i > current - lang) {
      //       main_id.push(sl_list[i].id);
      //     }
      //   }
      // }
    }

    //获取试题
    // if (main_id.length > 0) {
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   let that = this
    //   var params = {
    //     "h_id": that.data.h_id,
    //   }
    //   console.log(params)
    //   app.sz.xcxShenlunList(params).then(d => {
    //     if (d.data.status == 0) {
    //       this.setData({ sl_list: d.data.data.shenlun_list })
    //       console.log(this.data.sl_list)
    //       wx.hideLoading();
    //     } else {
    //       console.log(d.data.msg)
    //       wx.hideLoading();
    //     }
    //   })
    // }
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
    // that.setData({ curcourselist: that.data.sl_list.material[cur] })
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

})