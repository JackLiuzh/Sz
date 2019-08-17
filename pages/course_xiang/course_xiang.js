// pages/course_xiang/course_xiang.js
var total_micro_second = 10000 * 10000;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      clock:'',
      currentData: 0,
      info:'',
      system_id:'',
      system_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.system_id)
    this.data.system_id = options.system_id
    this.setData({system_id:options.system_id})
    this.initData(options.system_id)
    
  },
  onShow:function(){
     var options ={
       system_id: this.data.system_id
     }
     this.onLoad(options)
  },

  bindchange:function(e){
     const that = this;
     that.setData({
         currentData: e.detail.current
     })
  },
  //跳转去看视频
  gokan_video: function (e){
    var system_id = e.currentTarget.dataset.system_id
    var lesson_id = e.currentTarget.dataset.lesson_id
    // console.log(e)
    wx.navigateTo({
      url: '/pages/kan_video/kan_video?system_id=' + system_id + '&lesson_id=' + lesson_id,
    })
  },

  checkCurrent: function(e){
     const that = this
     if(that.data.currentData === e.target.dataset.current){
        return false;
     }else{
        that.setData({
           currentData: e.target.dataset.current
        })
     }
  },
  
  //初始化详情页数据
  initData: function (system_id){
     var that = this
     var token = wx.getStorageSync("token")
     var uid  = wx.getStorageSync("uid")
     var params = {
        token : token,
        system_id: system_id,
        uid: uid
     }
    app.sz.courseDetail(params).then(d=>{
         if(d.data.status ==1){
             that.setData({info: d.data.data})
             that.count_down(this);
         }else{
            console.log("详情页数据接口错误")
         }
    })
  },
  zhedie: function(e){
    //  console.log(e)
     var index = e.currentTarget.dataset.index
    if (this.data.info.info[index].iszhedie){
      var dd = 'info.info[' + index + '].iszhedie'
      this.setData({ [dd]: false })
    }else{
      var dd = 'info.info[' + index + '].iszhedie'
      this.setData({ [dd]: true })
    }
     
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  

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
  gobuy_page: function(){
    var that = this
    var miaosha = 0
    if (that.data.info.discount_price){
      miaosha = 1
    }
    var course = {
       title: that.data.info.title,
       video_tot : that.data.info.video_tot,
       point_tot : that.data.info.point_tot,
       question_tot: that.data.info.question_tot,
       price: that.data.info.price,
       discount_price: that.data.info.discount_price
    }
    var dd = JSON.stringify(course)
     wx.navigateTo({
       url: '/pages/course_buy/course_buy?system_id=' + that.data.system_id+'&miaosha=' + miaosha +'&course=' + dd,
     })
  },
  count_down: function(that){
      var newTime = new Date().getTime()
      var endTime = that.data.info.discount_end_time * 1000;
      that.setData({
        clock: that.date_format(endTime)
      });
      
     
      if (newTime - endTime > 0){
        that.setData({ clock: '已经截止' });
        return;
      }
      
      setTimeout(function(){
         //total_micro_second -= 10;
         that.count_down(that)
        //  console.log("hh")
      },1000)
  },

  date_format: function (endTime){
    var that = this
    var newTime = new Date().getTime()
    var time = (endTime - newTime) /1000
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    
    var obj ={
      day: that.fill_zero_prefix(day),
      hou: that.fill_zero_prefix(hou),
      min: that.fill_zero_prefix(min),
      sec: that.fill_zero_prefix(sec)
    }
    // return hr + ":" + min + ":" + sec ;
    // console.log(obj)
    return obj
  },

  fill_zero_prefix: function(num){
     return num < 10 ? '0' + num : num
  }
  
  


})