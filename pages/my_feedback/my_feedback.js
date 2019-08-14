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
    // photo: ["../../images/tianjia@2x.png"],
    // tempFilePaths: '',
    imgs: ["../../images/tupian@2x.png"],

  },


  // * 生命周期函数--监听页面加载
  // * / 
  onLoad: function (options) {

    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "token": token,
    }
    app.sz.xcxMy(params).then(d => {
      if (d.data.status == 1) {
        if (d.data.data.phone != '')
          this.setData({ contact: d.data.data.phone })
        console.log(this.data.contact)
      } else {
        // console.log(d.data.msg)
      }
    })
  },
  chooseImg() {
    let that = this;
    let len = this.data.imgs;
    if (len >= 9) {
      this.setData({
        lenMore: 1
      })
      return;
    }
    wx.chooseImage({
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        let imgs = that.data.imgs;
        for (let i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length < 10) {
            imgs.push(tempFilePaths[i])
          } else {
            that.setData({
              imgs
            })
            wx.showModal({
              title: '提示',
              content: '最多只能有九张图片'
            })
            return;
          }
        }
        that.setData({
          imgs
        })
      }
    })
  },
  // previewImg(e) {
  //   let index = e.currentTarget.dataset.index;
  //   let imgs = this.data.imgs;
  //   wx.previewImage({
  //     current: imgs[index],
  //     urls: imgs,
  //   })
  // },

  onShow: function () {
    // this.setData({ tempFilePaths: this.data.photo })
    
  },

  onShareAppMessage: function () {

  },
  submit: function () {
    this.setData({
      showModal: true
    }) 
  }, 
 
  // getphoto: function () {
  //   let that = this
  //       var tempFilePaths1;
  //       wx.chooseImage({
  //         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
  //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
  //         success: function (res) {
  //           // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 

  //           success: (res) => {
  //             let tempFilePaths = res.tempFilePaths;
  //             console.log(tempFilePaths)
  //             let imgs = that.data.imgs;
  //             for (let i = 0; i < tempFilePaths.length; i++) {
  //               if (imgs.length < 9) {
  //                 imgs.push(tempFilePaths[i])
  //               } else {
  //                 that.setData({
  //                   imgs
  //                 })
  //                 wx.showModal({
  //                   title: '提示',
  //                   content: '最多只能有九张图片'
  //                 })
  //                 return;
  //               }
  //             }
  //             that.setData({
  //               imgs
  //             })
  //           }


  //           // tempFilePaths1 = res.tempFilePaths
  //           // that.data.photo.push(tempFilePaths1)
  //           // console.log(this.data.photo)
  //           // console.log(tempFilePaths1)
  //           // this.setData({ tempFilePaths: tempFilePaths1 })
  //           // this.data.photo.push(tempFilePaths1)
  //           // console.log(this.data.photo)

  //         }
  //       })
  //       console.log(this.data.photo)
  //       // this.setData({ photo: tempFilePaths }) 
        
  //     },
      // fail: function (res) {
      //   console.log(res.errMsg)
      // },

      preventTouchMove: function () {

      },

      go: function () {
        this.setData({
          showModal: false
        })
      },

  // getPhoneNumber: function (e) {
  //   console.log(e.detail.iv);
  //   console.log(e.detail.encryptedData);
  //   wx.login({
  //     success: res => {
  //       this.setData({ code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData })
  //       console.log(this.data.code, this.data.iv, this.data.encryptedData);
  //       if (e.detail.errMsg == "getPhoneNumber:ok") {

  //         var params = {
  //           "code": this.data.code,
  //           "iv": this.data.iv,
  //           "encryptedData": this.data.encryptedData,
  //           // "code": this.data.code,
  //         }
  //         console.log(params)
  //         app.sz.xcxphone(params).then(d => {
  //           if (d.data.status == 0) {
  //             console.log(d.data.msg)
  //           } else {
  //             console.log(d.data.msg)
  //           }
  //         })
  //       }
  //       else {
  //         this.setData({
  //           showModal: true
  //         })
  //       }
  //     }
  //   })
  // },

  getphone: function () {
    this.setData({
            showModal: true
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
        var photo = this.data.imgs;
        var contact = this.data.contact;

        // console.log(phone) 
        var params = {
          "token": token,
          "uid": uid,
          "content": content,
          "photo": photo, 
          "contact": contact,

        }
        console.log(params)
        app.sz.xcxsuggest(params).then(d => {
          if (d.data.status == 1) {
            wx.showToast({
              title: d.data.msg,
              icon: 'none',
              duration: 2000
            })
            
            
          } else {
            wx.showToast({
              title: d.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
        wx.navigateBack({
          delta: 1
        })
        
      },

    })