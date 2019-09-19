// pages/dati_sl/dati_sl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    isquestion: false, //材料/问题按钮判断
    clientHeight: 1000,
    ismany:false,  //多材料判断
    duocailiao:[],
    imgs:[],  //添加图片
    // null_jiaojuan:true,
    current_cailiao: 0, //多材料滚动条预设当前项的值
    // h_id:76,
    sl_list:[],
    total:0,
    
    // huadong: false,       //滑动查看下一题是否显示
  },

  //滑动查看下一题 是否显示
  huadongClick: function () {
    // let huadong = wx.getStorageSync('huadong')
    let huadong = this.data.huadong
    console.log(this.data.huadong)
    this.setData({ huadong: !huadong })
    wx.setStorageSync('huadong', this.data.huadong)
  },
//多材料滚动条
  switchTab: function (e) {
    this.setData({
      current_cailiao: e.detail.current
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
        current_cailiao: cur
      })
    }
      // that.setData({ curcourselist: that.data.sl_list.material[cur] })
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。 
  checkCor: function () {
    if (this.data.current_cailiao > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

//添加图片
  chooseImg() {
    let that = this;
    // let len = this.data.imgs;
    // if (len >= 9) {
    //   this.setData({
    //     lenMore: 1
    //   })
    //   return;
    // }
    wx.chooseImage({
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        let imgs = [];
        for (let i = 0; i < tempFilePaths.length; i++) {
          var token = wx.getStorageSync('token');       
          wx.uploadFile({
            url: 'http://cs.szgk.cn/api.php?',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'file': tempFilePaths[i],
              "token": token,
              "action": "uploads", //action=uploads&authhash=445454554
            },
            success(r) {
              let hhh = JSON.parse(r.data);
              if (hhh.status == 1) {
                imgs.unshift(hhh.data.src)
                // that.data.img = 
                that.setData({
                  img: imgs
                })
                console.log(that.data.img)
              } else {               
                console.log('失败')
                console.log(hhh.status)
              }            
            }
          })          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let huadong = wx.getStorageSync('huadong')
    this.setData({
      huadong: huadong,
    })
    console.log(this.data.huadong)
    var h_id = options.id
    console.log(h_id)
    let that = this
    that.setData({
      h_id: h_id,
    })
      var params = {
        "h_id": h_id,
      }
      console.log(params)
      app.sz.xcxShenlunList(params).then(d => {
        if (d.data.status == 0) {
          this.setData({ sl_list: d.data.data.shenlun_list, total: d.data.data.shenlun_list.length})
          console.log(this.data.sl_list)
        } else {
          console.log('接口错误')
          wx.hideLoading();
        }
      })
  },

//材料按钮
  cailiao: function() {
    let that = this
    that.setData({
      isquestion : false
    })
  },

//问题按钮
  wenti: function () {
    let that = this
    that.setData({
      isquestion: true
    })
  },

//蒙层取消按钮
quxiao: function(){
  this.setData({
    null_jiaojuan: false
  })
},

//灰色胶卷按钮
  submit: function () {
    this.setData({
      null_jiaojuan: true
    })
  },

//输入答案
  input_ans: function(e){
    this.setData({
      content: e.detail.value
    })
    console.log(this.data.content)
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

  },

  swiperchangefinish: function (e) {
    var that = this
    var current = Number(e.detail.current)  // 当前的
    var currentTab = Number(this.data.currentTab); //显示的做题序号
    var sl_list = this.data.sl_list;
    if (sl_list[current] == undefined) {
      that.setData({
        currentTab: currentTab
      })
    }
    console.log(current, "===============", currentTab);
    //最后一题滑动， 跳到评估页面
    if ((current) == (this.data.sl_list.length)) {
      // that.gopingguClick();
      console.log(this.data.sl_list.length + '试题结束')
    }

  },
  //手动滑页
  swiperchange: function (e) {
    var that = this
    var current = Number(e.detail.current)  // 当前的
    var currentTab = Number(this.data.currentTab); //上一个
    //获取试题
    var sl_list = this.data.sl_list;
    var length = sl_list.length;
    //获取几个试题
    let lang = 10;
    //增加的试题id
    var main_id = [];

    that.setData({
      currentTab: current
    })
    //右滑
    if (current > currentTab) {
      //下一个不存在 则
      if (sl_list[current + 1] == undefined) {
        for (let i = current; i < sl_list.length; i++) {
          if (i < current + lang) {
            main_id.push(sl_list[i].id);
          }
        }
      }
    }

    //左滑
    if (current < currentTab) {
      current = current - 1
      //上一个不存在
      if (current >= 0 && sl_list[current].isfull == 0) {
        for (let i = current; i >= 0; i--) {
          if (i > current - lang) {
            main_id.push(sl_list[i].id);
          }
        }
      }
    }

    //获取试题
    if (main_id.length > 0) {
      wx.showLoading({
        title: '加载中',
      })
      let that = this
      var params = {
        "h_id": that.data.h_id,
      }
      console.log(params)
      app.sz.xcxShenlunList(params).then(d => {
        if (d.data.status == 0) {
          this.setData({ sl_list: d.data.data.shenlun_list })
          console.log(this.data.sl_list)
          wx.hideLoading();
        } else {
          console.log(d.data.msg)
          wx.hideLoading();
        }
      })
    }
  },

})