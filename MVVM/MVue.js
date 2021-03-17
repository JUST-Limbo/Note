const compileUtil = {
  getVal(expr, vm) {
    // [person,name]
    return expr.split('.').reduce((data, currentVal) => {
      return data[currentVal]
    }, vm.$data)
  },
  setVal(expr, vm, inputVal) {
    return expr.split('.').reduce((data, currentVal) => {
      if (typeof (data) !== 'object') {
        data[currentVal] = inputVal
      } else {
        return data[currentVal]
      }
    }, vm.$data)
  },
  getContentVal(expr, vm) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1], vm)
    })
  },
  text(node, expr, vm) { //expr:msg  person.name {{}}
    let value;
    if (expr.indexOf('{{') !== -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        new Watcher(vm, args[1], (newVal) => {
          this.updater.textupdater(node, this.getContentVal(epxr, vm))
        })
        return this.getVal(args[1], vm)
      })
    } else {
      value = this.getVal(expr, vm)
    }
    this.updater.textupdater(node, value)
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm)
    new Watcher(vm, expr, (newVal) => {
      this.updater.htmlUpdater(node, newVal)
    })
    this.updater.htmlUpdater(node, value)
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm)
    // 绑定更新函数 数据驱动视图
    new Watcher(vm, expr, (newVal) => {
      this.updater.modelUpdater(node, newVal)
    })
    // 视图=>数据
    node.addEventListener('input', (e) => {
      this.setVal(expr, vm, e.target.value)
    })
    this.updater.modelUpdater(node, value)
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr]
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  bind(node, expr, vm, attrName) {
    const value = this.getVal(expr, vm)
    node.setAttribute(attrName, value)
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    textupdater(node, value) {
      node.textContent = value
    }
  }
}

class Compile {
  constructor(el, vm) {
    // 获取app根节点
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    // MVue实例
    this.vm = vm
    // 1.获取文档碎片对象,放入内存中,减少页面回流和重绘
    const fragment = this.node2Fragment(this.el)

    // 2.编译模板
    this.compile(fragment)

    // 3.追加子元素到根元素
    this.el.appendChild(fragment)
  }
  compile(fragment) {
    // 1.获取子节点
    const childNodes = fragment.childNodes;
    // 2.遍历子节点
    [...childNodes].forEach(child => {
      // 3.对子节点的类型进行不同的处理
      if (this.isElementNode(child)) {
        // 是元素节点
        // 编译元素节点
        this.compileElement(child)
      } else {
        // 剩下的就是文本节点
        // 编译文本节点
        this.compileText(child)
      }
      // 4.一定要记得,递归遍历子元素
      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }
  compileElement(node) {
    // console.log(node)
    // <div v-text="msg"></div>
    const attributes = node.attributes;
    // console.log(attributes)
    [...attributes].forEach(attr => {
      // console.log(attr)
      const { name, value } = attr
      // console.log(name)
      if (this.isDirective(name)) {
        // 是一个指令 v-text v-html v-model v-on:click v-bind:src
        const [, directive] = name.split('-') // text html model on:click
        const [dirName, eventName] = directive.split(':') // text html model on
        compileUtil[dirName](node, value, this.vm, eventName)

        // 删除有指令的标签上的属性
        node.removeAttribute('v-' + directive)
      } else if (this.isEventName(name)) { // @click='handlerClick'
        let [, eventName] = name.split('@')
        compileUtil['on'](node, value, this.vm, eventName)
      }
    })
  }
  compileText(node) {
    // console.log(node.textContent)
    const content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm)
    }
  }
  isEventName(attrName) {
    return attrName.startsWith('@')
  }
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  node2Fragment(el) {
    // 创建文档碎片
    const f = document.createDocumentFragment()
    let firstChild
    while (firstChild = el.firstChild) {
      // append相当于剪切
      f.appendChild(firstChild)
    }
    return f
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
}

class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1.实现一个数据观察者
      new Observer(this.$data)
      // 2.实现一个指令解析器
      new Compile(this.$el, this)
      // 代理
      this.proxyData(this.$data)
    }
  }
  proxyData(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    }
  }
}
