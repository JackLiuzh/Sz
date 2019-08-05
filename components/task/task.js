// components/task/task.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     list : {
        type: Array,
        value:''
     },
     currenttime: {
        type: String,
        value: ''
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //根据任务不同跳转不同
    today_goto: function (e) {
      var user_task_id = e.currentTarget.dataset.user_task_id
      var type = e.currentTarget.dataset.type
      var currenttime = e.currentTarget.dataset.currrenttime
      var task_name = e.currentTarget.dataset.task_name
      var xitongtime = new Date()
      if(new Date(currenttime) < new Date(xitongtime)){
        console.log(e)
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
            wx.navigateTo({ url: '../material_qu/material_qu?user_task_id=' + user_task_id + '&time=' + currenttime + '&task_name=' + task_name })
            break;
        }
      }else {
          wx.showToast({ title: '时间未到，不能做题！',icon:'none',duration: 2000 })
      }

    },
  }
})
