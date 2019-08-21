// pages/first_comming/first_comming.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    noSelect:'../../images/weixuanzhong@2x.png',
    hasSelect:'../../images/xuanzhong@2x.png',
    task:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var params = {};
    app.sz.xcxindex(params).then(d=>{
        if(d.data.status==0){
          if(d.data.data.length>0){
              var list = d.data.data;
              list.forEach(function(item){
                  //console.log(item);
                  item.sureid=true;
              })
              that.setData({
                task:list
              })
          }
        }
    })
  },
  //多选任务
  selectRep: function(e) {
     let index = e.currentTarget.dataset.selectindex;
     let task = this.data.task;
     task[index].sureid = !task[index].sureid;
     this.setData({
        task
     })
  },

  //提交任务
  xcxSubmitTask: function(e) {
      var that = this;
      let task = this.data.task;
      let data =[];
      task.forEach(function(item){
          if(item.sureid){
            data.push(item.id)
          }
      })
      //console.log(data)
      let uid = "";
      wx.getStorage({
        key: 'uid',
        success: function(res) {
            uid = res.data;
            let params = {
              "uid": uid,
              "data": data
            }
          if (data.length > 0) {
            that.setData({
              disabled:true //禁止提交
            });
          
            app.sz.xcxSubmitTask(params).then(d => {
              //console.log(d)
              if (d.data.status == 0) {
                wx.switchTab({
                  url: '../course_new/course_new',
                })
              }else{
                that.setData({
                  disabled: false
                });
                console.log("保存任务的接口错误")
              }
            })
          } else {
            wx.showToast({
              title: "请选择任务",
              icon: 'none',
              duration: 2000
            })
          }

        },
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