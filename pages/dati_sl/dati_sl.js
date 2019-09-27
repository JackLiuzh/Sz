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
    // imgs:[],  //添加图片
    // null_jiaojuan:true,
    current_cailiao: 0, //多材料滚动条预设当前项的值
    // h_id:87,
    sl_list:[],
    total:0,
    ans: [],

    finish: false,
    cscs: [],
    hhh: 1,
    img:[],
    // answer_img: [{
    //   "question_id" : '',
    //   "img" : [],
    // }],

    
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

  chooseImg: function (e) {
    var that = this
    var xb = e.currentTarget.dataset.xb
    var id = e.currentTarget.dataset.id
    console.log(xb)
    console.log(id)
    var imgs = []
    var img2 = []
   
        if (imgs.length < 2) {  //如果图片数量小于3张，可以直接获取图片
          wx.chooseImage({
            count: 2,     //默认9
            sizeType: ['compressed'], //可以指定原图还是压缩图，默认二者都有
            sourceType: ['album'],//可以指定来源相册还是相机，默认二者都有
            success: function (res) {
              // var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
              // if (tempFilesSize <= 2000000) {   //图片小于或者等于2M时 可以执行获取图片
              var tempFilePaths = res.tempFilePaths; //获取图片
              console.log(tempFilePaths + '--------tempFilePaths')
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
                    console.log(hhh + '---------hhh')
                    if (hhh.status == 1) {
                      // imgs.push(hhh.data.src)
                    imgs.push(hhh.data.src)

                    // that.setData({
                    //   img : imgs
                    // })
                  
                      var ab = "sl_list[" + xb + "].question.img"//添加键值对
                      if (!that.data.sl_list[xb].question.img){
                        var cs = []
                        cs.push(imgs)
                        that.setData({
                          // [ab]: that.data.img
                          [ab]: cs
                          // [ab]: []
                        })

                      }
                      else{
                        var cs = that.data.sl_list[xb].question.img
                        cs.push(imgs)
                        that.setData({
                         
                          [ab]: cs
                         
                        })
                      }

            
                      var cs = "sl_list[" + xb + "].question.finish"//添加键值对
                      that.setData({
                        [cs]: true
                      })

                      console.log(that.data.sl_list[xb].question.img + '------question.img')
                      console.log(that.data.sl_list[xb].question.finish + '------question.finish')
                      
                      for (let i = 0; i < that.data.sl_list.length; i++) {
                        if (that.data.sl_list[i].question.finish) {
                          // if (i == that.data.currentTab){
                          that.setData({
                            hhh: that.data.hhh + 1
                          })
                          console.log(that.data.hhh + '=================input')
                        }
                        else {
                          that.setData({
                            hhh: 0
                          })
                          console.log(that.data.hhh + '=================input_else')
                        }
                      }
                
                      if (that.data.hhh) {
      that.setData({
        finish: true
      })
    }
    else {
      that.setData({
        finish: false
      })
    }
                    } else {
                      console.log('失败')
                      console.log(hhh.status)
                    }
                  }
                })
              }

              // } else {    //图片大于2M，弹出一个提示框
              //   wx.showToast({
              //     title: '上传图片不能大于2M!',  //标题
              //     icon: 'none'       //图标 none不使用图标，详情看官方文档
              //   })
              // }
            }
          })
        }
         else {  //大于三张时直接弹出一个提示框
          wx.showToast({
            title: '上传图片不能大于2张!',
            icon: 'none'
          })
        }
    
    


    // if (imgs.length < 2) {  //如果图片数量小于3张，可以直接获取图片
    //   wx.chooseImage({
    //     count: 1,     //默认9
    //     sizeType: ['compressed'], //可以指定原图还是压缩图，默认二者都有
    //     sourceType: ['album'],//可以指定来源相册还是相机，默认二者都有
    //     success: function (res) {
    //       // var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
    //       // if (tempFilesSize <= 2000000) {   //图片小于或者等于2M时 可以执行获取图片
    //       var tempFilePaths = res.tempFilePaths; //获取图片
    //       console.log(tempFilePaths +'--------tempFilePaths')
    //       for (let i = 0; i < tempFilePaths.length; i++) {
    //         var token = wx.getStorageSync('token');       
    //         wx.uploadFile({
    //           url: 'http://cs.szgk.cn/api.php?',
    //           filePath: tempFilePaths[i],
    //           name: 'file',
    //           formData: {
    //             'file': tempFilePaths[i],
    //             "token": token,
    //             "action": "uploads", //action=uploads&authhash=445454554
    //           },
    //           success(r) {
    //             let hhh = JSON.parse(r.data);
    //             console.log(hhh   +'---------hhh')
    //             if (hhh.status == 1) {
    //               imgs.unshift(hhh.data.src)
    //               that.setData({
    //                 img : imgs
    //               })
    //               // that.data.sl_list[xb].question.a = imgs
    //               // that.data.sl_list.unshift(imgs)
    //               // that.data.img = 
    //               var ab = "sl_list[" + xb + "].question.img"//添加键值对
    //               that.setData({
    //                 [ab]: that.data.img
    //               })
    //               // console.log(that.data.img)
    //               console.log(that.data.sl_list[xb].question.img +'------question.img')
    //               
                  
    //               // console.log(qu + '---------qu')
                  
    //             } else {               
    //               console.log('失败')
    //               console.log(hhh.status)
    //             }
                           
    //           }
    //         })
    //       }
          
    //       // } else {    //图片大于2M，弹出一个提示框
    //       //   wx.showToast({
    //       //     title: '上传图片不能大于2M!',  //标题
    //       //     icon: 'none'       //图标 none不使用图标，详情看官方文档
    //       //   })
    //       // }
    //     }
    //   })
    //   // that.data.answer_img.push([id, that.data.img])
    //   // console.log(that.data.answer_img + '---------ans') 
    // } else {  //大于三张时直接弹出一个提示框
    //   wx.showToast({
    //     title: '上传图片不能大于2张!',
    //     icon: 'none'
    //   })
    // }
  


  },
//删除插入图片
  deleteImg: function(e) {
    let that = this
    var tpxb = e.currentTarget.dataset.tpxb
    var xb = e.currentTarget.dataset.xb
    console.log(tpxb)
    console.log(xb)
    let del_img = that.data.sl_list[xb].question.img
    console.log(del_img + '========del_img')
    del_img.splice(tpxb, 1)
    // console.log(this.data.img)
    var ab = "sl_list[" + xb + "].question.img"//添加键值对
    that.setData({
      [ab]: del_img
    })
    // console.log(that.data.img)
    console.log(that.data.sl_list[xb].question.img + '======that.data.sl_list[xb].question.img')

    if (del_img == ''){
      if (!that.data.sl_list[xb].question.ans_input){
        var cs = "sl_list[" + xb + "].question.finish"//添加键值对
        that.setData({
          [cs]: false
        })
      }
      else {
        var cs = "sl_list[" + xb + "].question.finish"//添加键值对
        that.setData({
          [cs]: true
        })
      }
      
    }
    
    console.log(that.data.sl_list[xb].question.finish + '------question.finish')

    for (let i = 0; i < that.data.sl_list.length; i++) {
      if (that.data.sl_list[i].question.finish) {
        // if (i == that.data.currentTab){
        that.setData({
          hhh: that.data.hhh
        })
        console.log(that.data.hhh + '=================input')
      }
      else {
        that.setData({
          hhh: 0
        })
        console.log(that.data.hhh + '=================input_else')
      }
    }

    if (that.data.hhh) {
      that.setData({
        finish: true
      })
    }
    else {
      that.setData({
        finish: false
      })
    }
  },

  submit_ans: function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let huadong = wx.getStorageSync('huadong')
    that.setData({
      huadong: huadong,
    })
    console.log(that.data.huadong)
    var h_id = options.id
    console.log(h_id + '==========dati_sl')
    
    that.setData({
      h_id: h_id,
    })
    
    var params = {
      "h_id": that.data.h_id,
    }
      console.log(params)
      app.sz.xcxShenlunList(params).then(d => {
        if (d.data.status == 0) {
          that.setData({ sl_list: d.data.data.shenlun_list, total: d.data.data.shenlun_list.length})
          console.log(that.data.sl_list)
        } else {
          console.log('接口错误')
          // wx.hideLoading();
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
//蒙层确定按钮
queding: function () {
  let that = this
  let ans = []
  for(let i = 0;i<that.data.sl_list.length;i++){
    ans.push([that.data.sl_list[i].question.id, that.data.sl_list[i].question.ans_input, that.data.sl_list[i].question.img])
  }
  that.setData({
    ans : ans
  })
  console.log(that.data.ans +'==========ans')
  var uid = wx.getStorageSync('uid');
  var params = {
    "h_id": that.data.h_id,
    "uid": uid,
    "data": that.data.ans,

  }
  console.log(params + '===========submit')
  app.sz.xcxShenlunTijiao(params).then(d => {
    if (d.data.status == 0) {
      wx.navigateTo({
        url: '../shuati_sl_jump/shuati_sl_jump?h_id=' + that.data.h_id
      });
      console.log('提交成功')
    } else {
      console.log('接口错误')
     
    }
  })

  that.setData({
    null_jiaojuan: false
  })
  console.log(that.data.h_id)
},

//交卷按钮
  submit: function () {
    let that = this

    if(that.data.finish){
      let ans = []
      for (let k = 0; k < that.data.sl_list.length; k++) {
        ans.push([that.data.sl_list[k].question.id, that.data.sl_list[k].question.ans_input, that.data.sl_list[k].question.img])
      }
      that.setData({
        ans: ans
      })
      console.log(that.data.ans + '==========ans')
      var uid = wx.getStorageSync('uid');
      var params = {
        "h_id": that.data.h_id,
        "uid": uid,
        "data": that.data.ans,

      }
      console.log(params + '===========submit')
      app.sz.xcxShenlunTijiao(params).then(d => {
        if (d.data.status == 0) {
          wx.navigateTo({
            url: '../shuati_sl_jump/shuati_sl_jump?h_id=' + that.data.h_id
          });
          console.log('提交成功')
        } else {
          console.log('接口错误')
          // wx.hideLoading();
        }
      })
    
    }else{
      this.setData({
        null_jiaojuan: true,
        hhh: 0
      })
    }
    // let num = 0
    // for(let i=0;i<that.data.sl_list.length;i++){
    //   if (that.data.sl_list[i].question.finish){
    //     // if (i == that.data.currentTab){
    //       that.setData({
    //         hhh: that.data.hhh + i
    //       })
    //       console.log(that.data.hhh)
    //     }
    // }
    // for (let j = 0; j < that.data.sl_list.length; j++) {
    //   num = num + j
    // }
    // console.log(num)
    // if (that.data.hhh == num){
    //   console.log('已完成')
    //   // that.setData({
    //   //   isfinish : true
    //   // })
    //   let ans = []
    //   for (let k = 0; k < that.data.sl_list.length; k++) {
    //     ans.push([that.data.sl_list[k].question.id, that.data.sl_list[k].question.ans_input, that.data.sl_list[k].question.img])
    //   }
    //   that.setData({
    //     ans: ans
    //   })
    //   console.log(that.data.ans + '==========ans')
    //   var uid = wx.getStorageSync('uid');
    //   var params = {
    //     "h_id": that.data.h_id,
    //     "uid": uid,
    //     "data": that.data.ans,

    //   }
    //   console.log(params + '===========submit')
    //   app.sz.xcxShenlunTijiao(params).then(d => {
    //     if (d.data.status == 0) {
    //       wx.navigateTo({
    //         url: '../shuati_sl_jump/shuati_sl_jump?h_id=' + that.data.h_id
    //       });
    //       console.log('提交成功')
    //     } else {
    //       console.log('接口错误')
    //       // wx.hideLoading();
    //     }
    //   })

    //   // wx.navigateTo({
    //   //   url: '../shuati_sl_jump/shuati_sl_jump?h_id=' + that.data.h_id
    //   // });
    // }else{
    //   this.setData({
    //     null_jiaojuan: true,
    //     hhh: 0
    //   })
    // }
  },

//输入答案
  input_ans: function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    that.setData({
      content: e.detail.value
    })
    console.log(that.data.content)
    var ab = "sl_list[" + xb + "].question.ans_input"//添加键值对
    that.setData({
      [ab]: that.data.content
    })
    if (that.data.sl_list[xb].question.ans_input) {
      if (that.data.sl_list[xb].question.img) {
        var cs = "sl_list[" + xb + "].question.finish"//添加键值对
        that.setData({
          [cs]: true
        })
      }
      else {
        var cs = "sl_list[" + xb + "].question.finish"//添加键值对
        that.setData({
          [cs]: true
        })
      }
    }
    else{
      if (that.data.sl_list[xb].question.img) {
        var cs = "sl_list[" + xb + "].question.finish"//添加键值对
        that.setData({
          [cs]: true
        })
      }
      else{
        var cs = "sl_list[" + xb + "].question.finish"//添加键值对
        that.setData({
          [cs]: false
        })
      }
       
      
      
    }
    console.log(that.data.sl_list[xb].question.finish + '------question.finish')
    console.log(that.data.sl_list[xb].question.ans_input + '------question.ans_input')
    
    for (let i = 0; i < that.data.sl_list.length; i++) {
      if (that.data.sl_list[i].question.finish) {
        // if (i == that.data.currentTab){
        that.setData({
          hhh: that.data.hhh + 1
        })
        console.log(that.data.hhh + '=================input')
      }
      else {
        that.setData({
          hhh: 0
        })
        console.log(that.data.hhh + '=================input_else')
      }
    }
    
    if(that.data.hhh){
      that.setData({
        finish : true
      })
    }
    else{
      that.setData({
        finish: false
      })
    }
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
    // console.log(this.data.sl_list.length)
    //最后一题滑动， 跳到评估页面
    if ((current + 1) == (this.data.sl_list.length)) {
      
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
    // let lang = 10;
    // //增加的试题id
    // var main_id = [];

    that.setData({
      currentTab: current
    })
    // if()
    //右滑
    // if (current > currentTab) {
    //   //下一个不存在 则
    //   if (sl_list[current + 1] == undefined) {
    //     for (let i = current; i < sl_list.length; i++) {
    //       if (i < current + lang) {
    //         main_id.push(sl_list[i].id);
    //       }
    //     }
    //   }
    // }

    //左滑
    if (current < currentTab) {
      current = current - 1
      //上一个不存在
      // if (current >= 0 && sl_list[current].isfull == 0) {
      //   for (let i = current; i >= 0; i--) {
      //     if (i > current - lang) {
      //       main_id.push(sl_list[i].id);
      //     }
      //   }
      // }
    }

    //获取试题
    // if (main_id.length > 0) {
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   let that = this
    //   var params = {
    //     "h_id": that.data.h_id,
    //   }
    //   console.log(params)
    //   app.sz.xcxShenlunList(params).then(d => {
    //     if (d.data.status == 0) {
    //       this.setData({ sl_list: d.data.data.shenlun_list })
    //       console.log(this.data.sl_list)
    //       wx.hideLoading();
    //     } else {
    //       console.log(d.data.msg)
    //       wx.hideLoading();
    //     }
    //   })
    // }
  },

})