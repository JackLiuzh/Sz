// pages/frequency_set/frequency_set.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_task_id:'',
    pinlvnum:'',
    noSelect: '../../images/weixuanzhong@2x.png',
    hasSelect: '../../images/xuanzhong@2x.png',
    isconstom:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pinlvnum = JSON.parse(options.pinlvnum)
    this.setData({ pinlvnum: pinlvnum, user_task_id: options.user_task_id})
    console.log(options.pinlvnum)
  },

  // 自定义底部弹窗
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //自定义多选
  selectRep: function(e) {
    var that = this
    let index = e.currentTarget.dataset.selectindex;
    let riqilist = that.data.pinlvnum.data;
    riqilist[index].isdefault = !riqilist[index].isdefault;
    that.setData({
      ['pinlvnum.data']:riqilist
    })
  },

  submit_but:function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var days = e.currentTarget.dataset.days
    if(index == 3){
       that.nowsubmit(index)
       that.showModal()
       that.setData({ isconstom : index})
    }else{
      that.nowsubmit(index)
      that.richangsubmit(index,days)
    }
  },
  // 自定义提交
  custom:function(e){
     var that = this
     var uid = app.globalData.uid
     var user_task_id = that.data.user_task_id
     var index = that.data.isconstom


     var weekdays = that.data.pinlvnum.data
     var weeklist = []
     for (var i  in weekdays) {
        if(weekdays[i].isdefault){
            weeklist.push(i)
        }
     }
     var days = weeklist.join(",")
    //  console.log(days)
     var data = '{"' + index + '":"' + days + '"}'
     var params = {
       "uid" : uid,
       "user_task_id": user_task_id,
       "data" : data
     }
    // console.log(data)
    app.sz.xcxUpdatePinlv(params).then(d=>{
        console.log(d)
        if(d.data.status == 0){
          console.log("频率修改成功")
          that.hideModal()
        }else {
          console.log("接口错误")
        }
    })

  },

  //工作日和周末提交
  richangsubmit: function(index,days){     
     var that = this
     var uid = app.globalData.uid
     var user_task_id = that.data.user_task_id
     var data = '{"' + index + '":"' + days + '"}'
      console.log(data)
     var params = {
       "uid":uid,
       "user_task_id": user_task_id,
       "data": data
     }
    app.sz.xcxUpdatePinlv(params).then(d=>{
       if(d.data.status == 0){
         console.log("提交成功")
       }else {
         console.log("接口错误")
       }
    })
  },
  //查看是否选中显示
  nowsubmit:function(index) {
    var that = this
    var pinlvnum = that.data.pinlvnum
    pinlvnum[index].isdefault = ! pinlvnum[index].isdefault
    if(pinlvnum[index].isdefault) {
      that.cancelgou(pinlvnum,index)
    }
    that.setData({pinlvnum})
  },
  cancelgou: function(data, index) {
      for(var i in data){
        if(i == 1 || i==2 || i==3){
          if(index != i) {
             data[i].isdefault = false
          }
        }
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