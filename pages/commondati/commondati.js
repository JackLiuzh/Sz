// pages/dati/dati.js
var WxParse = require('../../components/wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    clientHeight: 500,
    list: [],
    answers: {
      "uid": 2,
      "totaltime": 12300,
      "ability_secondId": "",
      "ability_title": "分类名",
      "tot": 5,
      "data": [
        {
          "type": 1,
          "question_id": 23,
          "user_answer": 0,
          "duration": 12300,
          "iswrong": 0
        }
      ]
    },
    starttime: '',//开始答题时间点
    endtime: '',//结束答题时间点
    uptime: '', //上一个结束点
    answerlist: [], //答题数组列表
    ability_secondId: '',//二级分类id
    tot: '',//试题总数
    uid: '',
    totaltime: '',
    ability_title: '',
    currentpage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({"title": "拼命加载中..."})
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    console.log(options)

    var towhere = options.towhere
    that.setData({ currentpage: towhere})
    if(towhere=="shoucang") {
      //根据ability_secondId 
      var uid = app.globalData.uid
      var second_id = options.second_id
      var params = {
        "uid": uid,
        "second_id": second_id
      }
      app.tiku.shoucangti(params).then(d => {
        console.log(d)
        if (d.data.data.length) {
          for (let i = 0; i < d.data.data.length; i++) {
            WxParse.wxParse('reply' + i, 'html', d.data.data[i].title, that)
            WxParse.wxParse('replynote' + i, 'html', d.data.data[i].note, that)
            if (i === d.data.data.length - 1) {
              WxParse.wxParseTemArray("replyTemArray", 'reply', d.data.data.length, that)
              WxParse.wxParseTemArray("replyTemArrayNote", 'replynote', d.data.data.length, that)
            }
          }
          that.setData({ list: d.data.data })
          wx.hideLoading()
        }
      })
    }else if(towhere=="cuoti") {
      var uid = app.globalData.uid
      var second_id = options.second_id
      var params = {
          "uid": uid,
          "second_id": second_id
      }
      app.tiku.cuotitimu(params).then(d=>{
         if(d.data.data.length) {
           for (let i = 0; i < d.data.data.length; i++) {
             WxParse.wxParse('reply' + i, 'html', d.data.data[i].title, that)
             WxParse.wxParse('replynote' + i, 'html', d.data.data[i].note, that)
             if (i === d.data.data.length - 1) {
               WxParse.wxParseTemArray("replyTemArray", 'reply', d.data.data.length, that)
               WxParse.wxParseTemArray("replyTemArrayNote", 'replynote', d.data.data.length, that)
             }
           }
           that.setData({list: d.data.data})
           wx.hideLoading()
         }
      })
    }

    

    // 记录开始时间点
    // var starttime = new Date().getTime()
    // this.setData({
    //   starttime: starttime,
    //   uptime: starttime
    // })


  },
  //触发选项按钮
  choosed: function (e) {


    var dd = this.data.list
    var xuanxiang = e.currentTarget.dataset.xuanxiang
    var answer = e.currentTarget.dataset.answer
    var id = e.currentTarget.dataset.id
    var option = e.currentTarget.dataset.option
    var xiang = e.currentTarget.dataset.xiang
    console.log("选中了:" + xuanxiang)
    var ability_id = e.currentTarget.dataset.ability_id
    if (xuanxiang == answer) {
      for (var index in dd) {
        if (dd[index].id == id) {
          dd[index].xuanzhong = xiang
          //dd[index].iscollect = 1
        }
      }
    } else {
      for (var index in dd) {
        if (dd[index].id == id) {
          dd[index].xuanzhong = xiang
          //dd[index].iscollect = 0
        }
      }
    }
    this.setData({ list: dd })

    console.log(this.data.list.length)

    //答每道题所花时间间隔
    var duration = ((new Date().getTime() - this.data.uptime) / 1000).toFixed(0)

    //是否做错
    var iswrong = answer == xuanxiang ? 1 : 0

    var question = {
      "type": 1,
      "question_id": id,
      "user_answer": xuanxiang,
      "ability_id": ability_id,
      "duration": duration,
      "iswrong": iswrong
    }
    this.data.answerlist.push(question)
    console.log(this.data.answerlist)
    //this.setData({ answerlist: this.data.answerlist})

    //更新上一次的时间戳
    this.setData({
      uptime: new Date().getTime(),
    })


  },

  swiperchange: function (e) {
    var current = e.detail.current
    this.setData({ currentTab: current })

  },

  // 取消
  shoucangbut: function (e) {
    let id = e.currentTarget.dataset.id
    let list = this.data.list
    let current = e.currentTarget.dataset.current
    let utype = e.currentTarget.dataset.type
    let uid = app.globalData.uid
    var params = {
      "uid": uid,
      "type": utype,
      "id": '1-' + id
    }

    app.tiku.shoucang(params).then(d => {
      if (d.data.status == 0) {
        if (utype == 0) {
          this.data.list[current].iscollect = 0
          wx.showToast({ title: '取消收藏成功', icon: 'success', duration: 2000 })
        } else if (utype == 1) {
          this.data.list[current].iscollect = 1
          wx.showToast({ title: '收藏成功', icon: 'success', duration: 2000 })
        }
        this.setData({ list })
      }
    })
  },

  //删除题目
  delquestion: function(e){
     let id = e.currentTarget.dataset.id
     let current = e.currentTarget.dataset.current
    // let uid = app.globalData.uid
    // var params = {
    //    "uid": uid,
    //    "id":id
    // }
    var that = this
    wx.showModal({
      title: '确定删除此题？',
      content: '',
      success(res) {
        if (res.confirm) {
          that.delquestion_byid(id,current)
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  delquestion_byid: function (id,current) {
    var that = this
    let uid = app.globalData.uid
    var params = {
       "uid": uid,
       "id": id
    }
    var list = that.data.list
    var leng = list.length
    app.tiku.cuotidel(params).then(d=>{
      if(d.data.status==0){
        list.splice(current,1)
        console.log("删除成功")
        that.setData({ list })
        if(leng > 1 ){
           if(list[current] == list[0]) {
             that.setData({ currentTab :  1})
           }else if(list[current] == list[leng -1]) {
             that.setData({currentTab : current - 1})
           }
        }
      }
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
    // app.aData.show = true;
    // app.aData.answerquestions = this.data;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //app.aData.show = false;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var endtime = new Date().getTime();
    this.setData({ endtime: endtime })
    var totaltime = ((this.data.endtime - this.data.starttime) / 1000).toFixed(0)
    this.setData({ totaltime: totaltime })
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

})