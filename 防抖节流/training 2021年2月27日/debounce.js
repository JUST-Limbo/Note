let debounce = function (func, wait) {
  let timeout
  return function () {
    let self = this
    if (timeout) clearTimeout(timeout)
    setTimeout(() => {
      func.apply(self, arguments)
    }, wait);
  }
}

let debounceImmediate = function (func, wait) {
  let timeout
  return function () {
    let self = this
    if (timeout) clearTimeout(timeout)
    let callnow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, wait);
    if (callnow) func.apply(self, arguments)
  }
}
