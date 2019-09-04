// pages/rili/rili.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // selected: [
      //    {
      //       date:'2019-03-01'
      //    },
      //    {
      //      date: '2019-03-02'
      //    }
      // ],
    selected: [],
    todaytask:'',
    currenttime:''//当前日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  //日期和任务的接口(页面初始化接口)
  initdataobj: function (uid,time) {
    var that = this
    var params = { "uid": uid, "time": time }
    app.sz.xcxDakaTask(params).then(d => {
      console.log(d)
      if (d.data.status == 0) {
        // var rili = d.data.data.rili
        that.setData({ todaytask: d.data.data.todaytask,selected: d.data.data.selected })
        that.setData({ currenttime: time })
      }
    })

    
  },
  // dealarraydata: function (rili, xitongtime) {
  //   var that = this
  //   var selectedArray = []
  //   rili.forEach(function (item) {
  //     if (new Date(item.time) < new Date(xitongtime)) {
  //       var obj = {}
  //       obj.date = item.time
  //       obj.isfinish = item.isfinish
  //       selectedArray.push(obj)
  //       // console.log("符合条件"+selectedArray)
  //     }
  //   })
  //   that.setData({ selected: selectedArray })
  // },

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
      "uid": uid
    }
    var xitongtime = new Date() //当前系统日期

    app.sz.xcxDakaTask(params).then(d => {
      if (d.data.status == 0) {
        var rili = d.data.data.selected
        var selectedArray = that.data.selected
        rili.forEach(function (item) {
          var strTime = item.date;    //字符串日期格式  2011-11-09           
          var date1 = new Date(Date.parse(strTime.replace(/-/g, "/")));
          if (date1 < new Date().getTime()) {
            var obj = {}
            obj.date = item.date
            obj.isfinish = item.isfinish
            selectedArray.push(obj)
          }
        })
        that.setData({ todaytask: d.data.data.todaytask, selected: selectedArray })
      }
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
     //删除日历的时间缓存
    wx.removeStorageSync("rili-currenttime")
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
  bindgetdate(e) {
    var that = this
    let tt = e.detail
    var time = tt.year+'-'+tt.month+'-'+tt.date
    var uid = app.globalData.uid
    console.log("初始化开始" + time)
    that.setData({ currenttime: time })
    var params ={
       "uid": uid,
       "time": time
    }
    app.sz.xcxRiliInfo(params).then(d=>{
       if(d.data.status == 0){
         that.setData({ todaytask : d.data.data})
       }
    })

    //   // //请求当前月的日历信息
    //   // that.riliindakatask(params)
    // })
    //  that.initdataobj(uid,time)

  },

  // riliindakatask: function (params){
  //   var that = this
  //   var xitongtime = new Date() //当前系统日期
  //   app.sz.xcxDakaTask(params).then(d => {
  //     // console.log("这是什么情况" + d)
  //     if (d.data.status == 0) {
  //       var rili = d.data.data.rili
  //       that.setData({ todaytask: d.data.data.todaytask })
  //       var selectedArray = that.data.selected
  //       that.dealarraydata(rili, xitongtime)
  //     }
  //   })
  // },

  //返回当前日期
  getcurrentriqi: function (){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + '-' + M + '-' + D

  }
})