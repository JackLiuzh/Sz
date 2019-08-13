const app = getApp()
const filter = require('../../utils/filter.js');
Page(filter.loginCheck({
  /**
   * 页面的初始数据
   */
  data: {
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
      "isover_project":1,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({title:'加载中'});
    var that = this
    app.globalData.uid = wx.getStorageSync('uid');
    let uid = app.globalData.uid; 
    if(uid){
       var params = {
         "uid":uid
       }
      app.sz.xcxTodayTask(params).then(d=>{
         if(d.data.status==0){
           wx.downloadFile({
             url: d.data.data.poster.img_url,
             success: function (r) {
               that.setData({ daka_bg: r.tempFilePath })
             }
           })
            that.setData({
              already_num:d.data.data.already_num,
              count: d.data.data.count,
              unnews: d.data.data.unnews,
              list : d.data.data.list,
              complete_list: d.data.data.complete_list,
              daka_days:d.data.data.daka_days,
              zongshu_total: d.data.data.zongshu_total,
              lookvideos: d.data.data.lookvideos,
              daka_bg: d.data.data.poster.img_url,
              daka_text: d.data.data.poster.title,
              zhibo_data: d.data.data.zhibo_data,
              project: d.data.data.project,
            })
            wx.hideLoading()
         }else{
           console.log("接口错误")
         }
      })
    }
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
              nickName:res.data.nickName
            })
            wx.downloadFile({
              url: res.data.avatarUrl,
              success: function(r) {
                 that.setData({touxiang: r.tempFilePath})
              }
            })
        }
      })
      that.onLoad()
  },

  //根据任务不同跳转不同
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
    //画背景文字
    var text = daka_text
    var chr = text.split("");
    var temp = "";
    var row = [];
    context.setFontSize(20 * rpx);
    context.setFillStyle("#fff");
    context.setTextAlign('center');
    for (var a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < 250) {
        temp += chr[a];
      } else {
        a--;
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);
    //如果数组长度大于2 则截取前两个
    if (row.length > 2) {
      var rowCut = row.slice(0, 2);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (context.measureText(test).width < 220) {
          test += rowPart[a];
        }
        else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..."//这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {
      context.fillText(row[b], 185 * rpx, (96 + b * 30) * rpx, 300 * rpx);
    }

    //画下半部的白底
    context.setFillStyle('white')
    context.fillRect(0, 223 * rpx, 432 * rpx, 450* rpx)

    //画头像
    context.save();
    context.beginPath();
    context.arc(180 * rpx, (222 * rpx), 40 * rpx, 0, 2 * Math.PI);
    context.setStrokeStyle('white')
    context.stroke()
    context.clip()
    context.drawImage(touxiang, 132 * rpx, 177 * rpx, 100 * rpx, 100 * rpx)

    //画昵称
    context.restore()
    context.beginPath()
    context.setFontSize(20 * rpx)
    context.setFillStyle('black')
    context.setTextAlign('center')
    context.fillText(nickName, 180 * rpx, 290 * rpx)
    context.stroke()

    //画今日任务
    context.beginPath()
    context.setFontSize(24 * rpx)
    context.setFillStyle('black')
    context.setTextAlign('center')
    context.setTextBaseline('bottom')
    context.fillText('今日任务', 186 * rpx, 335 * rpx)
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
        context.fillText(item.tname, i11, 369 * rpx)
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
        context.setFillStyle('black')
        context.fillText(item.tname, 183 * rpx, 369 * rpx)
        context.fillText('题', 204 * rpx, 415 * rpx)
        context.setFontSize(40 * rpx)
        context.setFillStyle('#E65557')
        context.fillText(item.already_total, 171 * rpx, 420 * rpx)
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
    context.fillRect(0, 450 * rpx, 432 * rpx, 100 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(daka_days, 56 * rpx, 500 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('天', 85 * rpx, 500 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('坚持打卡', 75 * rpx, 536 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(zongshu_total, 182 * rpx, 500 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('题', 218 * rpx, 500 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('累计做题', 194 * rpx, 536 * rpx)

    context.setFontSize(27 * rpx)
    context.setFillStyle('#303030')
    context.fillText(lookvideos, 298 * rpx, 500 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#666666')
    context.fillText('个', 327 * rpx, 500 * rpx)
    context.setTextBaseline('bottom')
    context.fillText('累计看视频', 320 * rpx, 536 * rpx)

    // 底部标语和二维码
    context.setFontSize(20 * rpx)
    context.setFillStyle('#333333')
    context.setTextBaseline('bottom')
    context.fillText('尚政公考', 74 * rpx, 600 * rpx)
    context.setFontSize(18 * rpx)
    context.setFillStyle('#999999')
    context.setTextBaseline('bottom')
    context.fillText('公务员考试提分利器', 114 * rpx, 630 * rpx)

    //底部扫码
    context.drawImage(erweima, 256 * rpx, 560 * rpx, 90 * rpx, 103 * rpx)


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
              resolve(res);
            }
          })
      })
      //2获取打卡背景
      let promise2 = new Promise(function(resolve, reject){
          wx.getImageInfo({
            src: that.data.daka_bg,
            success: function(res) {
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
    wx.navigateTo({
      url: '../test_dati/test_dati?id=' + id + '&kemu_id=' + kemu_id
    });
  }

}))