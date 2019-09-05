// pages/first_page/first_page.js 
const app = getApp()
const filter = require('../../utils/filter.js');
Page(filter.loginCheck({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    calPanduan:[],
    courselive: [],
    comDateTime: [],
    showcal:[],
    showModal_zb: false,
    showModal_pb: false,
    bpurl: '',
    project_id: '',
    kemu_id: '',
    video_id:'',
    lesson_id:'',
    finish: 0,
    romand:0,
    iswxuser: false,
    avatar: 'http://shangzheng.oss-cn-beijing.aliyuncs.com/img/member/Header-profile-photo.png',
    sys: '',
  },
  onLoad: function () {
    // let that = this;
    
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      // isToday: '' + year + month + day 
    })
    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "token": token,
    }

    app.sz.xcxcourseLive(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ courselive: d.data.data, sys: d.data.sys })
        var that = this;
        let dateArr = [];
        let comDateTime = [];
        let cal_add_false = [];
        let xq = new Date().getDay();      //获取日期所属星期
        //需要遍历的日历数组数据 
        let arrLen = 0;                            //dateArr的数组长度 
        let now = new Date();
        let year = now.getFullYear();
        let nextYear = 0;
        let month = now.getMonth();  //没有+1方便后面计算当月总天数 
        let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
        let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();         //目标月1号对应的星期 
        let dayNums = new Date(year, nextMonth, 0).getDate();
        //获取目标月有多少天 
        // console.log(new Date(setYear, setMonth))  
        let obj = {};
        let num = 0;
        let day = now.getDate();
        // let hoo = year + '-' + month + '-' +;
        // console.log() 

        if (month + 1 > 11) {
          nextYear = year + 1;
          dayNums = new Date(nextYear, nextMonth, 0).getDate();
        }
        let syday = dayNums - day + 1;
        // console.log(syday)
        for (let s = 0; s < syday + xq; s++) {
          if (s >= xq) {
            num = s - xq + day;
            for (let w = 0; w < syday; w++) {
              dateArr[s] = num
            }
          } else {
            dateArr[s] = '';
          }

          comDateTime.push([year + '-' + '0' + (month + 1) + '-' + '0' + num, num])
        }

        this.setData({
          dateArr: dateArr,
          comDateTime: comDateTime
        })
        for (let n = 0; n < this.data.dateArr.length; n++) {
          cal_add_false.push([this.data.dateArr[n], false])

          this.setData({
            calPanduan: cal_add_false,
          })
        }
        // this.showModalPb(e)
        for(let l=0;l<this.data.courselive.length;l++){
          // console.log(this.data.courselive[l].liveStatus)
          if (this.data.courselive[l].liveStatus == 1){
            for (let m = 0; m < this.data.comDateTime.length;m++){
              // console.log('cs')
              if (this.data.courselive[l].dateTime == this.data.comDateTime[m][0]){
                // console.log('cs')
                for (let n = 0; n < this.data.calPanduan.length;n++){
                  if (this.data.comDateTime[m][1] == this.data.calPanduan[n][0]){
                    this.data.calPanduan[n][1]=true
                    this.setData({ showcal: this.data.calPanduan })
                  }
                }
              }
            }
          }
          else {
            this.setData({ showcal: this.data.calPanduan })
            console.log(this.data.showcal)
          }
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
  saveuserinfo: function (e) {
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
        console.log("保存成功")
      } else {
        console.log("保存失败")
      }
    })
    if (this.data.finish == 0) {
      this.setData({
        showModal_zb: true
      })
    } else {
      let url = encodeURIComponent(this.data.bpurl);
      console.log(url);
      let lesson_id = this.data.courselive[id].lesson_id
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + lesson_id,
      });
      // this.setData({
      //   showModal_zb: false
      // })
    } 
  },
  showModal: function (e) {
    var id = e.currentTarget.dataset.xb;
    console.log(id);
    this.setData({
      finish: this.data.courselive[id].finish,
      bpurl: this.data.courselive[id].live_info.playbackUrl,
      project_id: this.data.courselive[id].project_id,
      kemu_id: this.data.courselive[id].kemu_id,
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
    console.log(this.data.finish);
    console.log(this.data.bpurl);
    console.log(this.data.project_id);
    console.log(this.data.kemu_id);
    // this.setData({
    //   showModal_zb: true
    // })
  },
  showModalZb: function (e) {
    var id = e.currentTarget.dataset.xb;
    console.log(id);
    this.setData({
      finish: this.data.courselive[id].finish,
      bpurl: this.data.courselive[id].live_info.playbackUrl,
      project_id: this.data.courselive[id].project_id,
      kemu_id: this.data.courselive[id].kemu_id,
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
    if (this.data.finish == 0) {
      this.setData({
        showModal_zb: true
      })
    } else {
      let url = encodeURIComponent(this.data.bpurl);
      console.log(url);
      let lesson_id = this.data.courselive[id].lesson_id
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + lesson_id,
      });
      // this.setData({
      //   showModal_zb: false
      // })
    }
    console.log(this.data.finish);
    console.log(this.data.bpurl);
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

  jumpmonth: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1 
    let dateArr = [];
    let cal_add_false = [];
    let xq = new Date().getDay();         //需要遍历的日历数组数据 
    let arrLen = 0;                            //dateArr的数组长度 
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();  //没有+1方便后面计算当月总天数 
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                            //目标月1号对应的星期 
    let dayNums = new Date(year, nextMonth, 0).getDate();
    //获取目标月有多少天 
    let obj = {};
    let num = 0;
    let day = now.getDate();

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    let i = 0
    for (i; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        dateArr[i] = num;
      } else {
        dateArr[i] = '';
      }
    }
    this.setData({
      dateArr: dateArr
    })
    for (let n = 0; n < this.data.dateArr.length; n++) {
      cal_add_false.push([this.data.dateArr[n], false])

      this.setData({
        calPanduan: cal_add_false,
      })           
      this.setData({
        showcal: this.data.calPanduan,
      })
    }
  }, 

  nowmonth: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      // isToday: '' + year + month + day 
    })
    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "token": token,
    }

    app.sz.xcxcourseLive(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ courselive: d.data.data, sys: d.data.sys })
        var that = this;
        let dateArr = [];
        let comDateTime = [];
        let cal_add_false = [];
        let xq = new Date().getDay();      //获取日期所属星期
        //需要遍历的日历数组数据 
        let arrLen = 0;                            //dateArr的数组长度 
        let now = new Date();
        let year = now.getFullYear();
        let nextYear = 0;
        let month = now.getMonth();  //没有+1方便后面计算当月总天数 
        let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
        let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();         //目标月1号对应的星期 
        let dayNums = new Date(year, nextMonth, 0).getDate();
        //获取目标月有多少天 
        // console.log(new Date(setYear, setMonth))  
        let obj = {};
        let num = 0;
        let day = now.getDate();
        // let hoo = year + '-' + month + '-' +;
        // console.log() 

        if (month + 1 > 11) {
          nextYear = year + 1;
          dayNums = new Date(nextYear, nextMonth, 0).getDate();
        }
        let syday = dayNums - day + 1;
        // console.log(syday)
        for (let s = 0; s < syday + xq; s++) {
          if (s >= xq) {
            num = s - xq + day;
            for (let w = 0; w < syday; w++) {
              dateArr[s] = num
            }
          } else {
            dateArr[s] = '';
          }

          comDateTime.push([year + '-' + '0' + (month + 1) + '-' + '0' + num, num])
        }

        this.setData({
          dateArr: dateArr,
          comDateTime: comDateTime
        })
        for (let n = 0; n < this.data.dateArr.length; n++) {
          cal_add_false.push([this.data.dateArr[n], false])

          this.setData({
            calPanduan: cal_add_false,
          })
        }
        // this.showModalPb(e)
        for (let l = 0; l < this.data.courselive.length; l++) {
          // console.log(this.data.courselive[l].liveStatus)
          if (this.data.courselive[l].liveStatus == 1) {
            for (let m = 0; m < this.data.comDateTime.length; m++) {
              // console.log('cs')
              if (this.data.courselive[l].dateTime == this.data.comDateTime[m][0]) {
                // console.log('cs')
                for (let n = 0; n < this.data.calPanduan.length; n++) {
                  if (this.data.comDateTime[m][1] == this.data.calPanduan[n][0]) {
                    this.data.calPanduan[n][1] = true
                    this.setData({ showcal: this.data.calPanduan })
                  }
                }
              }
            }
          }
          else {
            this.setData({ showcal: this.data.calPanduan })
            console.log(this.data.showcal)
          }
        }
      }
    })
  },

  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1 
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    let now = new Date();
    let nowmonth = now.getMonth();
    console.log(month)
    console.log(nowmonth)
    if (month == nowmonth) {
      // this.setData({
      //   year: year,
      //   month: (month + 1)
      // })
      this.nowmonth();
    } else {
      do {
        this.setData({
          year: year,
          month: (month + 1)
        })
        this.jumpmonth(year, month);
      } while (month == nowmonth) {
        this.nowmonth();
      } 
    }
  }, 
  // lastMonth: function () {
  //   //全部时间的月份都是按0~11基准，显示月份才+1 
  //   let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
  //   let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
  //   let now = new Date();
  //   let nowmonth = now.getMonth();
  //   let nowYear = now.getFullYear();
  //   console.log(month)
  //   console.log(nowmonth)
  //   if (month > nowmonth && year == nowYear) {
  //     this.setData({
  //       year: year,
  //       month: (month + 1)
  //     })
  //     this.jumpmonth(year, month);
  //     console.log(this.data.showcal)
  //   } else if (year == nowYear) {
  //     this.nowmonth()
  //     console.log(this.data.showcal)
  //   }else {
  //     this.setData({
  //       year: year,
  //       month: (month + 1)
  //     })
  //     this.jumpmonth(year, month);
  //     console.log(this.data.showcal)
  //   }
  // }, 
  

  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1 
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    let now = new Date();
    let nowmonth = now.getMonth();
    if (month == nowmonth) {
      // this.setData({
      //   year: year,
      //   month: (month + 1)
      // })
      this.nowmonth();
    } else {
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.jumpmonth(year, month);
    }
  },

  // nextMonth: function () {
  //   //全部时间的月份都是按0~11基准，显示月份才+1 
  //   let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
  //   let month = this.data.month > 11 ? 0 : this.data.month;
  //   let now = new Date();
  //   let nowmonth = now.getMonth();
  //   let nowYear = now.getFullYear();
  //   console.log(year)
  //   console.log(nowYear)
  //   console.log(month)
  //   console.log(nowmonth)
  //   if (month == nowmonth && year == nowYear) {
  //     this.nowmonth()
  //     console.log(this.data.showcal)
  //   } else {
  //     this.setData({
  //       year: year,
  //       month: (month + 1)
  //     })
  //     this.jumpmonth(year, month);
  //     console.log(this.data.showcal)
  //   }
  // },

  
  showModalPb: function (e) {
    var id = e.currentTarget.dataset.xb;
    console.log(id);
    this.setData({
      finish: this.data.courselive[id].finish,
      bpurl: this.data.courselive[id].live_info.playbackUrl,
      project_id: this.data.courselive[id].project_id,
      kemu_id: this.data.courselive[id].kemu_id,
      video_id: this.data.courselive[id].video_id,
      lesson_id: this.data.courselive[id].lesson_id,
    })
    if(this.data.finish == 0){
      this.setData({
        showModal_pb: true
      })
    }else{
      let url = encodeURIComponent(this.data.bpurl);
      console.log(url);
      wx.navigateTo({
        url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
      });
      this.setData({
        showModal_pb: false
      })
    }
    console.log(this.data.finish);
    console.log(this.data.bpurl);
    console.log(this.data.project_id);
    console.log(this.data.kemu_id);
    
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
  pblive: function () {
    let url = encodeURIComponent(this.data.bpurl);
    console.log(url);
    wx.navigateTo({
      url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
    });
    this.setData({
      showModal_pb: false
    })
  },
  zblive: function () {
    let url = encodeURIComponent(this.data.bpurl);
    console.log(url);
    wx.navigateTo({
      url: '../live/live?video_id=' + this.data.video_id + '&lesson_id=' + this.data.lesson_id,
    });
    this.setData({
      showModal_zb: false
    })
  },
  pb_dati: function () {
    wx.navigateTo({
      url: '../test_dati/test_dati?id=' + this.data.project_id + '&kemu_id=' + this.data.kemu_id
    });
    this.setData({
      showModal_pb: false
    })
  },
  zb_dati: function () {
    wx.navigateTo({
      url: '../test_dati/test_dati?id=' + this.data.project_id + '&kemu_id=' + this.data.kemu_id
    });
    this.setData({
      showModal_zb: false
    })
  },
  gocourse_xiang: function (e) {
    console.log(e.currentTarget.dataset.system_id)
    var system_id = e.currentTarget.dataset.system_id
    wx.navigateTo({
      url: '/pages/course_xiang/course_xiang?system_id=' + system_id,
    })
  },
}))