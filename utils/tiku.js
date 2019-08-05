const URI = 'http://tiku.szgk.cn/index.php/szgk/index'
const fetch = require('./fetch')


function getexamper(type, params) {
     return fetch.tikufetch(URI, type, params)
}
// shuati 页面的初始化接口
function shuati(params) {
  return fetch.tikufetch(URI, "routineQuestionIndex", params)
}
// dati 页拉题接口
function getquestions(params) {
  return fetch.tikufetch(URI, "routineQuestionList", params)
}

// shuati页提交练习题答案
function tijiao(params) {
  return fetch.tikufetch(URI, "routineQuestiontijiao", params)
}

//dati页收藏和取消收藏接口
function shoucang(params) {
  return fetch.tikufetch(URI, "getcollectquestion", params)
}
//cuotiji 页错题分类列表
function cuotilist(params) {
  return fetch.tikufetch(URI, "gethierachywrong", params)
}
//commondati 错题题目
function cuotitimu(params) {
  return fetch.tikufetch(URI,"getwronglistquestions", params)
}
//shoucangjia页收藏分类
function shoucanglist(params) {
  return fetch.tikufetch(URI, "routineCollectList", params)
}
//commondati 页收藏题目
function shoucangti(params) {
  return fetch.tikufetch(URI, "routineCollectQuestion", params)
}

//删除错题集中的错题
function cuotidel(params) {
  return fetch.tikufetch(URI, "getwrongquestionsdel", params)
}

module.exports = { shuati, getquestions, tijiao, shoucang, cuotilist, shoucanglist, shoucangti, cuotitimu, cuotidel }