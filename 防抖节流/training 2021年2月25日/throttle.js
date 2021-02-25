let throttleImmediate = function (func, wait) {
  let prevtime = 0
  return function () {
    let self = this
    let nowtime = +new Date()
    if (nowtime - prevtime >= wait) {
      func.bind(self, arguments)
      prevtime = nowtime
    }
  }
}

let throttle = function (func, wait) {
  let timeout
  return function () {
    let self = this
    if (!timeout) {
      setTimeout(() => {
        func.bind(self, arguments)
        timeout = null
      }, wait)
    }
  }
}
