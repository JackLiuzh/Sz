Page({
  data: {
    cruDataList: [],
    cruPDataList: [],
    weeklist: ['日', '一', '二', '三', '四', '五', '六'],//星期
    itemIndex: 10, //
  },


  onLoad: function (options) {
    var that = this;
    var cur_year = new Date().getFullYear();
    var cur_month = new Date().getMonth();
    that.setData({
       cur_year,
       cur_month
    })
    that.calendar(cur_year, cur_month);
   
  },


  calendar: function(year, month) {
      let fullDay = parseInt(new Date(year, month + 1, 0 ).getDate());
      console.log("这是当月总天数"+fullDay);

      let startWeek = parseInt(new Date(year, month,1).getDay());
      console.log("这是当月第一天是周几"+startWeek);

      let lastMonthDay = parseInt(new Date(year,month, 0).getDate());
      console.log("上个月的天数"+ lastMonthDay);

      let totalDay = (fullDay + startWeek) % 7 == 0 ? (fullDay + startWeek) : fullDay +startWeek + (7- (fullDay + startWeek) % 7);
      console.log("元素总个数"+ totalDay);


      let newYearList = [], newMonthList = [], curYear = new Date().getFullYear();
      for (var i= curYear - 10; i< curYear + 10; i++) {
          newYearList.push(i);
      }

      for (var i = 1; i <= 12; i++) {
        newMonthList.push(i);
      }

      let lastMonthDaysList =[], currentMonthDaysList = [], nextMonthDaysList = [];

      for (let i= 0; i < totalDay; i++) {
        //当月第一天不是周日的情况下，前面有几个格式是上月的，就渲染上月的天数
        if(i < startWeek) {
           lastMonthDaysList.push(lastMonthDay - startWeek + 1 + i);
        } else if(i < (startWeek + fullDay)) {
          //当月天数
          currentMonthDaysList.push(i + 1 - startWeek);
        } else {
          //当月最后一天不是周六的时候,剩下的各自就渲染下月的天数
           nextMonthDaysList.push((i + 1 - (startWeek + fullDay)));
        }
        
      }

      this.setData({
        monthList:newMonthList,
        yearList: newYearList,
        lastMonthDaysList,
        currentMonthDaysList,
        nextMonthDaysList
      });

      var tmonth = month + 1;
      this.setData({
          dataTime: year + "-" + tmonth + "-01"
      });
      
  },

  handleMonth: function(e) {
     const handle = e.currentTarget.dataset.handle;
     console.log(handle);
     const cur_year = this.data.cur_year;
     const cur_month = this.data.cur_month;
     const index = this.data.itemIndex;
     if(handle === 'prev') {
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        let idx = index;
        if(newMonth < 0) {
          newYear = cur_year - 1;
          idx = index - 1;
          newMonth = 11;
        }

        this.calendar(newYear, newMonth);
        this.setData({
          cur_year: newYear,
          cur_month: newMonth,
          itemIndex: idx
        });
     }else {
       let newMonth = cur_month +1;
       let newYear = cur_year;
       let idx = index;
       if(newMonth > 11) {
         newYear = cur_year + 1;
         idx = index + 1;
         newMonth = 0;
       }

       this.calendar(newYear,newMonth);
       this.setData({
         cur_year: newYear,
         cur_month: newMonth,
         itemIndex: idx
       })
     }
  }
})