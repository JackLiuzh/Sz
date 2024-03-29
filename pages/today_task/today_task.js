const app = getApp()
const filter = require('../../utils/filter.js');
Page({
  /**
   * 页面的初始数 据
   */
  data: {
    time: "获取验证码",
    currentTime: 61,
    showModal:false,//true 登录弹出框显示
    showModal_zb:false, //弹框
    uid:0,//是否手机号登陆
    isauth:false,//是否微信号授权
    ifburenwu:0,    //每日刷题显示补任务
    accomplish_days: 0 ,  
    already_num : '', //今日完成的任务数量
    count: '',
    unnews: '', //评论点赞数 + 评论回复数
    list: '',  //今日任务
    complete_list:[], //已完成的任务
    maskHidden:false,
    height: '',
    width: '',
    imagePath:'',
    nickName:'',
    touxiang:'',
    daka_bg:'',//打卡背景图
    daka_text:'',//打卡文字
    zongshu_total:'',//打卡总题数
    daka_days: '',//打卡累计天数
    lookvideos:'',//打卡看的总视频
    erweima:'../../images/xiao_icon.jpg',
    zhibo_data:'',//直播数据
    test: 0,
    display:'none',//是否显示任务结束后的恭喜弹窗
    isIPX: app.globalData.isIPX,
    project:{    //专项测评
      "project_list":[],
      "project_count":0,
      "userproject_count":0,
      "isover_project":0,
      "projectvideo_count":0
    }
  },
  //获取手机号登陆微信小程序
  getPhoneNumber: function (e) {
    var that = this
    wx.showLoading({
      title: '登录中...',
    })
    wx.login({
      success: res => {
        // that.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          let iv = encodeURIComponent(e.detail.iv);
          let encryptedData = encodeURIComponent(e.detail.encryptedData);
          let code = res.code
          var params = {
            "code": code,
            "iv": iv,
            "encryptedData": encryptedData
          }
          console.log(params)
          app.sz.loginregister(params).then(d => {
            // console.log(d)
            if (d.data.status == 0) {
              // app.wechat.setStorage('isauth', true);
              app.wechat.setStorage('token', d.data.token);
              app.wechat.setStorage('uid', d.data.uid);
              that.setData({ uid: d.data.uid })
              app.globalData.uid = d.data.uid;
              app.wechat.setStorage('userInfo', d.data.userInfo)
              that.onShow()
              if (d.data.isfirstlogin == 1) {
                // wx.switchTab({ url: '../today_task/today_task' })
                // wx.switchTab({ url: '../first_page/first_page' })
                
              } else {
                // wx.redirectTo({ url: '../first_comming/first_comming' })
                // wx.switchTab({ url: '../first_page/first_page' })
              }
              //自动创建任务

            } else {
              // app.wechat.setStorage('isauth', false);
            }
            wx.hideLoading()
          })
        } else {
          // that.setData({
          //   showModal: true
          // })
          wx.hideLoading()
        }
      }
    })
  },

  //获取用户微信数据
  bindGetUserInfo: function (e) {
    wx.showLoading({
      title: '登录中...',
    })
    var that = this;
    // 获取用户信息
    if (e.detail.userInfo) {
      console.log(e);
      app.wechat.setStorage('userInfo', e.detail.userInfo);
      var userInfo = e.detail.userInfo;
      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            app.wechat.setStorage('isauth', true);
            that.setData({isauth: true})
            app.wechat.login().then(d => {
              console.log(d)
              var params = {
                "code": d.code,
                "encryptedData": encryptedData,
                "iv": iv,
                "userinfo": userInfo
              }
              // app.sz.loginregister(params).then(d => {
              //   that.setData({ isauth: true })
              //   app.wechat.setStorage("uid", d.data.uid).then(s => {
                  
              //     wx.hideLoading()
              //     if (d.data.isfirstlogin == 1) {
              //       // wx.switchTab({ url: '../today_task/today_task' })
              //       wx.setStorageSync("token", d.data.token)
              //       app.globalData.token = d.data.token

              //     } else {
              //       // wx.redirectTo({ url: '../first_comming/first_comming' })
              //     }
                  
              //   })
              // })
              that.onShow()

            })

          } else {
            app.wechat.setStorage('isauth', false);
          }

        }
      })

    } else {
      console.log("用户拒绝授权用户信息")
      wx.hideLoading()
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var isauth =  wx.getStorageSync('isauth')
    var uid = wx.getStorageSync('uid')
    this.setData({uid:uid,isauth:isauth})

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
       var that = this
       //获取屏幕宽度，获取自适应单位
       wx.getSystemInfo({
         success: function(res) {
            that.setData({ height: res.windowHeight + 64, width: res.windowWidth })
         },
       })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow");
    this.iswxuser();

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
   

   var that = this
    //本地缓存
    wx.getStorage({
      key:"accomplish_days",
      success(res) {
        that.setData({
          accomplish_days: res.data,
          display: "block"
        });
      }
    });
    //获得本地缓存的昵称和头像
      wx.getStorage({
        key:'userInfo',
        success(res) {
            that.setData({
              nickName:res.data.name
            })
            wx.downloadFile({
              url: res.data.avatar,
              success: function(r) {
                 that.setData({touxiang: r.tempFilePath})
              }
            })
        }
      })
     


    wx.showLoading({ title: '加载中' });
    app.globalData.uid = wx.getStorageSync('uid');
    let uid = app.globalData.uid;
    if (uid){
      that.xcxSubmitTask(uid)

    }
   

      var params = {
        "uid": uid
      }
      app.sz.xcxTodayTask(params).then(d => {
        if (d.data.status == 0) {
          wx.downloadFile({
            url: d.data.data.poster.img_url,
            success: function (r) {
              that.setData({ daka_bg: r.tempFilePath })
            }
          })
          that.setData({
            already_num: d.data.data.already_num,
            count: d.data.data.count,
            unnews: d.data.data.unnews,
            list: d.data.data.list,
            complete_list: d.data.data.complete_list,
            daka_days: d.data.data.daka_days,
            zongshu_total: d.data.data.zongshu_total,
            lookvideos: d.data.data.lookvideos,
            daka_bg: d.data.data.poster.img_url,
            daka_text: d.data.data.poster.title,
            zhibo_data: d.data.data.zhibo_data,
            project: d.data.data.project,
            uid: uid,
            ifburenwu: d.data.data.ifburenwu
          })
          wx.hideLoading()
        } else {
          console.log("接口错误")
        }
      })

  },

  //根据任务不同跳转不 同
  today_goto: function(e) {
     var user_task_id = e.currentTarget.dataset.user_task_id
     var type = e.currentTarget.dataset.type
     var currenttime = this.currentdate()
     var task_name = e.currentTarget.dataset.task_name
     console.log(type)
     switch (type) {
        case "1":
          wx.navigateTo({
            url: '../dati/dati?user_task_id=' + user_task_id + '&time=' + currenttime + '&task_name=' + task_name
          });
          break;
        case "2":
          wx.navigateTo({
            url: '../kao_video/kao_video?user_task_id=' + user_task_id + '&time=' + currenttime + '&task_name=' + task_name
          });
          break;
        default:
         wx.navigateTo({ 
           url: '../material_qu/material_qu?user_task_id=' + user_task_id + '&time=' + currenttime + '&task_name=' + task_name
           })
          break;
      }

  },
  /**
   * 返回当前系统日期
   */
  currentdate:function() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + '-' + M + '-' + D
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
  //关闭海报触发
  closedaka: function() {
    
      this.setData({maskHidden: false})
  },
  //保存图片到手机相册
  baocun: function() {
     var that = this
     wx.saveImageToPhotosAlbum({
       filePath: that.data.imagePath,
       success(res) {
          wx.showModal({
            title: '保存成功',
            content: '图片已保存到相册，赶紧晒一下吧！',
            showCancel: false,
            confirmText:'好的',
            confirmColor:'#333',
            success: function(res) {
               if(res.confirm) {
                   that.setData({maskHidden: false});
               }
            },fail:function(res){
               console.log("保存照片错误")
            }
          })
       },fail:function(res) {
         console.log(res)
       }
     })
  },
  /**
   * 触发成功海报按钮
   * res[0].path, nickName, erweima, daka_bg, daka_text, list, daka_days, zongshu_total,lookvideos,finish
   */
  shengchenghaibao: function (touxiang, nickName, erweima, daka_bg, daka_text, list, daka_days, zongshu_total, lookvideos, finish) {
    var rpx;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        rpx = res.windowWidth / 375
      },
    })

    var that = this
    const context = wx.createCanvasContext('mycanvas')

    //画背景
    context.setFillStyle("white")
    context.drawImage(daka_bg, 0, 0, 432 * rpx, 223 * rpx)
    
    //画下半部的白底
    context.setFillStyle('white')
    context.fillRect(0, 223 * rpx, 432 * rpx, 410* rpx)

    //画头像
    context.save();
    context.beginPath();
    context.arc(180 * rpx, (100 * rpx), 40 * rpx, 0, 2 * Math.PI);
    context.setStrokeStyle('white')
    context.stroke()
    context.clip()
    context.drawImage(touxiang, 130 * rpx, 60 * rpx, 100 * rpx, 100 * rpx)

    //画昵称
    context.restore()
    context.beginPath()
    context.setFontSize(20 * rpx)
    context.setFillStyle('white')
    context.setTextAlign('center')
    context.fillText(nickName, 180 * rpx, 180 * rpx)
    context.stroke()
    
    //画专项刷题
    context.beginPath()
    context.setFontSize(24 * rpx)
    context.setFillStyle('black')
    context.setTextAlign('center')
    context.setTextBaseline('bottom')
    context.fillText('每日刷题', 186 * rpx, 275 * rpx)
    context.stroke()

  //任务完成
    if (finish == 1){
      context.drawImage("../../images/renwuwancheng@2x.png", 250 * rpx, 230 * rpx, 80 * rpx, 80*rpx) 
    }
    var task_num = list.length
    if (task_num == 4) {
      var i11 = 36 * rpx, i12 = 69 * rpx, i13 = 35 * rpx
      list.forEach(function (item) {
        context.setFontSize(16 * rpx)
        context.setFillStyle('black')
        context.fillText(item.tname, i11, 369 * rpx)
        context.fillText('题', i12, 415 * rpx)
        context.setFontSize(40 * rpx)
        context.setFillStyle('#E65557')
        context.fillText(item.already_total, i13, 420 * rpx)
        i11 += 101 * rpx
        i12 += 95 * rpx
        i13 += 96 * rpx
      })
    } else if (task_num == 2) {
      var i11 = 143 * rpx, i12 = 164 * rpx, i13 = 131 * rpx
      list.forEach(function (item) {
        context.setFontSize(16 * rpx)
        context.setFillStyle('black')
        context.fillText(item.tname, i11, 350 * rpx)
        context.fillText('题', i12, 415 * rpx)
        context.setFontSize(40 * rpx)
        context.setFillStyle('#E65557')
        context.fillText(item.already_total, i13, 420 * rpx)
        i11 = i11 + 99 * rpx
        i12 = i12 + 105 * rpx
        i13 = i13 + 104 * rpx
      })
    } else if (task_num == 1) {
      list.forEach(function (item) {
        context.setFontSize(16 * rpx)
        context.setFillStyle('#A5A3A3')
        context.fillText("今日任务", 183 * rpx, 320 * rpx)
        context.setFillStyle('#333333')
        context.fillText('题', 204 * rpx, 380 * rpx)
        context.setFontSize(40 * rpx)
        context.setFillStyle('#E65557')
        context.fillText(item.already_total, 171 * rpx, 385 * rpx)
      })
    } else if (task_num == 3) {
      var i11 = 82 * rpx, i12 = 109 * rpx, i13 = 75 * rpx
      list.forEach(function (item) {
        context.setFontSize(16 * rpx)
        context.setFillStyle('black')
        context.fillText(item.tname, i11, 369 * rpx)
        context.fillText('题', i12, 415 * rpx)
        context.setFontSize(40 * rpx)
        context.setFillStyle('#E65557')
        context.fillText(item.already_total, i13, 420 * rpx)
        i11 += 101 * rpx
        i12 += 95 * rpx
        i13 += 96 * rpx
      })
    }
    //总的统计
    context.setFillStyle('#F3F4F5')
    context.fillRect(0, 410 * rpx, 432 * rpx, 100 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(daka_days, 56 * rpx, 460 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('天', 85 * rpx, 460 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('坚持打卡', 75 * rpx, 496 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(zongshu_total, 182 * rpx, 460 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('题', 218 * rpx, 460 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('累计做题', 194 * rpx, 496 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(lookvideos, 298 * rpx, 460 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('个', 327 * rpx, 460 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('累计看视频', 320 * rpx, 496 * rpx)

    // 底部标语和二维码
    context.setFontSize(20 * rpx)
    context.setFillStyle('#333333')
    context.setTextBaseline('bottom')
    context.fillText('尚政公考', 74 * rpx, 560 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#999999')
    context.setTextBaseline('bottom')
    context.fillText('公务员考试提分利器', 114 * rpx, 590 * rpx)

    //底部扫码
    context.drawImage(erweima, 256 * rpx, 520 * rpx, 90 * rpx, 103 * rpx)


    context.draw()
    //生成临时图片 
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          that.setData({ imagePath: res.tempFilePath })
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }, 300)


    this.setData({ maskHidden: true })
  },

  golive: function () { 
    let url = encodeURIComponent(this.data.zhibo_data.playurl);
    console.log(url);
    wx.navigateTo({
      url: '../live/live?url='+ url,
    });
  },

  /**
   * 生成海报的方法
   * bgimg: 海报背景图
   * text: 文字
   * isdone: 今日任务是否完成
   * currentnum:今日刷题数
   * tuiwen:今日推文数
   * video:今日完成的考点视频数
   * chengyu:今日完成的成语数
   * total_daka:累计打卡天数
   * total_ti:累计做题数
   * total_video:累计看视频数
   */
  createNewImg: function(bgimg,text,isdone,currentnum,tuiwen,video,chengyu,total_daka,total_ti,total_video) {
      var that = this
      //1获取微信头像 
      let promise1 = new Promise(function(resolve,reject){
          wx.getImageInfo({
            src: that.data.touxiang,
            success: function(res) {
              console.log(res);
              resolve(res);
            }
          })
      })
      //2获取打卡背景
      let promise2 = new Promise(function(resolve, reject){
          wx.getImageInfo({
            src: that.data.daka_bg,
            success: function(res) {
              console.log(res);
              resolve(res);
            }
          })
      })

     
      //获取背景网络图片
      Promise.all([promise1,promise2]).then(res=>{
           wx.showLoading({
              title: '分享图片生成中...',
              icon: 'loading',
              duration:1000
           })
           var nickName = that.data.nickName
           var erweima = that.data.erweima
           var daka_bg = res[1].path
           var daka_text = that.data.daka_text
           var list = that.data.list
           var daka_days = that.data.daka_days
           var lookvideos = that.data.lookvideos
           var zongshu_total = that.data.zongshu_total
           let finish = 0 //任务没完成
           if (that.data.already_num >= that.data.count){
             finish = 1
           } 
        console.log("每日刷题");
        that.shengchenghaibao(res[0].path, nickName, erweima, daka_bg, daka_text, list, daka_days, zongshu_total, lookvideos, finish)
      })
  },

  //隐藏恭喜提示框
  hideview: function() {
    this.setData({ display: 'none' });
    //销毁缓存 accomplish_days
    wx.removeStorageSync("accomplish_days");
  },

  //跳转到专项测评列表
  gospecial_subject: function(){
    let project =  this.data.project;
    if (project.isover_project > 0 ){
        wx.navigateTo({
          url: '../special_subject/special_subject'
        });
    }
  },

  //跳转到专项测评做题页面
  godatiproject: function(e){
    var id = e.currentTarget.dataset.id
    var kemu_id = e.currentTarget.dataset.kemu_id
    var finish = e.currentTarget.dataset.finish
    if (finish == 1){
      wx.navigateTo({
        url: '../assessment_detail/assessment_detail?h_id=' + id + '&kemu_id=' + kemu_id +'&back=0'
      });
    }else{
      wx.navigateTo({
        url: '../test_dati/test_dati?id=' + id + '&kemu_id=' + kemu_id
      });
    }
    
  },

  godati_sl: function (e) {
    let that = this
    var id = e.currentTarget.dataset.id
    var kemu_id = e.currentTarget.dataset.kemu_id
    var finish = e.currentTarget.dataset.finish
    if (finish == 1) {
      wx.navigateTo({
        url: '../analyse_sl/analyse_sl?h_id=' + id + '&back=0'
      });
    } else {
      that.setData({ first_tip: wx.getStorageSync('first_tip') })
      console.log(that.data.first_tip)
      if (that.data.first_tip) {
        wx.navigateTo({
          url: '../dati_sl/dati_sl?id=' + id
        })
      } else {
        wx.navigateTo({
          url: '../question_know/question_know?id=' + id
        })
        wx.setStorageSync('first_tip', that.data.first_tip)
        
      }
      
    }

  },

  //生成专题测海报
  createZhuantiImg: function (e){

    console.log(1111);
    var that = this
    //1获取微信头像 
    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.touxiang,
        success: function (res) {
          resolve(res);
        }
      })
    })
    //2获取打卡背景
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.daka_bg,
        success: function (res) {
          resolve(res);
        }
      })
    })

    //获取背景网络图片
    Promise.all([promise1, promise2]).then(res => {
      wx.showLoading({
        title: '分享图片生成中...',
        icon: 'loading',
        duration: 1000
      })
      var nickName = that.data.nickName
      var erweima = that.data.erweima
      var daka_bg = res[1].path
      var daka_text = that.data.daka_text
      var touxiang = res[0].path
     
      let project = that.data.project 
      
      var project_count = project.project_count
      var wancheng_total = project.userproject_count
      var look_count = project.projectvideo_count
      
      that.shengchenghuantihaibao(touxiang, nickName, erweima, daka_bg, daka_text, project_count, wancheng_total, look_count)
    })
       
  },
  //生成专题测海报
  shengchenghuantihaibao: function (touxiang, nickName, erweima, daka_bg, daka_text, project_count, wancheng_total, look_count){

    var rpx;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        rpx = res.windowWidth / 375
      },
    })

    var that = this
    const context = wx.createCanvasContext('mycanvas')

    //画背景
    context.setFillStyle("white")
    context.drawImage(daka_bg, 0, 0, 432 * rpx, 223 * rpx)


    //画下半部的白底
    context.setFillStyle('white')
    context.fillRect(0, 223 * rpx, 432 * rpx, 410 * rpx)

    //画头像
    context.save();
    context.beginPath();
    context.arc(180 * rpx, (100 * rpx), 40 * rpx, 0, 2 * Math.PI);
    context.setStrokeStyle('white')
    context.stroke()
    context.clip()
    context.drawImage(touxiang, 130 * rpx, 60 * rpx, 100 * rpx, 100 * rpx)

    //画昵称
    context.restore()
    context.beginPath()
    context.setFontSize(20 * rpx)
    context.setFillStyle('white')
    context.setTextAlign('center')
    context.fillText(nickName, 180 * rpx, 180 * rpx)
    context.stroke()

    //画专项刷题
    context.beginPath()
    context.setFontSize(24 * rpx)
    context.setFillStyle('black')
    context.setTextAlign('center')
    context.setTextBaseline('bottom')
    context.fillText('专项刷题', 186 * rpx, 275 * rpx)
    context.stroke()

  
     
        context.setFontSize(18 * rpx)
        context.setFillStyle('#A5A3A3')
        context.fillText("本期专题任务", 183 * rpx, 320 * rpx)
        context.setFontSize(40 * rpx)
        context.setFillStyle('#E65557')
        if(that.data.project.first_pro == 1){
          context.fillText("已完成", 182 * rpx, 385 * rpx)
        }else{
          context.fillText("未完成", 182 * rpx, 385 * rpx)
        }
        

    
    //总的统计
    context.setFillStyle('#F3F4F5')
    context.fillRect(0, 410 * rpx, 432 * rpx, 100 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(project_count, 56 * rpx, 460 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('期', 85 * rpx, 460 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('专项刷题共', 75 * rpx, 496 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(wancheng_total, 182 * rpx, 460 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('期', 218 * rpx, 460 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('刷题完成', 194 * rpx, 496 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(look_count, 298 * rpx, 460 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('期', 327 * rpx, 460 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('看专题课', 320 * rpx, 496 * rpx)

    // 底部标语和二维码
    context.setFontSize(20 * rpx)
    context.setFillStyle('#333333')
    context.setTextBaseline('bottom')
    context.fillText('尚政公考', 74 * rpx, 560 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#999999')
    context.setTextBaseline('bottom')
    context.fillText('公务员考试提分利器', 114 * rpx, 590 * rpx)

    //底部扫码
    context.drawImage(erweima, 256 * rpx, 520 * rpx, 90 * rpx, 103 * rpx)


    context.draw()
    //生成临时图片 
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          that.setData({ imagePath: res.tempFilePath })
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }, 300)

    this.setData({ maskHidden: true })
  },

  //看直播
  golookzhibo: function (e) {
    // var url = encodeURIComponent(e.currentTarget.dataset.url)
    // if (url) {
    //   wx.navigateTo({
    //     url: '../live/live?url=' + url
    //   });
    // }
    var video_id = e.currentTarget.dataset.video_id
    var lesson_id = e.currentTarget.dataset.lesson_id
    console.log(lesson_id);
    if (video_id) {
      wx.navigateTo({
        url: '../live/live?video_id=' + video_id + '&lesson_id=' + lesson_id
      });
    }
  },

 //uid==0
  new_GetUserInfo(e) {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          let name = e.detail.userInfo.nickName
          let avatar = e.detail.userInfo.avatarUrl
          wx.setStorageSync('wxname', name)
          wx.setStorageSync('wxavatar', avatar)
          // let lesson_id = this.data.courselive[id].lesson_id
          wx.navigateTo({
            url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
          });
          console.log(name)
          console.log(avatar)
        } else {
          console.log("用户拒绝授权")
        }
      }
    })
  },
  // uid》0
  bindGetUserInfo(e) {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          var bendiuserinfo = wx.getStorageSync("userInfo")
          bendiuserinfo.name = e.detail.userInfo.nickName
          bendiuserinfo.avatar = e.detail.userInfo.avatarUrl
          wx.setStorageSync('userInfo', bendiuserinfo)
          that.saveuserinfo()
        } else {
          console.log("用户拒绝授权")
        }
      }
    })
  },
  iswxuser: function () {
    var that = this
    var avatar = that.data.avatar
    var bendiava = wx.getStorageSync("userInfo").avatar
    var bendname = wx.getStorageSync("userInfo").name
    if (bendname) {
      if (bendname.indexOf('szgk') != -1) {
        that.setData({ iswxuser: false })
      } else {
        that.setData({ iswxuser: true })
      }
    }

  },
  //保存授权信息信息
  saveuserinfo: function () {
    var that = this
    var uid = wx.getStorageSync("uid")
    var token = wx.getStorageSync("token")
    var wxname = wx.getStorageSync("userInfo").name
    var wxava = wx.getStorageSync("userInfo").avatar
    var params = {
      uid: uid,
      name: wxname,
      avatar: wxava
    }
    app.sz.xcxuserInfo(params).then(d => {
      console.log(d)
      if (d.data.status == 0) {
        // wx.navigateTo({
        //   url: '/pages/live/live?video_id=' + that.data.video_id,
        // })
        console.log("保存成功")
        if (this.data.finish == 0) {
          this.setData({
            showModal_zb: true
          })
        } else {
          // let url = encodeURIComponent(this.data.bpurl);
          // console.log(url);
          wx.navigateTo({
            url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
          });
        }
      } else {
        console.log("保存失败")
      }
    })
  },
  showModal: function (e) {
    var video_id = e.currentTarget.dataset.video_id;
    var lesson_id = e.currentTarget.dataset.video_id;
    var finish = e.currentTarget.dataset.finish;
    var project_id = e.currentTarget.dataset.project_id;
    var kemu_id = e.currentTarget.dataset.kemu_id;
    this.setData({
      video_id: video_id,
      lesson_id: lesson_id,
      finish: finish,
      project_id: project_id,
      kemu_id: kemu_id
    })
  },  
  zb_dati: function () {
    let that = this
    if (that.data.kemu_id == 7) {
      that.setData({ first_tip: wx.getStorageSync('first_tip') })
      console.log(that.data.first_tip)
      if (that.data.first_tip) {
        wx.navigateTo({
          url: '../dati_sl/dati_sl?id=' + that.data.project_id
        })
      } else {
        wx.navigateTo({
          url: '../question_know/question_know?id=' + that.data.project_id
        })
        wx.setStorageSync('first_tip', that.data.first_tip)

      }
    }
    else {
      wx.navigateTo({
        url: '../test_dati/test_dati?id=' + that.data.project_id + '&kemu_id=' + that.data.kemu_id
      });
    }
    that.setData({
      showModal_zb: false
    })
  },
  zblive: function () {

    wx.navigateTo({
      url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
    });
    this.setData({
      showModal_zb: false
    })
  },
  close_zb: function () {
    this.setData({
      showModal_zb: false
    })
  },
  //登录成功自动创建任务
  xcxSubmitTask: function (uid) {
    var that = this
    var params = {
      uid: uid
    }
    app.sz.xcxSubmitTask(params).then(d => {
      if (d.data.status == 0) {
        console.log("创建任务城东")
        that.onShow()
      }
    })
  },
  //发送验证码
  getYzm: function (e) {
    var that = this
    var token = wx.getStorageSync('token');
    var phone = this.data.dphone;
    if (this.data.disabled || !phone){
       return;
    }
    // console.log(phone)
    var params = {
      "token": token,
      "phone": phone,
    }
    console.log(params)
    app.sz.xcxMyGetyzm(params).then(d => {
      if (d.data.status == 1) {
        console.log('成功')
        that.setData({
          disabled: true
        })
        let interval = null;
        let currentTime = that.data.currentTime;
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            time: currentTime,
            suffix: ' s '
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: '重新发送',
              suffix: '',
              currentTime: 61,
              disabled: false
            })
          }
        }, 1000)
      } else {
        wx.showToast({
          title: d.data.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  inputphone: function (e) {
    this.setData({
      dphone: e.detail.value
    })
    console.log(this.data.dphone)
  },

  inputcode: function (e) {
    this.setData({
      code: e.detail.value
    })
    console.log(this.data.code)
  },
  //手机号登录
  Sendyzm: function () {
    var that = this
    var phone = this.data.dphone;
    var params = {
      "phone": phone,
      "code": this.data.code,
    }
    if (!phone || !this.data.code){
      return;
    }
    app.sz.loginRegister(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ isbuy: d.data.data.isbuy, avatarUrl: d.data.data.avatar, nickName: d.data.data.name })
        if (d.data.data.phone != '')
          this.setData({ userphone: d.data.data.phone })
        console.log(d.data.msg)
        wx.setStorageSync("uid", d.data.data.uid)
        wx.setStorageSync("token", d.data.data.token)
        wx.setStorageSync('userInfo', d.data.data)
        that.onShow()
        this.setData({
          showModal: false
        })
      } else {
        wx.showToast({
          title: d.data.msg,
          icon: 'none',
          duration: 1000
        })
        console.log(d.data.msg)
      }
   
    })
    
 
   
  },
  //微信登录
  getPhoneNumber: function (e) {
    var that = this
    wx.login({
      success: res => {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          wx.showLoading({
            title: '登录中...',
          })
          let iv = encodeURIComponent(e.detail.iv);
          let encryptedData = encodeURIComponent(e.detail.encryptedData);
          let code = res.code
          var params = {
            "code": code,
            "iv": iv,
            "encryptedData": encryptedData
          }
          console.log(params)
          app.sz.loginregister(params).then(d => {
            // console.log(d)
            if (d.data.status == 0) {
              // app.wechat.setStorage('isauth', true);
              app.wechat.setStorage('token', d.data.token);
              app.wechat.setStorage('uid', d.data.uid);
              app.globalData.uid = d.data.uid;
              app.wechat.setStorage('userInfo', d.data.userInfo)
              if (d.data.isfirstlogin == 1) {
          
              }
              else {
              
              }
              that.onShow();
            }
            wx.hideLoading()
            this.setData({
              showModal: false
            })
          })
        } 
      }
    })
  },
  //true 弹出登录框
  my_login: function () {
    this.setData({
      showModal: true
    })
  },
  //关闭登录弹框
  go: function () {
    this.setData({
      showModal: false
    })
  }
})