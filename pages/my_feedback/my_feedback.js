const app = getApp()
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    // showModal: false 
    showModal: false,
    contact: "请输入手机号",
    dphone: '',
    code: '',
    content: '',
    photo: ["../../images/tianjia@2x.png"],
    tempFilePaths: '',

  },


  // * 生命周期函数--监听页面加载
  // * / 
  onLoad: function (options) {
    // var uid = wx.getStorageSync('uid'); 
    // var token = wx.getStorageSync('token'); 
    // var params = { 
    //   "uid": uid, 
    //   "token": token, 
    // } 

    // console.log(params) 

    // app.sz.xcxMy(params).then(d => { 
    //   if (d.data.status == 1) { 
    //     this.setData({ user_area: d.data.data.user_area, isbuy: d.data.data.isbuy }) 
    //     if (d.data.data.phone != '') 
    //       this.setData({ userphone: d.data.data.phone }) 
    //     console.log(this.data.userphone) 
    //   } else { 
    //     console.log(d.data.msg) 
    //   } 
    // }) 

  },


  onShareAppMessage: function () {

  },
  submit: function () {
    this.setData({
      showModal: true
  // submit: function () { 
  //   this.setData({ 
  //     showModal: true 
    }) 
  }, 
 
  getphoto: function () {
        var tempFilePaths1;
        wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 

            // console.log(res.tempFilePaths) 
            // this.setData({ photo: res.tempFilePaths }) 

            tempFilePaths1 = res.tempFilePaths
            // this.data.photo.push(res.tempFilePaths) 
            console.log(tempFilePaths1)


          }
        })
        this.setData({ tempFilePaths: tempFilePaths1 })
        // this.setData({ photo: tempFilePaths }) 
        console.log(this.data.tempFilePaths)
      },
      fail: function (res) {
        console.log(res.errMsg)
      },

      preventTouchMove: function () {

      },

      go: function () {
        this.setData({
          showModal: false
        })
      },

  getPhoneNumber: function (e) {
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    wx.login({
      success: res => {
        this.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
        console.log(this.data.code, this.data.iv, this.data.encryptedData);
        if (e.detail.errMsg == "getPhoneNumber:ok") {

          var params = {
            "code": this.data.code,
            "iv": this.data.iv,
            "encryptedData": this.data.encryptedData,
            // "code": this.data.code,
          }
          console.log(params)
          app.sz.xcxphone(params).then(d => {
            if (d.data.status == 0) {
              console.log(d.data.msg)
            } else {
              console.log(d.data.msg)
            }
          })

          // wx.request({
          //   url: 'https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html',
          //   data: {
          //     'encryptedData': encodeURIComponent(e.detail.encryptedData),
          //     'iv': e.detail.iv,
          //     'code': res.code
          //   },
          //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          //   header: {
          //     'content-type': 'application/json'
          //   }, // 设置请求的 header
          //   success: function (res) {
          //     if (res.status == 1) {//我后台设置的返回值为1是正确
          //       //存入缓存即可
          //       wx.setStorageSync('phone', res.phone);
          //     }
          //   },
          //   fail: function (err) {
          //     console.log(err);
          //   }
          // })
        }
        else {
          this.setData({
            showModal: true
          })
        }
      }
    })
  },

      inputphone: function (e) {
        this.setData({
          dphone: e.detail.value
        })
        console.log(this.data.dphone)
      },

      // go: function () {
        inputcode: function (e) {
          this.setData({
            code: e.detail.value
          })
          console.log(this.data.code)
        },

        inputtextarea: function (e) {
          this.setData({
            content: e.detail.value
          })
          console.log(this.data.content)
        },

        getYzm: function (e) {
          // this.setData({ 
          //   dphone: e.detail.value 
          //  }) 
          // console.log(this.data.dphone) 

          var token = wx.getStorageSync('token');
          var phone = this.data.dphone;
          // console.log(phone) 
          var params = {
            "token": token,
            "phone": phone,
          }
          console.log(params)
          app.sz.xcxMyGetyzm(params).then(d => {
            if (d.data.status == 1) {
              console.log(console.log(d.data.msg))
            } else {
              console.log(console.log(d.data.msg))
            }
          })
        },

        feedbackYzm: function () {
          var phone = this.data.dphone;
          var params = {
            "phone": phone,
            "code": this.data.code,
          }
          console.log(params)
          app.sz.xcxfeedbackyzm(params).then(d => {
            if (d.data.status == 1) {
              this.setData({
                contact: phone
              })
              console.log(d.data.msg)
              console.log(this.data.contact)
            } else {
              console.log(d.data.msg)
            }
          })
          this.setData({
            showModal: false
          })
        },
     

      suggest: function (e) {
        var token = wx.getStorageSync('token');
        var uid = wx.getStorageSync('uid');
        var content = this.data.content;
        var photo = this.data.photo;
        var contact = this.data.contact;

        // console.log(phone) 
        var params = {
          "token": token,
          "uid": uid,
          "content": content,
          // "photo": photo, 
          "contact": contact,

        }
        console.log(params)
        app.sz.xcxsuggest(params).then(d => {
          if (d.data.status == 1) {
            console.log(console.log(d.data.msg))
            console.log(console.log("yes"))
          } else {
            console.log(console.log(d.data.msg))
            console.log(console.log("no"))
          }
        })
      },

    })