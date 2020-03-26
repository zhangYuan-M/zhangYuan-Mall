// 1.节流函数
export function debounce(fun, delay) {
  let timer = null
  return function() {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      fun()
    }, delay)
  }
}

// 2.格式化时间戳
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
  return fmt
}