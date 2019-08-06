const URI = 'http://cs.szgk.cn/api.php'
// const URI = 'http://192.168.1.219/api.php'
//const URI = 'http://sz.com/api.php'
// const URI = 'https://www.szgk.cn/api.php'
const fetch = require('./fetch')
//微信登录
function loginregister(params) {
  return fetch.szfetch(URI,"xcxlogin",params)
} 

//根据uid判断用户是否是第一次登陆
function xcxfirstLogin(params) {
  return fetch.szfetch(URI,'xcxfirstLogin',params)
}

// 获得任务列表
function xcxindex(params) {
  return fetch.szfetch(URI, 'xcxindex', params)
}

//提交任务
function xcxSubmitTask(params) {
  return fetch.szfetch(URI,'xcxSubmitTask',params)
}

//今日任务页初始化接口
function xcxTodayTask(params) {
  return fetch.szfetchpost(URI,'xcxTodayTask', params)
}

//添加任务列表
function xcxUserTasklist(params) {
  return fetch.szfetch(URI,'xcxUserTasklist',params)
}

//添加单个任务
function xcxAddUserTask(params) {
  return fetch.szfetch(URI,'xcxAddUserTask',params)
}
//删除单个任务
function xcxDelUserTask(params) {
  return fetch.szfetch(URI,'xcxDelUserTask',params)
}

//任务设置
function xcxUpdateTaskSet(params) {
  return fetch.szfetch(URI,'xcxUpdateTaskSet',params)
}

//修改打卡推送数量
function xcxUpdatePushNum(params) {
  return fetch.szfetch(URI,'xcxUpdatePushNum',params)
}

//修改打卡周期
function xcxUpdateCycle(params) {
  return fetch.szfetch(URI,'xcxUpdateCycle',params)
}

//修改打卡频率
function xcxUpdatePinlv(params) {
  return fetch.szfetch(URI,'xcxUpdatePinlv',params)
}

//修改打卡范围
function xcxUpdateRange(params) {
  return fetch.szfetch(URI,'xcxUpdateRange', params)
}
//修改打卡范围
function xcxUpdateRangepost(params) {
  return fetch.szfetchpost(URI, 'xcxUpdateRange', params)
}

//获取消息列表
function xcxCommentThumbsList(params) {
  return fetch.szfetch(URI,'xcxCommentThumbsList',params)
}
//清除未读消息
function xcxEliminateCommentThumbs(params) {
  return fetch.szfetch(URI,'xcxEliminateCommentThumbs',params)
}

//打卡日历
function xcxDakaTask(params) {
  return fetch.szfetch(URI,'xcxDakaTask',params)
}

//切换日历中的任务
function xcxRiliInfo(params) {
  return fetch.szfetch(URI,'xcxRiliInfo',params)
}

//获取试题
function xcxgetTaskTi(params) {
  return fetch.szfetch(URI,'xcxgetTaskTi',params)
}

//获取视频详情
function xcxVideoDetail(params) {
  return fetch.szfetch(URI,'xcxVideoDetail',params)
}

//提交答案
function xcxAnswerInsert(params) {
  return fetch.szfetch(URI,'xcxAnswerInsert',params)
}
//评论和回复接口type区分
function xcxAddComment(params) {
  return fetch.szfetch(URI,'xcxAddComment',params)
}
//添加点赞和取消点赞
function xcxAddThum(params) {
  return fetch.szfetch(URI,'xcxAddThum',params)
}
//添加观看视频记录
function xcxAddVideoJilu(params) {
  return fetch.szfetch(URI, 'xcxAddVideoJilu', params)
}
//获取一条试题
function xcxgetTaskTiOne(params) {
  return fetch.szfetch(URI, 'xcxgetTaskTiOne', params)
}

// //获得打卡主题列表daka 页面
// function dakazhutilist(params) {
//   return fetch.szfetch(URI,"clockselect",params)
// }

// //打卡 - 打卡主题
// function dakazhuti(params) {
//   return fetch.szfetch(URI,"clockdetail",params)
// }

// //进入立即加入页面daka_detail
// function dakadetail(params) {
//   return fetch.szfetch(URI, "addclockdetail", params)
// }

// //加载更多打卡日记daka_detail页
// function dakadetailemore(params) {
//   return fetch.szfetch(URI, "clockcomment", params)
// }

// //daka_detail页面立即加入
// function dakadetailjiarubut(params) {
//   return fetch.szfetch(URI, "addclockuser", params)
// }

// //daka_jiaru页面初始化接口
// function dakajiaru(params) {
//   return fetch.szfetch(URI, "clockdetail", params)
// }

// //daka_zhuti 页面初始化列表
// function dakazhutizilist(params) {
//   return fetch.szfetch(URI, "clocklistselect", params)
// }

// //daka-zhuti-detail 页面初始化
// function dakazhutidetail (params) {
//   return fetch.szfetch(URI, "clocklistdetail", params)
// }

// //daka-zhuti-detail 发表打卡日记
// function dakazhutidetail_submit(params) {
//   return fetch.szfetch(URI, "clocklistsave", params)
// }

// //my-yijian 提交反馈信息
// function myfankui(params) {
//   return fetch.szfetch(URI, "addenroll", params)
// }

// //随机返回海报内容的接口
// function haibao() {
//   return fetch.szfetch(URI, "clockplacardfind")
// }

// //我打卡记录 my 
// function my(params) {
//   return fetch.szfetch(URI,"selectuserclockrecord",params)
// }

// // daka-zhuti-detail 获得海报信息
// function gethaibaoinfo() {
//   return fetch.szfetch(URI, "clockplacardfind")
// }

// // daka-setting 设置打卡提醒
// function dakasetting(params) {
//   return fetch.szfetch(URI, "clockset", params)
// }
// // 获取打卡设置参数
// function clocksetinfo(params) {
//   return fetch.szfetch(URI,"clocksetinfo", params)
// }

module.exports = { loginregister, xcxindex, xcxfirstLogin, xcxSubmitTask, xcxTodayTask, xcxUserTasklist, xcxAddUserTask, xcxDelUserTask, xcxUpdateTaskSet, xcxUpdateCycle, xcxUpdatePushNum, xcxUpdatePinlv, xcxCommentThumbsList, xcxEliminateCommentThumbs, xcxUpdateRange, xcxUpdateRangepost, xcxDakaTask, xcxRiliInfo, xcxgetTaskTi, xcxVideoDetail, xcxAnswerInsert, xcxAddComment, xcxAddThum, xcxAddVideoJilu, xcxgetTaskTiOne}