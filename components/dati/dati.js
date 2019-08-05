// components/dati/dati.js
var WxParse = require('../../components/wxParse/wxParse.js');
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      total_nums: {
        type: String,
      },
      questions: {
        type: Array
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0,//切换题的inde
    clientHeight: 500,//初始化
    isShow:false,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    content: "",//评论框的内容
    cfBg: false,
    emojiChar:    "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    
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
    alipayEmoji:[],//支付宝表情
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //初始化组件数据
    initcomponent(){
      var em = {}, that = this, emChar = that.data.emojiChar.split("-")
      var emojis = []
      that.data.emoji.forEach(function(v,i){
         em = {
            char: emChar[i],
            emoji: "0x1f" + v
         }
         emojis.push(em)
      })
      that.setData({emojis:emojis})
      //console.log(that.data.emojis)
    },

    //点击表情显示隐藏表情盒子
    emojiShowHide: function() {      
      this.setData({
        isShow: !this.data.isShow,
        isLoad: false,
        cfBg: !this.data.cfBg
      })
      console.log(this.data.isShow)
    },

    //点击emoji背景遮罩隐藏emoji盒子
    cemojiCfBg: function() {
       this.setData({
         isShow: false,
         cfBg: false
       })
    },

    //表情选择
    emojiChoose: function (e) {
      //当前输入内容和表情合并
      this.setData({
          content : this.data.content + e.currentTarget.dataset.emoji
      })
      // console.log(this.data.content)
    },

    //文本域获得焦点
    textAreaFocus: function() {
      this.setData({
        isShow: false,
        cfBg: false
      })
    },

    //文本域失去焦点
    textAreaBlur: function(e) {
      // console.log(e.detail.value)
      this.setData({
        content: e.detail.value
      })
    },

    //发送评论
    send: function() { 
      var that = this, conArr = []; 
      setTimeout(function() {
        if (that.data.content.trim().length > 0) {
          console.log(that.data.content)
          that.setData({
            content: '',
            isShow: false,
            cfBg: false
          })
        } else {
          that.setData({ content: '' })
        }
      },100)
    }
  },
  pageLifetimes: {
     show() {
        var that = this
        that.initcomponent()
     }
  },
  lifetimes: {
    attached() {
        var that = this
        // console.log(that.data.questions)
        wx.getSystemInfo({
          success: function(res) {
            that.setData({ clientHeight : res.windowHeight})
            // that.data.clientHeight = res.windowHeight
          },
        })
     }
  },
})
