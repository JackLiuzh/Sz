// pages/first_page/first_page.js 
const app = getApp()
const filter = require('../../utils/filter.js');
Page({
  data: {
    uid: 0,
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    calPanduan:[],
    courselive: [],   //专题测课程
    comDateTime: [],   //待直播日期判断
    showcal:[],
    showModal_zb: false,   //看直播判断蒙层
    showModal_pb: false,   //看回放判断蒙层
    // bpurl: '',     //课程视频链接
    project_id: '',
    kemu_id: '',
    video_id:'',
    lesson_id:'',
    finish: 0,     //是否做题
    // romand:0,
    iswxuser: false,   //是否szgk开头
    avatar: 'http://shangzheng.oss-cn-beijing.aliyuncs.com/img/member/Header-profile-photo.png',
    sys: '',      //推荐课信息
    isauth:false,    //是否微信用户
    system_id: 0,
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',

    dl_showModal: false,  //登录蒙层
    time: "获取验证码",
    currentTime: 61,

    date_now:'',
  },

  //未登录看回放登录
  my_login: function (e) {
    this.setData({
      dl_showModal: true  //登录蒙层显示
    })
    var id = e.currentTarget.dataset.hh;
    console.log(id);
    this.setData({
      prosum: this.data.courselive[id].prosum,
      finish: this.data.courselive[id].finish,
      project_id: this.data.courselive[id].project_id,
      kemu_id: this.data.courselive[id].kemu_id,
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
    console.log(this.data.finish);
    console.log(this.data.project_id);
    console.log(this.data.kemu_id);
  },


  //未登录买课登录
  my_login_mk: function (e) {
    this.setData({
      mkdl_showModal: true  //买课登录蒙层
    })
   
    var system_id = e.currentTarget.dataset.system_id
    console.log(system_id + 'cscscs')
    this.setData({
      system_id: system_id
    })
    console.log(this.data.system_id + 'this.cscscs')
  },

  go: function () {
    this.setData({
      dl_showModal: false    //关闭看回放登录蒙层，x图标
    })
  },

  go_mk: function () {
    this.setData({
      mkdl_showModal: false     //关闭买课登录蒙层，x图标
    })
  },

  //登录输入手机号
  inputphone: function (e) {
    this.setData({
      dphone: e.detail.value
    })
    console.log(this.data.dphone)
  },

  //登录输入验证码
  inputcode: function (e) {
    this.setData({
      code: e.detail.value
    })
    console.log(this.data.code)
  },

  //获取验证码
  getYzm: function (e) {
    var that = this
    var token = wx.getStorageSync('token');
    var phone = this.data.dphone;
    if (this.data.disabled || !phone) {
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

  //看回放输入验证码登录

  Sendyzm: function (e) {

    var that = this
    var phone = this.data.dphone;
    var params = {
      "phone": phone,
      "code": this.data.code,
    }
    if (!phone || !this.data.code) {
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
        app.globalData.uid = d.data.data.uid;
        wx.setStorageSync('userInfo', d.data.data)
        this.setData({
          // showModal_pb: true,
          dl_showModal: false
        })
        this.onLoad()
    
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

  //买课输入验证码登录
  Sendyzm_mk: function (e) {

    var that = this
    var phone = this.data.dphone;
    var params = {
      "phone": phone,
      "code": this.data.code,
    }
    if (!phone || !this.data.code) {
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
        console.log(this.data.system_id + 'cscscscs')
        wx.navigateTo({
          url: '/pages/course_xiang/course_xiang?system_id=' + this.data.system_id,
        })
        this.setData({
          // showModal_pb: false,
          mkdl_showModal: false
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
    // var token = wx.getStorageSync('token');
    // var uid = wx.getStorageSync('uid');
    var phone = this.data.dphone;
    var params = {
      // "uid": uid,
      // "token": token,
      "phone": phone,
      "code": this.data.code,
    }
    // console.log(params)

    
  },

  //下个月日历
  nextmonth(year, month) {
    const date = new Date();
    let i = 1
    let num = 0
    let days = [];
    let comDateTime = [];
    let cal_add_false = [];
    let dayNums = new Date(year, month, 0).getDate();
    let startWeek = new Date(Date.UTC(year, month - 1, 1)).getDay();
    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "token": token,
    }
    app.sz.xcxcourseLive(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ courselive: d.data.data, sys: d.data.sys })
        // console.log(dayNums + firstDayOfWeek)
        for (i; i <= dayNums + startWeek ; i++) {
          if (i > startWeek) {
        
            
            days.push(i - startWeek)
            
          } else {
            days.push('')
          }
        }
    
    this.setData({
      days
    })
       
    console.log(this.data.days)
      for (let j = 0; j < this.data.days.length; j++) {
        if (month < 10 && this.data.days[j] < 10) {
          comDateTime.push([year + '/' + '0' + month + '/' + '0' + this.data.days[j], this.data.days[j], false])
        } else if (month < 10 && this.data.days[j] >= 10) {
          comDateTime.push([year + '/' + '0' + month + '/' + this.data.days[j], this.data.days[j], false])
        } else if (month >= 10 && this.data.days[j] < 10) {
          comDateTime.push([year + '/' + month + '/' + '0' + this.data.days[j], this.data.days[j], false])
        } else if (month >= 10 && this.data.days[j] >= 10) {
          comDateTime.push([year + '/' + month + '/' + this.data.days[j], this.data.days[j], false])
        }
      }
    this.setData({
          comDateTime: comDateTime
        })
      
        console.log(this.data.comDateTime)

    for (let l = 0; l < this.data.courselive.length; l++) {
          // console.log(this.data.courselive[l].liveStatus)
          if (this.data.courselive[l].liveStatus == 1){
            // console.log('cs')
            for (let m = 0; m < this.data.comDateTime.length;m++){
              // console.log('cs')
              if (this.data.courselive[l].dateTime == this.data.comDateTime[m][0]){
                // console.log(m)
                this.data.comDateTime[m][2] = true
                console.log(this.data.comDateTime[m][2])
              }
            }
          }
          else {
            this.setData({ days: this.data.comDateTime })
            console.log(this.data.days)
          }
        }
      }
    })
  },

  //回到当月
  nowmonth(){
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
    })
    let xq = new Date().getDay();
    let day = date.getDate();
    let i = 0
    let num = 0
    let days = [];
    let comDateTime = [];
    let cal_add_false = [];
    let dayNums = new Date(cur_year, cur_month, 0).getDate();
    let startWeek = new Date(Date.UTC(cur_year, cur_month - 1, 1)).getDay();
    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "token": token,
    }
    app.sz.xcxcourseLive(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ courselive: d.data.data, sys: d.data.sys })

        console.log(xq)
        console.log(day)
        console.log(dayNums)
        let syday = dayNums - day + 1;
        for (i; i < syday + xq; i++) {
          if (i >= xq) {
            num = i - xq + day;
            days.push(num)
          } else {
            days.push('')
          }
        }
        this.setData({
          days
        })
        console.log(this.data.days)
        for (let j = 0; j < this.data.days.length; j++) {
          if (cur_month < 10 && this.data.days[j] < 10) {
            comDateTime.push([cur_year + '/' + '0' + cur_month + '/' + '0' + this.data.days[j], this.data.days[j], false])
          } else if (cur_month < 10 && this.data.days[j] >= 10) {
            comDateTime.push([cur_year + '/' + '0' + cur_month + '/' + this.data.days[j], this.data.days[j], false])
          } else if (cur_month >= 10 && this.data.days[j] < 10) {
            comDateTime.push([cur_year + '/' + cur_month + '/' + '0' + this.data.days[j], this.data.days[j], false])
          } else if (cur_month >= 10 && this.data.days[j] >= 10) {
            comDateTime.push([cur_year + '/' + cur_month + '/' + this.data.days[j], this.data.days[j], false])
          }
        }
        this.setData({
          comDateTime: comDateTime
        })
       
        console.log(this.data.comDateTime)
        // console.log(this.data.calPanduan)

        for (let l = 0; l < this.data.courselive.length; l++) {
          // console.log(this.data.courselive[l].liveStatus)
          if (this.data.courselive[l].liveStatus == 1) {
            // console.log('cs')
            for (let m = 0; m < this.data.comDateTime.length; m++) {
              // console.log('cs')
              if (this.data.courselive[l].dateTime == this.data.comDateTime[m][0]) {
                // console.log(m)
                this.data.comDateTime[m][2] = true
                console.log(this.data.comDateTime[m][2])
               
              }
            }
          }
          else {
            this.setData({ days: this.data.comDateTime })
            console.log(this.data.days)
          }
        }
      }
    })

  },

  //上下月跳转
  handleCalendar(e) {
    let that = this
    const handle = e.currentTarget.dataset.handle;
    const date = new Date();
    const nowyear = date.getFullYear();
    const nowmonth = date.getMonth() + 1;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {

      if (cur_month <= nowmonth && cur_year == nowyear) {
        // this.onLoad()
        that.setData({
          cur_year: nowyear,
          cur_month: nowmonth
        })
        // that.nowmonth()
    } else {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
        if (newMonth == nowmonth){
          that.nowmonth()
          that.setData({
            cur_year: nowyear,
            cur_month: nowmonth
          })
        }
        else{
          if (newMonth < 1) {
            newYear = cur_year - 1;
            newMonth = 12;
          }
          that.nextmonth(newYear, newMonth);
          this.setData({
            cur_year: newYear,
            cur_month: newMonth
          })
        }
      }
      
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.nextmonth(newYear, newMonth);
      // this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },

  onLoad: function () {
    // let islogin = wx.getStorageSync('isauth');
    // this.setData({ islogin: islogin})
    wx.setStorageSync('isauth', this.data.isauth)
    this.iswxuser();
    const date = new Date();

    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    var cscsm = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var cscsd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log(cscsm + "cscs")
    console.log(cscsd + "cscs")


    let date_now = cur_year + '/' + cscsm + '/' + cscsd
    console.log(date_now + "cscs")
    this.setData({
      date_now: date_now,
    })
    console.log(this.data.date_now)

    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
    })
    let xq = new Date().getDay();
    let day = date.getDate();
    let i = 0
    let num = 0
    let days = [];
    let comDateTime = [];
    let cal_add_false = [];
    let dayNums = new Date(cur_year, cur_month, 0).getDate();
    let startWeek = new Date(Date.UTC(cur_year, cur_month - 1, 1)).getDay();
    var uid = wx.getStorageSync('uid');
    this.setData({uid : uid})
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "token": token,
    }
    app.sz.xcxcourseLive(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ courselive: d.data.data, sys: d.data.sys })

        console.log(xq)
        console.log(day)
        console.log(dayNums)
        let syday = dayNums - day + 1 ;
        for (i; i < syday + xq; i++) {
          if (i >= xq) {
            num = i - xq + day ;
            days.push(num)
          } else {
            days.push('')
          }
        }
        this.setData({
          days
        })
        console.log(this.data.days)
        for (let j = 0; j < this.data.days.length; j++) {
          if (cur_month < 10 && this.data.days[j] < 10) {
            comDateTime.push([cur_year + '/' + '0' + cur_month + '/' + '0' + this.data.days[j], this.data.days[j], false])
          } else if (cur_month < 10 && this.data.days[j] >= 10) {
            comDateTime.push([cur_year + '/' + '0' + cur_month + '/' + this.data.days[j], this.data.days[j], false])
          } else if (cur_month >= 10 && this.data.days[j] < 10) {
            comDateTime.push([cur_year + '/' + cur_month + '/' + '0' + this.data.days[j], this.data.days[j], false])
          } else if (cur_month >= 10 && this.data.days[j] >= 10) {
            comDateTime.push([cur_year + '/' + cur_month + '/' + this.data.days[j], this.data.days[j], false])
          }
        }
        this.setData({
          comDateTime: comDateTime
        })
       
        console.log(this.data.comDateTime)
        // console.log(this.data.calPanduan)

        for (let l = 0; l < this.data.courselive.length; l++) {
          // console.log(this.data.courselive[l].liveStatus)
          if (this.data.courselive[l].liveStatus == 1) {
            // console.log('cs')
            for (let m = 0; m < this.data.comDateTime.length; m++) {
              // console.log('cs')
              if (this.data.courselive[l].dateTime == this.data.comDateTime[m][0]) {
                // console.log(m)
                this.data.comDateTime[m][2] = true
                console.log(this.data.comDateTime[m][2])
               
              }
            }
          }
          else {
            this.setData({ days: this.data.comDateTime })
            console.log(this.data.days)
          }
        }
      }
    })

  },

  //获取微信号看直播
  new_GetUserInfo(e) {
    var that = this
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']) {
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

  //昵称是否szgk开头用户
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
        if (this.data.prosum == 0){
          wx.navigateTo({
            url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
          });
        }
        else if (this.data.finish == 0) {
          this.setData({
            showModal_zb: true
          })
        } else {
          
          
          wx.navigateTo({
            url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
          });
        } 
      } else {
        console.log("保存失败")
      }
    })  
  },

  //看回放获取微信授权手机号登录
  getPhoneNumber: function (e) {
    var that = this

    wx.login({
      success: res => {
        // that.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
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
              that.setData({
                dl_showModal: false
              })
              that.onLoad()
              console.log(this.data.finish)
             

            } else {
              // app.wechat.setStorage('isauth', false);
            }
            wx.hideLoading()
          })
        } else {
          // that.setData({
          //   showModal: true
          // })
        }
      }
    })
  },

  //买课获取微信绑定手机号登录
  getPhoneNumber_mk: function (e) {
    var that = this

    wx.login({
      success: res => {
        // that.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
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
              // if (d.data.isfirstlogin == 1) {
                // wx.switchTab({ url: '../today_task/today_task' })
                // wx.switchTab({ url: '../first_page/first_page' })
                console.log(this.data.system_id + 'cscscscs')
                wx.navigateTo({
                  url: '/pages/course_xiang/course_xiang?system_id=' + this.data.system_id,
                })
                this.setData({
                  // showModal_pb: false,
                  mkdl_showModal: false
                })
              // }
              // else {

              // }
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
        }
      }
    })
  },

  //获取课程信息
  showModal: function (e) {
    var id = e.currentTarget.dataset.xb;
    console.log(id);
    this.setData({
      prosum: this.data.courselive[id].prosum,
      finish: this.data.courselive[id].finish,
      // bpurl: this.data.courselive[id].live_info.playbackUrl,
      project_id: this.data.courselive[id].project_id,
      kemu_id: this.data.courselive[id].kemu_id,
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
    console.log(this.data.finish);
    // console.log(this.data.bpurl);
    console.log(this.data.project_id);
    console.log(this.data.kemu_id);
    // this.setData({
    //   showModal_zb: true
    // })
  },

  //直播蒙层
  showModalZb: function (e) {
    var id = e.currentTarget.dataset.xb;
    console.log(id);
    this.setData({
      prosum: this.data.courselive[id].prosum,
      finish: this.data.courselive[id].finish,
      // bpurl: this.data.courselive[id].live_info.playbackUrl,
      project_id: this.data.courselive[id].project_id,
      kemu_id: this.data.courselive[id].kemu_id,
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
    if (this.data.prosum == 0) {
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + lesson_id,
      });
    }
    else if (this.data.finish == 0) {
    // if (this.data.finish == 0) {
      this.setData({
        showModal_zb: true
      })
    } else {
      // let url = encodeURIComponent(this.data.bpurl);
      // console.log(url);
      let lesson_id = this.data.courselive[id].lesson_id
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + lesson_id,
      });
      // this.setData({
      //   showModal_zb: false
      // })
    }
    console.log(this.data.finish);
    // console.log(this.data.bpurl);
    console.log(this.data.project_id);
    console.log(this.data.kemu_id);
    // this.setData({
    //   showModal_zb: true
    // })
  },
  onShow: function () {
    this.onLoad()
  },

  dateInit: function () {
  },

  

  

  
  

  

  //看回放蒙层
  showModalPb: function (e) {
    var id = e.currentTarget.dataset.xb;
    console.log(id);
    this.setData({
      prosum: this.data.courselive[id].prosum,
      finish: this.data.courselive[id].finish,
      // bpurl: this.data.courselive[id].live_info.playbackUrl,
      project_id: this.data.courselive[id].project_id,
      kemu_id: this.data.courselive[id].kemu_id,
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
    if (this.data.prosum == 0) {
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + lesson_id,
      });
    }
    else if (this.data.finish == 0) {
    // if(this.data.finish == 0){
      this.setData({
        showModal_pb: true
      })
    }else{
      // let url = encodeURIComponent(this.data.bpurl);
      // console.log(url);
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
      });
      this.setData({
        showModal_pb: false
      })
    }
    
  },
  close_zb: function () {
    this.setData({
      showModal_zb: false
    })
  },
  close_pb: function () {
    this.setData({
      showModal_pb: false
    })
  },

  //看回放视频跳转
  pblive: function (e) {
    var id = e.currentTarget.dataset.xb;
    console.log(id);
    this.setData({
      prosum: this.data.courselive[id].prosum,
    
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
      // let url = encodeURIComponent(this.data.bpurl);
      // console.log(url);
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
      });
      this.setData({
        showModal_pb: false
      })
   
  },
  mc_pblive: function (e) {
    
    wx.navigateTo({
      url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
    });
    this.setData({
      showModal_pb: false
    })
   
  },

  //看直播视频跳转
  zblive: function () {
    // let url = encodeURIComponent(this.data.bpurl);
    // console.log(url);
    wx.navigateTo({
      url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
    });
    this.setData({
      showModal_zb: false
    })
  },

  //看回放做题跳转
  pb_dati: function () {
    if (this.data.kemu_id == 7) {
      wx.navigateTo({
        url: '../dati_sl/dati_sl?id=' + this.data.project_id
      });
    }
    else {
      wx.navigateTo({
        url: '../test_dati/test_dati?id=' + this.data.project_id + '&kemu_id=' + this.data.kemu_id
      });
    }
    this.setData({
      showModal_pb: false
    })
  },

  //看直播做题跳转
  zb_dati: function () {
    let that = this
    if (that.data.kemu_id == 7){
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
    else{
      wx.navigateTo({
        url: '../test_dati/test_dati?id=' + that.data.project_id + '&kemu_id=' + that.data.kemu_id
      });
    }
    
    that.setData({
      showModal_zb: false
    })
  },

  //登录用户买课获取课程详情
  get_course_xiang: function (e) {
    var that = this
   
      wx.login({
        success: res => {
          // that.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
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
                  // wx.switchTab({ url: '../today_task/today_task' })
                  // wx.switchTab({ url: '../first_page/first_page' })
                  // that.xcxSubmitTask(d.data.uid)
                  that.gocourse_xiang(e)
                }
                else {
                  that.gocourse_xiang(e)
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
          }
        }
      })
    
  },

  //课程详情跳转 
  gocourse_xiang: function (e) {
    console.log(e.currentTarget.dataset.system_id)
    var system_id = e.currentTarget.dataset.system_id
    wx.navigateTo({
      url: '/pages/course_xiang/course_xiang?system_id=' + system_id,
    })
  },





 






  
})