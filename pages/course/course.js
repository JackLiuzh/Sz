var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    main_id: '',
    user_task_id: 0,
    page:1,
    perpage:20,
    courselist:[],
    categorylist:[],
    livelist:[],
    curcourselist:[] //当前显示的list
  },
  //跳转first_page
  golive: function(e){
      var that = this
      var livestatus = e.currentTarget.dataset.livestatus
      var index = e.currentTarget.dataset.index
      if((livestatus == 3) || (livestatus ==1)){
         wx.navigateTo({
           url: '/pages/first_page/first_page',
         })
      }else{
          var playback = that.livelist[index].live_info.playback
          var url = ''
          if(playback == 1){
            url = that.livelist[index].live_info.playbackUrl
          }else if(playback == 0){
            url = that.livelist[index].live_info.liveUrl
          }
        wx.navigateTo({
          url: '/pages/live/live?url=' + url,
        })
      }
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
    var that = this
    var cur = e.target.dataset.current;
    var category_id = e.target.dataset.category_id
    if (that.data.currentTaB == cur) { return false; }
    else {
      that.setData({
        currentTab: cur
      })
    }
    var dd = []
    that.setData({ curcourselist:[] })
    that.data.courselist.forEach(function(item,index){
      if (item.category_id == category_id){
        dd.push(item)
      }
    })
    // console.log(dd)
    that.setData({ curcourselist:dd})
     
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
    
    this.initcategory()
    this.initcourselive()

    // Promise.all([d1,d2,d3]).then(function(result){
    //   console.log(result)
    // })
    var that = this;
    // this.setData({
    //   user_task_id: options.user_task_id,
    //   main_id: options.main_id
    // });
    
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 130;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap,

  //获取课程列表
  initcourslist: function(){
      var that = this
      var token = wx.getStorageSync('token')
      var params = {
          token: token,
          page: that.data.page,
          perpage: that.data.perpage
      }
      app.sz.courseList(params).then( d=>{
          if(d.data.status == 1){
              // console.log(d.data.data)
              // that.data.courselist = d.data.data
              that.setData({courselist:d.data.data})
              that.initcurcourselist()
          }else{
            console.log("获取课程列表错误")
          }
      })
  },
  //获取课程分类接口
  initcategory: function(){
    var that = this
    var token = wx.getStorageSync('token')
    var params = {
        token: token
    }
    app.sz.category(params).then(d=>{
        if(d.data.status == 1){
          // console.log(d.data)
          that.setData({ categorylist: d.data.data })
        }else {
          console.log("分类接口错误")
        }
    })
  },
  //获取直播接口
  initcourselive: function(){
    wx.showLoading({ title: '加载中' });
    var that = this
    var token = wx.getStorageSync('token')
    var params = {
      token: token
    }
    app.sz.courseLive(params).then(d=>{
        if(d.data.status == 1){
          that.setData({ livelist: d.data.data})
          that.initcourslist()

        }
        wx.hideLoading()
    })
  },
  //初始化curcourselist
  initcurcourselist:function(){
    var that = this
    var category_id = 1
    var d = []
    that.data.courselist.forEach(function(ite,ind){
      if (category_id == ite.category_id){
          d.push(ite)
      }
    })
    // console.log("zhe"+d)
    that.setData({curcourselist:d})
      
  },
  //跳转
  gocourse_xiang: function(e){
    var system_id = e.currentTarget.dataset.system_id
     wx.navigateTo({
       url: '/pages/course_xiang/course_xiang?system_id=' + system_id,
     })
  }


})