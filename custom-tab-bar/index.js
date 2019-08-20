Component({
  data: {
    selected: 1,
    color: "#7A7E83",
    avatar:'http://shangzheng.oss-cn-beijing.aliyuncs.com/img/member/Header-profile-photo.png',
    iswxuser:true,
    wxname:'',
    wxava:'',
    selectedColor: "#3cc51f",
    list: [
      {
        text: "刷题",
        pagePath: "/pages/today_task/today_task",
        iconPath: "/images/tiku_normal@2x.png",
        selectedIconPath: "/images/tiku_active@2x.png"
      },
      {
        text: "课程",
        pagePath: "/pages/course_new/course_new",
        iconPath: "/images/kecheng@2x.png",
        selectedIconPath: "/images/kecheng_active@2x.png"
      },
      {
        text: "我的",
        pagePath: "/pages/my/my",
        iconPath: "/images/wode_normal@2x.png",
        selectedIconPath: "/images/wode_active@2x.png"
      }
    
    ]
  },
  lifetimes:{
    attached: function () {
      // 在组件实例进入页面节点树时执行
      var that = this
      var bendiuserinfo = wx.getStorageSync("userInfo")
      var bendiava = bendiuserinfo.avatar
      if (bendiava == that.data.avatar) {
        that.setData({ iswxuser: false })
      } else {
        that.setData({ iswxuser: true })
      }
    },
  },
  attached() {
  },
  methods: {
    bindGetUserInfo:function(e){
      var that = this
      console.log(e)
      wx.getSetting({
         success: res => {
           if (res.authSetting['scope.userInfo']) {
               console.log(e.detail.userInfo.nickName)
               that.setData({wxname: e.detail.userInfo.nickName,wxava:e.detail.userInfo.avatarUrl})
               var bendiuserinfo = wx.getStorageSync("userInfo")
               bendiuserinfo.name = e.detail.userInfo.nickName
               bendiuserinfo.avatar = e.detail.userInfo.avatarUrl
               wx.setStorageSync('userInfo', bendiuserinfo)
           }else{
              console.log("用户拒绝授权")
           }
         }
      })
    },
    switchTab(e) {
      var that = this
      console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      if(data.index == 2){
           
           console.log("点击了我的")
      }
      that.setData({
        selected: data.index
      })
    },
    //保存信息

  }
})