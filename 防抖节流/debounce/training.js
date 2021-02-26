let debounce = function (func, delay) {
  let timeout;
  return function () {
    const self = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(self, arguments)
    }, delay)
  }
}

let debounceImmediate = function (func, delay) {
  let timeout
  return function () {
    let self = this
    if (timeout) clearTimeout(timeout)
    let callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, delay)
    if (callNow) func.apply(self, arguments)
  }
}
