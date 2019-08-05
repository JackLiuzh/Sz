// pages/dati/dati.js
//var WxParse = require('../../components/wxParse/wxParse.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     huadong:true,
     zindex: 0 ,       //记录滑块的索引
     isshowtext:false, //false隐藏文本域
     currentTab:0,
     clientHeight: 500,
     list:[
       {
         title: '这是测试数据',
         a : '选项A',
         b : '选项B',
         c : '选项C',
         d : '选项D'
       }
     ],
     answers: {
       "uid" : 2,
       "totaltime": 12300,
       "ability_secondId": "",
       "ability_title": "分类名",
       "tot":5,
       "data": [
          {
             "type":1,
             "question_id": 23,
             "user_answer": 0,
             "duration": 12300,
             "iswrong":0
          }
       ]
     },
     starttime: '',//开始答题时间点
     endtime: '',//结束答题时间点
   //  uptime:'', //上一个结束点
   //  answerlist: [], //答题数组列表
     ability_secondId:'',//二级分类id
     tot:'',//试题总数
     uid: '',
     totaltime:'',
     ability_title:'',
     idarray:[],

    currentTab: 0,//切换题的inde
    clientHeight: 500,//初始化
    isShow: false,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    content: "",//评论框的内容
    cfBg: false,
emojiChar:"☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [], //qq、微信原始表情
    alipayEmoji: [],//支付宝表情
     total_nums:0,
     correct_nums:0,
     error_nums:0,
     unzuo_nums:0,
     datika:'',
     questions:'',//试题
     uptime:'', //上一个结束时间戳
     answerlist:[], //答题数组结果
     ptype:1,//区别评论和回复
     replay_id :'',//对此id回复的
     user_task_id : '',//任务id
     isfocus: false //是否聚焦
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    wx.showLoading({
      title: '拼命加载中...',
    })
    var that = this
    that.initscreen()
    //设置页面标题
    var task_name = options.task_name
    wx.setNavigationBarTitle({
      title: task_name//页面标题为路由参数
    })
    //初始化数据
    var user_task_id = options.user_task_id
    that.setData({ user_task_id:user_task_id })
    var time = options.time
    var uid = app.globalData.uid
    var params ={
      "uid":uid,
      "user_task_id":user_task_id,
      "time": time
    }
    app.sz.xcxgetTaskTi(params).then(d=>{
      if(d.data.status == 0 ){
        if (d.data.data.data.length) {
         for (let i = 0; i < d.data.data.data.length; i++) {
            d.data.data.data[i].a_an = 2
            d.data.data.data[i].b_an = 2
            d.data.data.data[i].c_an = 2
            d.data.data.data[i].d_an = 2
            // WxParse.wxParse('reply' + i, 'html', d.data.data.data[i].title, that)
            // WxParse.wxParse('replynote' + i, 'html', d.data.data.data[i].note, that)
            // if (i === d.data.data.data.length - 1) {
            //   WxParse.wxParseTemArray("replyTemArray", 'reply', d.data.data.data.length, that)
            //   WxParse.wxParseTemArray("replyTemArrayNote", 'replynote', d.data.data.data.length, that)
            // }
           if ((d.data.data.data[i].isfull == 1) && (d.data.data.data[i].user_answer) && (d.data.data.data[i].user_answer).length > 0){
                var xuanxiang = d.data.data.data[i].user_answer
                var pindex = i
                var answer = d.data.data.data[i].answer
                that.isshowzuotido(xuanxiang, pindex, answer, d.data.data.data[i] )
            }
          }
        }
        let suoyin = 0;
        // if (d.data.data.data.length == 5){
        //   suoyin = 2;
        // } else if (d.data.data.data.length == 4){
        //   suoyin = 1;
        // }   

        that.setData({
          total_nums: d.data.data.total_nums,
          correct_nums: d.data.data.correct_nums,
          error_nums: d.data.data.error_nums,
          unzuo_nums: d.data.data.unzuo_nums,
          datika: d.data.data.datika,
          questions: d.data.data.data,
          zindex: suoyin,
          currentTab: d.data.data.zindex

        })
        wx.hideLoading();
      }else {
         console.log("获得题的接口错误");
      } 
    })
    
    // 记录开始时间点
    var starttime = new Date().getTime()
    this.setData({
      uptime: starttime
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
    this.initcomponent()    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   * 提交答案
   */
  onUnload: function () {
     var that = this
     var uid = app.globalData.uid
     var data = that.data.answerlist
     var user_task_id = that.data.user_task_id
     var params = {
        "uid": uid,
        "data": data,
        "user_task_id": user_task_id
     }
    // console.log(params)
    if (data.length) {
      app.sz.xcxAnswerInsert(params).then(d=>{
        if (d.data.status == 0) {
          //如果任务完成 则 存缓存 任务天数
          if (d.data.accomplish == 1) {
            wx.setStorageSync('accomplish_days', d.data.days);
          }

        } else {
          console.log(d.data.msg);
        }
          
      })
     }else {
        console.log("无答案需要提交")
     }
    // var pages = getCurrentPages()
    // var currPage = pages[pages.length - 1]
    // var prevPage = pages[pages.length - 2]
    // prevPage.setData({ test: 1 })
     
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

  // 初始化屏幕高度
  initscreen: function() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ clientHeight: res.windowHeight })
      },
    })
  },
  //初始化组件数据
  initcomponent() {
    var em = {}, that = this, emChar = that.data.emojiChar.split("-")
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      }
      emojis.push(em)
    })
    that.setData({ emojis: emojis })
    //console.log(that.data.emojis)
  },

  //点击表情显示隐藏表情盒子
  emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      isLoad: false,
      cfBg: !this.data.cfBg
    })
    console.log(this.data.isShow)
  },

  //点击emoji背景遮罩隐藏emoji盒子
  cemojiCfBg: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },

  //表情选择
  emojiChoose: function (e) {
    //当前输入内容和表情合并
    this.setData({
      content: this.data.content + e.currentTarget.dataset.emoji
    })
    // console.log(this.data.content)
  },
  //文本域显示
  onshowtexarear: function(e){
    var qindex = e.currentTarget.dataset.qindex
    var isfocus = 'questions[' + qindex + '].isfocus'
    this.setData({
      [isfocus]: true,
      isshowtext: true
    })
  },
  //文本域获得焦点
  textAreaFocus: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },

  //文本域失去焦点
  textAreaBlur: function (e) {
    var qindex = e.currentTarget.dataset.qindex
    var isfocus = 'questions[' + qindex + '].isfocus'
    this.setData({
      content: e.detail.value,
      isshowtext: false,//瘾藏text
      [isfocus]: false,
      ptype:1,
      replay_id:''
    })
  },

  //发送评论
  send: function (e) {
    var that = this, conArr = [];
    var uid = app.globalData.uid
    var questionid = e.currentTarget.dataset.questionid
    var qindex = e.currentTarget.dataset.qindex
    var ptype = that.data.ptype
    var replay_id = that.data.replay_id
    var main_id =''
    main_id = ptype == 1 ? questionid : replay_id
    setTimeout(function () {
      if (that.data.content.trim().length > 0) {
        console.log(that.data.content)
        var params = {
          "type": ptype,
          "uid": uid,
          "main_id": main_id,
          "content": that.data.content
        }
        app.sz.xcxAddComment(params).then(d => {
          console.log(d.data.conment_data)
          var comm_data = 'questions[' + qindex + '].comment_data'
          that.setData({
            content: '',
            isShow: false,
            cfBg: false,
            [comm_data] : d.data.conment_data
          })
        })
      } else {
        that.setData({ content: '' })
      }
    }, 100) 
  },

  //发表回复
  replay_fun: function(e) {
      var that = this
      var qindex = e.currentTarget.dataset.index
      var isfocus = 'questions[' + qindex + '].isfocus'
      var comment_id = e.currentTarget.dataset.comment_id
    that.setData({ ptype: 2, replay_id: comment_id, [isfocus]: true, isshowtext: true });
      // that.textAreaFocus()
  },
  
  //解析显示隐藏
  noteshow: function(e){
    var that = this
    var qindex = e.currentTarget.dataset.index
    var show = e.currentTarget.dataset.show
    //console.log(e);
    var isnoteshow = 'questions[' + qindex + '].isnoteshow'
    if (show == "0"){
      that.setData({ [isnoteshow]: true });
    }else{
      that.setData({ [isnoteshow]: false });
    } 
  },

  //考点显示隐藏
  kaoshow: function (e) {
    var that = this
    var qindex = e.currentTarget.dataset.index
    var show = e.currentTarget.dataset.show
    //console.log(e);
    var iskaoshow = 'questions[' + qindex + '].iskaoshow'
    if (show == "0") {
      that.setData({ [iskaoshow]: true });
    } else {
      that.setData({ [iskaoshow]: false });
    }
  },

  //点赞
  thume_fun: function(e) {
     var that = this
     var index = e.currentTarget.dataset.index
     var cindex = e.currentTarget.dataset.cindex
     var comment_id =e.currentTarget.dataset.comment_id
     var uid = app.globalData.uid
     var params = {
       "uid": uid,
       "comment_id":comment_id
     }
     app.sz.xcxAddThum(params).then(d=>{
         if(d.data.status == 0){
           var is_zan = "questions[" + index + "].comment_data[" + cindex + "].user_thumbs_up"
           var count_thumbs_up = "questions[" + index + "].comment_data[" + cindex + "].count_thumbs_up"
           var cou = that.data.questions[index].comment_data[cindex].count_thumbs_up
           var cc = parseInt(cou) + 1
           that.setData({ [is_zan]: 1, [count_thumbs_up]: cc })
         }
     })
  },
  //取消点赞
  thumeconcer_fun:function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var cindex = e.currentTarget.dataset.cindex
    var comment_id = e.currentTarget.dataset.comment_id
    var uid = app.globalData.uid
    var params = {
      "uid": uid,
      "comment_id": comment_id
    }
    app.sz.xcxAddThum(params).then(d => {
      if (d.data.status == 0) {
        var is_zan = "questions[" + index + "].comment_data[" + cindex + "].user_thumbs_up"
        var count_thumbs_up = "questions[" + index + "].comment_data[" + cindex + "].count_thumbs_up"
        var cou = that.data.questions[index].comment_data[cindex].count_thumbs_up
        var cc = parseInt(cou) - 1
        that.setData({ [is_zan]: 0, [count_thumbs_up]: cc })
      }
    })
  },

  //查看答题卡
  godatika: function() {
     var that = this
     var datika = JSON.stringify(that.data.datika)
     var total_nums = that.data.total_nums
     var correct_nums = that.data.correct_nums
     var error_nums = that.data.error_nums
     var unzuo_nums = that.data.unzuo_nums
     wx.navigateTo({
       url: '../datika/datika?datika=' + datika + '&total_nums=' + total_nums + '&correct_nums=' + correct_nums + '&error_nums=' + error_nums + '&unzuo_nums=' + unzuo_nums,
     })
  },

  //触发选项按钮
  choosed: function(e) {
    
    var that = this
    var xuanxiang =e.currentTarget.dataset.xuanxiang
    var pindex = e.currentTarget.dataset.pindex
    var answer = that.data.questions[pindex].answer
    var id = that.data.questions[pindex].id
    var people_count = that.data.questions[pindex].people_count  //总数
    var correct_count = that.data.questions[pindex].correct_count //总正确数
    var wrong_count = parseInt(people_count) - parseInt(correct_count) //总错误数
    var duration_sum = that.data.questions[pindex].duration_sum //平台总用时长
    var a_an = 2, b_an = 2, c_an = 2, d_an = 2
      switch (xuanxiang)
      {
        case 'A':
          a_an = xuanxiang == answer ? 1 : 0
          break;
        case 'B':
          b_an = xuanxiang == answer ? 1 : 0
          break;
        case 'C':
          c_an = xuanxiang == answer ? 1 : 0
          break;
        case 'D':
          d_an = xuanxiang == answer ? 1 : 0
          break;  
      }
      switch(answer)
      {
          case 'A':
            a_an = 1
            break;
          case 'B':
            b_an = 1
            break;
          case 'C':
            c_an = 1 
            break;
          case 'D':
            d_an = 1
            break;   
      }
      //是否做错
      var iswrong = answer == xuanxiang ? 1 : 0
      //答每道题所花时间间隔
      var duration = ((new Date().getTime() - this.data.uptime) / 1000).toFixed(1)
      //是否做了
      var isdo = 'questions[' + pindex +'].isdo'
      var iswro = 'questions[' + pindex + '].iswrong'
      var du = 'questions[' + pindex + '].duration'
      var a = 'questions[' + pindex + '].a_an'
      var b = 'questions[' + pindex + '].b_an'
      var c = 'questions[' + pindex + '].c_an'
      var d = 'questions[' + pindex + '].d_an'
      //重新计算平台均用时和正确率
      var ave_du = 'questions[' + pindex + '].average_duration' //平台均用时=总用时/总数
      var ro = 'questions[' + pindex + '].rote'
      var newduration = parseFloat(duration) + parseFloat(duration_sum)  //新的总用时
      var newpeople_count = parseInt(people_count) + 1  //新的总人数
      if (iswrong) {
        var newwrong_count = parseInt(correct_count) + 1
        var newave_du = Math.ceil(newduration / newpeople_count)
        var newro = Math.round(newwrong_count / newpeople_count) * 100
      } else {
        var newave_du = Math.ceil(newduration / newpeople_count)
        var newro = Math.round(correct_count / newpeople_count) * 100
      }
      
      var qu = {
        "type": 1,
        "question_id": id,
        "user_answer": xuanxiang,
        "duration": duration,
        "iswrong": iswrong
      }
      that.data.answerlist.push(qu)
   
      //修改答题卡
      var dati = that.data.datika
      var datiiswrong = 'datika['+ pindex + '].iswrong'
      //统一修改setdata
    that.setData({ [a]: a_an, [b]: b_an, [c]: c_an, [d]: d_an, [isdo]: 1, [iswro]: iswrong, [du]: duration, [ave_du]: newave_du, [ro]: newro, uptime: new Date().getTime(), [datiiswrong]: iswrong})

      //答题正确自动跳转
      // if (answer == xuanxiang) {
      //   var arlength = that.data.questions.length
      //   var cur = that.data.currentTab + 1
      //   //console.log(arlength,cur)
      //   if (cur == arlength) {
      //     that.setData({ currentTab: that.data.currentTab })
      //   } else {
      //     that.setData({ currentTab: that.data.currentTab + 1 })
      //   }
      // }
  },

  //手动滑页
  swiperchange: function(e) {
    var that = this
    var huadong = this.data.huadong;
    var current = Number(e.detail.current)  // 当前的
    console.log(current);
    var currentItemId = Number(e.detail.currentItemId) //答题卡序号
    var zindex = Number(this.data.zindex);   //上一个
    var currentTab = Number(this.data.currentTab); //显示的做题序号
    //答题卡
    var datika = this.data.datika;
    //获取试题
    var questions = this.data.questions;
    var length = questions.length;
    //增加的试题id
    var main_id = [];
    //增加的序号
    let i_array = [];
    //增加题数量
    let j = 1;  
     //右滑
    if (current > zindex){
      currentTab = Number(currentTab) + 1;
      that.setData({
        zindex: current,
        currentTab: currentTab
      })  
      //获取最后一个试题
      var i = questions[length-1]["i"];
      i = i+1;
      for (i; i < datika.length; i++) {
        if (main_id.length < j){
            main_id.push(datika[i]["id"]);
            let m = {};
            m.i = i;
            m.id = datika[i]["id"];
            i_array.push(m);
        }
      }
     }
    console.log(i_array);
    //左滑
    if (current < zindex) {
      currentTab = Number(currentTab) - 1;
      that.setData({
        zindex: current,
        currentTab: currentTab
      })
      var i = questions[0]["i"];
      for (i = i-1; i >= 0; i--) {
        if (main_id.length < j) {
          main_id.push(datika[i]["id"]);
          let m={};
          m.i = i;
          m.id = datika[i]["id"];
          i_array.push(m);
        }
      }
    }

    console.log(datika);
    //获取试题
    if (main_id.length > 0){
        var user_task_id = this.data.user_task_id
        var uid = app.globalData.uid
        var params = {
          "uid": uid,
          "user_task_id": user_task_id,
          "main_id": main_id.join(",")
        }
        app.sz.xcxgetTaskTiOne(params).then(d => {
          if (d.data.status == 0) {
            if (d.data.data.length > 0) {
              for (let k = 0; k < d.data.data.length; k++) {
                  d.data.data[k].a_an = 2
                  d.data.data[k].b_an = 2
                  d.data.data[k].c_an = 2
                  d.data.data[k].d_an = 2
                  for (let n = 0; n < i_array.length; n++){
                      if (i_array[n]["id"] == d.data.data[k]["id"]){
                        d.data.data[k].i = i_array[n]["i"];
                      }
                  }
                  if ((d.data.data[k].user_answer) && (d.data.data[k].user_answer).length > 0) {
                    var xuanxiang = d.data.data[k].user_answer
                    var answer = d.data.data[k].answer
                    that.isshowzuotido(xuanxiang, k, answer, d.data.data[k])
                  } 
                  if (zindex < current) { //右滑动
                    questions.push(d.data.data[k]);
                  } else {
                    questions.unshift(d.data.data[k]);
                  } 
              }
              console.log(questions);
              that.setData({
                questions: that.data.questions
              })
            }
          } 
        })
    }
  },

  
  isshowzuotido: function(xuanxiang,pindex,answer,question) {
    var that = this
    //console.log("zheshi"+pindex)
    var a_an = 2, b_an = 2, c_an = 2, d_an = 2
    switch (xuanxiang) {
      case 'A':
        a_an = xuanxiang == answer ? 1 : 0
        break;
      case 'B':
        b_an = xuanxiang == answer ? 1 : 0
        break;
      case 'C':
        c_an = xuanxiang == answer ? 1 : 0
        break;
      case 'D':
        d_an = xuanxiang == answer ? 1 : 0
        break;
    }
    switch (answer) {
      case 'A':
        a_an = 1
        break;
      case 'B':
        b_an = 1
        break;
      case 'C':
        c_an = 1
        break;
      case 'D':
        d_an = 1
        break;
    }
    //是否做错
    var iswrong = answer == xuanxiang ? 1 : 0
    //答每道题所花时间间隔
    //var duration = ((new Date().getTime() - this.data.uptime) / 1000).toFixed(0)
    //是否做了
    // var isdo = 'questions[' + pindex + '].isdo'
    // var iswro = 'questions[' + pindex + '].iswrong'
    // var du = 'questions[' + pindex + '].duration'
    // var a = 'questions[' + pindex + '].a_an'
    // var b = 'questions[' + pindex + '].b_an'
    // var c = 'questions[' + pindex + '].c_an'
    // var d = 'questions[' + pindex + '].d_an'
    // var isfocus = 'questions[' + pindex + '].isfocus'
    // that.setData({ [a]: a_an, [b]: b_an, [c]: c_an, [d]: d_an, [isdo]: 1, [iswro]: iswrong, [du]: duration, [isfocus]: false })
    //试题增加数据
    question.isdo = 1;
    question.iswrong = iswrong;
    question.a_an = a_an;
    question.b_an = b_an;
    question.c_an = c_an;
    question.d_an = d_an;
    question.isfocus = false;
  }

})