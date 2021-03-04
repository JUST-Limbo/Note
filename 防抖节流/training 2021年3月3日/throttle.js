let throttle = function (func, wait) {
  let timeout
  return function () {
    let self = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(self, arguments)
    }, wait);
  }
}

let throttleImmediate = function (func, wait) {
  let prevtime = 0
  return function () {
    let self = this, nowtime = +new Date()
    if (nowtime - prevtime >= wait) {
      func.apply(self, arguments)
      prevtime = nowtime
    }
  }
}
