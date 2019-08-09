// pages/first_page/first_page.js 
const app = getApp()
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    showModal_zb: false,
    showModal_pb: false,
  },
  onLoad: function () {
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
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1 
    let dateArr = [];
    // let dateArr2 = [];    
    // let dateArr3 = [];   
    let xq = new Date().getDay();
    console.log(xq)              //需要遍历的日历数组数据 
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
    // arrLen = startWeek + dayNums; 
    // let i = 0 
    // for (i; i < arrLen; i++) { 
    //   if (i >= startWeek) { 
    //     num = i - startWeek + 1; 
    //     dateArr[i] = num; 
    //   } else { 
    //     dateArr[i] = ''; 
    //   } 
    //   // console.log(day) 
    //   // if (day == dateArr[i]) { 
    //   //   for (let j = 0;j < arrLen-i+1;j++) { 
    //   //     let hh = i+j; 
    //   //     dataArr2[j] = dateArr[hh] 
    //   //   }   
    //   // } 
    // } 
    // console.log(day) 
    // let q,j ; 
    // // let nnn = day 
    // for (q = 0; q < arrLen;q++ ){ 
    //   if (day == dateArr[q]) { 
    //     // console.log("day") 
    //     for (j = 0; j < arrLen - q; j++) { 
    //     let hh = q+j; 
    //     // console.log(hh) 
    //       dateArr2[j] = dateArr[hh]    
    //     }   
    //   } 
    // } 
    // console.log(j) 
    let syday = dayNums - day + 1;
    console.log(syday)
    for (let s = 0; s < syday + xq; s++) {
      if (s >= xq) {
        num = s - xq + day;
        for (let w = 0; w < syday; w++) {
          dateArr[s] = num
        }
        // dateArr3[s] = dateArr2[w]; 
      } else {
        dateArr[s] = '';
      }
    }
    // console.log(dateArr) 
    this.setData({
      dateArr: dateArr
    })


    //   let nowDate = new Date(); 
    //   let nowYear = nowDate.getFullYear(); 
    //   let nowMonth = nowDate.getMonth() + 1; 
    //   let nowWeek = nowDate.getDay(); 
    //   let getYear = setYear || nowYear; 
    //   let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth; 

    //   if (nowYear == getYear && nowMonth == getMonth) { 
    //     this.setData({ 
    //       isTodayWeek: true, 
    //       todayIndex: nowWeek 
    //     }) 
    //   } else { 
    //     this.setData({ 
    //       isTodayWeek: false, 
    //       todayIndex: -1 
    //     }) 
    //   } 
  },
  datene: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1 
    let dateArr = [];

    let dateArr2 = [];
    // let dateArr3 = [];   
    let xq = new Date().getDay();
    console.log(xq)              //需要遍历的日历数组数据 
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
    // console.log(day) 
    // let q,j ; 
    // // let nnn = day 
    // for (q = 0; q < arrLen;q++ ){ 
    //   if (day == dateArr[q]) { 
    //     // console.log("day") 
    //     for (j = 0; j < arrLen - q; j++) { 
    //     let hh = q+j; 
    //     // console.log(hh) 
    //       dateArr2[j] = dateArr[hh]    
    //     }   
    //   } 
    // } 
    // console.log(j) 
    // let syday = dayNums - day + 1; 
    // console.log(syday) 
    // for (let s = 0; s < syday + xq; s++) { 
    //   if (s >= xq) { 
    //     num = s - xq + day; 
    //     for (let w = 0; w < syday; w++) { 
    //       dateArr2[s] = num 
    //     } 
    //     // dateArr3[s] = dateArr2[w]; 
    //   } else { 
    //     dateArr2[s] = ''; 
    //   } 
    // } 
    // console.log(dateArr) 
    this.setData({
      dateArr: dateArr
    })


    //   let nowDate = new Date(); 
    //   let nowYear = nowDate.getFullYear(); 
    //   let nowMonth = nowDate.getMonth() + 1; 
    //   let nowWeek = nowDate.getDay(); 
    //   let getYear = setYear || nowYear; 
    //   let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth; 

    //   if (nowYear == getYear && nowMonth == getMonth) { 
    //     this.setData({ 
    //       isTodayWeek: true, 
    //       todayIndex: nowWeek 
    //     }) 
    //   } else { 
    //     this.setData({ 
    //       isTodayWeek: false, 
    //       todayIndex: -1 
    //     }) 
    //   } 
  },

  // lastMonth: function () { 
  //   //全部时间的月份都是按0~11基准，显示月份才+1 
  //   let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year; 
  //   let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2; 
  //   this.setData({ 
  //     year: year, 
  //     month: (month + 1) 
  //   }) 
  //   this.dateInit(year, month); 
  // }, 
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1 
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.datene(year, month);
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