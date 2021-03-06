let throttleImmediate = function (func, delay) {
  let prevtime = 0
  return function () {
    let self = this
    let nowtime = +new Date()
    if (nowtime - prevtime >= delay) {
      func.apply(self, arguments)
      prevtime = nowtime
    }
  }
}

let throttle = function (func, delay) {
  let timeout
  return function () {
    let self = this
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(self, arguments)
      }, delay)
    }
  }
}
