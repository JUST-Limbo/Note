let throttle = function (func, wait) {
  let timeout
  return function () {
    let self = this
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(self, arguments)
        timeout = null
      }, wait);
    }
  }
}


let throttleImmediate = function (func, wait) {
  let prevtime = 0
  return function () {
    let self = this
    let nowtime = +new Date()
    if (nowtime - prevtime >= wait) {
      func.apply(self, arguments)
      prevtime = nowtime
    }
  }
}
