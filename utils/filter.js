// utils/filter.js
const app = getApp();

function loginCheck(pageObj) {
  if (pageObj.onLoad) {
    let _onLoad = pageObj.onLoad;
    // 使用onLoad的话需要传递options
    pageObj.onLoad = function (options) {
      if (wx.getStorageSync('isauth')) {
        //var uid = wx.getStorageSync('uid');
        let uid = wx.getStorageSync('uid');
        // if(uid){
          var params = { 
             "uid": uid
          }
          app.sz.xcxfirstLogin(params).then(d=>{
             //console.log(d);
             if(d.data.status==0){
                if(d.data.isfirstlogin==0){
                   wx.redirectTo({
                     url: '../first_comming/first_comming',
                   })
                }else {
                      let currentInstance = getPageInstance();
                     _onLoad.call(currentInstance, options);
                  
                }
             }
             
          })
      } else {
        //跳转到登录页
        wx.redirectTo({
          url: "../tologin/tologin"
        });
      }
    }
  }
  return pageObj;
}

// 获取当前页面    
function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.loginCheck = loginCheck;
