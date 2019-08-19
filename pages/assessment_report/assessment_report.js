// pages/assessment_report/assessment_report.js
let Charts = require('./../../utils/wxcharts-min.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zongtishu:0, //总题数
    tot:0, //做题总数
    tot_correct: 0, //做题正确总数
    category:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    var user_task_id = options.user_task_id
    var time = options.time
    var uid = app.globalData.uid
    var params = {
      "uid": uid,
      "user_task_id": user_task_id,
      "time": time
    }
    app.sz.xcxshutiteport(params).then(d => {
      console.log(d.data);
      
       if (d.data.status == 0) {
         var res = d.data.data
         that.setData({
           zongtishu: res.zongtishu,
           tot: res.tot,
           tot_correct: res.tot_correct,
           category: res.category
         })

         //雷达图
         this.initchart()
       }else{
          console.log("接口错误")
       }
     })  



     
  },
  initchart:function(){
    var that = this
    var category = that.data.category
    var categories = []
    var corrct_data = []
    var sa_data = []

    category.forEach(function(item,index){
      categories.push(item.cate_name)
      corrct_data.push(item.lv)
      sa_data.push(item.reference)
    })

    new Charts({
      animation: true,
      canvasId: 'canvas1',
      type: 'radar',
      categories: categories,
      series: [{
        name: '我的正确率',
        color: '#F76F58',
        data: corrct_data
      }, {
        name: '上岸参考正确率',
          color: '#FCD356',
          data: sa_data
      }],
      width: 300,
      height: 200,
      extra: {
        radar: {
          max: 100//雷达数值的最大值
        }
      }
    });
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
    wx.navigateBack({
      delta: 2
    })
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

  //跳转首页
  backindex: function(){
    wx.switchTab({

      url: '../today_task/today_task'

    });  
  }


})