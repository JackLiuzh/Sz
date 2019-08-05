
//格式化时间

function formatDate (source, format) {
  const o = {
    'M+': source.getMonth() + 1, // 月份
    'd+': source.getDate(), // 日
    'H+': source.getHours(), // 小时
    'm+': source.getMinutes(), // 分
    's+': source.getSeconds(), // 秒
    'q+': Math.floor((source.getMonth() + 3) / 3), 
    'f+': source.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

function formatNumber(n) {
   n = n.toString();
   return n[1] ? n : '0' + n;
}

function formatTime(number, format) {
   var formateArr = ['Y','M','D','h','m','s'];
  var yue = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"];
   var returnArr = [];
   var date = new Date(number * 1000);
   returnArr.push(date.getFullYear());
   returnArr.push(formatNumber(date.getMonth() + 1));
   returnArr.push(formatNumber(date.getDate()));

   returnArr.push(formatNumber(date.getHours()));
   returnArr.push(formatNumber(date.getMinutes()));
   returnArr.push(formatNumber(date.getSeconds()));
  
   for (var i in returnArr) {
      if(i == 1){
        format = format.replace(formateArr[i], yue[returnArr[1]-1])
      }else {
        format = format.replace(formateArr[i],returnArr[i])
      }
   }
  return format;
}

module.exports = { formatDate, formatTime }
