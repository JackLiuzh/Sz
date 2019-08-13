// pages/first_page/first_page.js 
const app = getApp()
Page({
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

    var token = wx.getStorageSync('token');
    var params = {
      // "uid": uid,
      "token": token,
    }

    app.sz.courseLive(params).then(d => {
      if (d.data.status == 1) {
        this.setData({ courselive: d.data.data })
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
          comDateTime.push([year + '-' + '0' + (month + 1) + '-' + num, num])
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
        for(let l=0;l<this.data.courselive.length;l++){
          if (this.data.courselive[l].liveStatus == 1){
            for (let m = 0; m < this.data.comDateTime.length;m++){
              if (this.data.courselive[l].dateTime == this.data.comDateTime[m][0]){
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

  onShow: function () {
   
  },

  dateInit: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1 
  },
  nextmonth: function (setYear, setMonth) {
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
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1 
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.nextmonth(year, month);
  },
  showModalZb: function () {
    this.setData({
      showModal_zb: true
    })
  },
  showModalPb: function () {
    this.setData({
      showModal_pb: true
    })
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
})