// pages/make_plan/make_plan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ability_list: [
    //   {
    //     name:'判断推理',
    //     show:true,
    //     children:[
    //       {
    //         name: '人文与历史一'
    //       },
    //       {
    //         name: '人文与历史二'
    //       }
    //     ]

    //   },
    //   {
    //      name: "数量关系",
    //      show:true,
    //      children: [
    //        {
    //          name: '测试一'
    //        }
    //      ]
    //   }
    // ],
    user_task_id: '',
    info:'',//默认设置信息
    pinlvnum:'',//可选的打卡频率数组
    pushnum:'',//推送数量
    weekday:'',//坚持周期
    category:'',//推送类别
    type:0     //0任务未完成 1 已完成 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.name){
      wx.setNavigationBarTitle({ title: options.name })
    }
     console.log(options)
    if(options.type){
      that.setData({
        type: options.type
      })
     }
     var uid = app.globalData.uid
     var params = {
       "uid":uid,
       "user_task_id":options.user_task_id
     }
    app.sz.xcxUpdateTaskSet(params).then(d=>{
         if(d.data.status==0){
            that.setData({
               info:d.data.data.info,
               pinlvnum:d.data.data.pinlvnum,
               pushnum:d.data.data.pushnum,
               weekday:d.data.data.weekday,
               category:d.data.data.category,
               user_task_id: options.user_task_id
            })
            // console.log(that.data.weekday)
         }
    })
  },
  //展开/折叠分类按钮
  listTap: function(e) {
      console.log(e.currentTarget.dataset.parentindex)
      var parentindex = e.currentTarget.dataset.parentindex
      var category = this.data.category
      category[parentindex].show = ! category[parentindex].show || false
      var category_single = category[parentindex].show
      this.setData({category})
  },

  //坚持周期按钮
  cycle: function(e){
    var that = this
    var uid = app.globalData.uid
    wx.showActionSheet({
      itemList: that.data.weekday,
      success(res) {
        console.log(res.tapIndex)
        var params = {
          "uid": uid,
          "user_task_id": that.data.user_task_id,
          "data": that.data.weekday[res.tapIndex]
        }
        app.sz.xcxUpdateCycle(params).then(d => {
          if (d.data.status == 0) {
            console.log("成功")
            that.setData({ ['info.days']: that.data.weekday[res.tapIndex] })
          }
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  //修改推送数量按钮
  pushnum: function(e){
        var that = this
        var uid = app.globalData.uid
        wx.showActionSheet({
          itemList: that.data.pushnum,
          success(res) {
            console.log(res.tapIndex)
            var params = {
               "uid":uid,
              "user_task_id": that.data.user_task_id,
               "data":that.data.pushnum[res.tapIndex]
            }
            app.sz.xcxUpdatePushNum(params).then(d=>{
                if(d.data.status==0){
                  console.log("成功")
                  that.setData({['info.num']: that.data.pushnum[res.tapIndex]})
                }
            })
          },
          fail(res) {
            console.log(res.errMsg)
          }
        })
  },

  //打卡频率设置
  navto:function(e){
    var pinlvnum = JSON.stringify(this.data.pinlvnum)
    var user_task_id = this.data.user_task_id
    wx.navigateTo({ url: '../../pages/frequency_set/frequency_set?pinlvnum=' + pinlvnum + '&user_task_id=' + user_task_id })
  },
  //全部取消和选中按钮
  allaction: function(e){
      var that = this
      console.log(e.currentTarget.dataset.index)
      
      var index = e.currentTarget.dataset.index
      var category = that.data.category
      category[index].ischecked = ! category[index].ischecked
      var data = category[index].data
      if(category[index].ischecked){
          data.forEach(function (item) {
             item.ischecked = 1
          })
      }else {
        data.forEach(function (item) {
          item.ischecked = 0
        })
      }
      that.setData({category})
  },

  /**
   * 推送范围的单项选中取消
   */
  isxuanzhong:function(e) {
      var that = this
      var parentindex = e.currentTarget.dataset.parentindex
      var index = e.currentTarget.dataset.index
      var category = that.data.category
      if (category[parentindex].data[index].ischecked==1){
        category[parentindex].data[index].ischecked = 0
      }else {
        category[parentindex].data[index].ischecked = 1
      }
      that.setData({['category']:category})
  },
  ssave:function(){
    // wx.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)

    this.submitrange();
  
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
    if(this.data.task_id){
      var options = { "user_task_id": this.data.user_task_id }
      this.onLoad(options)
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
    
    // wx.showLoading({
    //   title: '加载中...',
    // })
    
    // if(true) {
    //    for (var i in category) {
    //       if(category[i].data > 0) {
    //          for(var j in category[i].data){
    //            console.log(category[i].data[j])
    //          }
    //       }
    //    }
    // }
    // console.log(category)
   
  },

  /**
   * 提交推送范围
   */
  submitrange: function() {

    wx.showLoading({
      title: '加载中...',
    })

    var that = this
    var uid = app.globalData.uid
    var type = that.data.type
    var user_task_id = that.data.user_task_id
    var category = JSON.stringify(that.data.category)
    // var data = new Array()
    // for (var i in category) {
    //     console.log(category[i])
    //     if(category[i].ischecked > 0){
    //       // console.log("这是父级选中的" + category[i].catname)
    //       data.push(category[i].id)
    //     }
    //     for (var j in category[i].data){
    //       console.log(category[i].data[j].ischecked)
    //       if(category[i].data[j].ischecked > 0){
    //         data.push(category[i].data[j].id)
    //         // console.log(j)
    //       } 
    //     }
    // }
    var params = {
      "uid":uid,
      "user_task_id": user_task_id,
      "data": category,
      "type": type
    }
    //console.log(params)
    app.sz.xcxUpdateRangepost(params).then(d=>{
       if(d.data.status==0){
          console.log("修改范围成功")
         wx.hideLoading();
         wx.showToast({
           title: '保存成功',
           icon: 'success',
           duration: 2000
         })
       }else {
          console.log("接口错误")
       }
    })
    
  },
 
  /**
   *  生成新的任务
   */
   

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