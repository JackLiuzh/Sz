/*
*api    根地址
*path   请求路径
*params 请求参数
*return 返回任务的Promise
*/

function szfetch (api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}?action=${path}&authhash=445454554`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}

function tikufetch (api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${path}?authhash=445454554`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}
function szfetchpost(api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}?action=${path}&authhash=445454554`,
      data: Object.assign({}, params),
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: resolve,
      fail: reject
    })
  })
}


module.exports = { tikufetch, szfetch, szfetchpost}