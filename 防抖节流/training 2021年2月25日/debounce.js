let debounce = function (func, wait) {
  let timeout
  return function () {
    const self = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(self, arguments)
    }, wait)
  }
}

let debounceImmediate = function (func, wait) {
  let timeout
  return function () {
    const self = this
    if (timeout) clearTimeout
    let callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, wait)
    if (callNow) {
      func.apply(self, arguments)
    }
  }
}
