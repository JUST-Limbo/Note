let debounce = function (func, wait) {
  let timeout
  return function () {
    const self = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.bind(self, arguments)
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
      func.bind(self, arguments)
    }
  }
}
