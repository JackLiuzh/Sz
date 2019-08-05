var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }],
    video_url:'',
    list : '',
    main_id :'',
    user_task_id: 0
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //点击添加观看视频记录
  playvideo:function(e) {
    //console.log(e);
    let uid = wx.getStorageSync("uid");
    var that = this;
    var params = {
      "main_id": this.data.main_id,
      "user_task_id": this.data.user_task_id,
      "uid": uid
    }
    app.sz.xcxAddVideoJilu(params).then(d => {
      if (d.data.status == 0) {
        //返回id
        //如果任务完成 则 存缓存 任务天数
        if (d.data.accomplish == 1){
          wx.setStorageSync('accomplish_days', d.data.days);
        }
       
      } else {
        console.log("接口错误");
      }
    })
  },
  //点击标题弹出
  getlink:function (e){
    wx.showToast({
      title : "点击客服,获取完整课程链接",
      icon: "none",
      duration: 2000
    });
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      user_task_id: options.user_task_id,
      main_id: options.main_id
    });
    that.initdata(options.id)
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap,
  //初始化数据
  initdata: function(id) {
     var that = this
     var params = {
       "id":id
     }
    app.sz.xcxVideoDetail(params).then(d=>{
         if(d.data.status == 0){
            that.setData({list: d.data.data, video_url: d.data.video_url})
         }else {
            console.log("接口错误")
         }
    })
  }
})