---
note: 指令、过滤器
---
# Vue高级用法

## 自定义vue指令

```javascript
// ./src/directives/inputFilter/inputFilter.js
const addListener = function (el, type, fn) {
  el.addEventListener(type, fn, false)
}
const intFilter = function(el) {
  addListener(el, 'keyup', () => {
    el.value = el.value.replace(/\D/g, '')
  })
}

const priceFilter = function(el) {
  addListener(el, 'keyup', () => {
    el.value = el.value.replace(/[^\d.]*/g, '')
    if (isNaN(el.value)) {
      el.value = ''
    }
  })
}

const phoneFilter = function(el) {
  addListener(el, 'blur', () => {
    if (!el.value) {
      return
    }
    const phoneReg = new RegExp('^(13|14|15|16|17|18|19)[0-9]{9}$')
    if (!phoneReg.test(el.value)) {
      alert('手机号输入错误')
      el.value = ''
    }
  })
}

const urlFilter = function(el) {
  addListener(el, 'blur', () => {
    if (!el.value) {
      return
    }
    const urlReg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/
    if (!urlReg.test(el.value)) {
      alert('url输入错误')
      el.value = ''
    }
  })
}
const specialFilter = function (el) {
  addListener(el, 'input', () => {
    el.value = el.value.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '')
  })
}
export default {
  bind(el, binding) {
    if (el.tagName.toLowerCase() !== 'input' || el.tagName.toLowerCase() !== 'textarea') {
      el = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
    }
    switch (binding.arg) {
      case 'int':
        intFilter(el)
        break
      case 'price':
        priceFilter(el)
        break
      case 'special':
        specialFilter(el)
        break
      case 'phone':
        phoneFilter(el)
        break
      case 'url':
        urlFilter(el)
        break
      default:
        break
    }
  }
}

```

```javascript
// ./src/directives/inputFilter/index.js
import inputFilter from './inputFilter'
const install = function (Vue) {
  Vue.directive('inputFilter', inputFilter)
}
if (window.Vue) {
  window.inputFilter = inputFilter
  Vue.use(install)
}
inputFilter.install = install
export default inputFilter
```

```javascript
// ./src/app.vue
import inputFilter from '@/directives/input-filter/index.js' // 引入
export default {
  directives: {
    inputFilter
  },
}
```

使用的时候：`v-input-filter:special`