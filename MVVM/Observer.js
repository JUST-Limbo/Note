class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 先存旧值
    this.oldVal = this.getOldVal()
  }
  getOldVal() {
    Dep.target = this
    console.log(this)
    const oldVal = compileUtil.getVal(this.expr, this.vm)
    Dep.target = null
    return oldVal
  }
  update() {
    const newVal = compileUtil.getVal(this.expr, this.vm)
    if (newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 通知观察者去更新
  notify() {
    console.log('通知了观察者')
    this.subs.forEach(w => w.update())
  }
}

class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) {
    if (data && typeof data === 'object') {
      // console.log(Object.keys(data))
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
      })
    }
  }
  defineReactive(data, key, value) {
    // 递归
    this.observe(value)
    const dep = new Dep(Dep.target)
    // 劫持
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 订阅数据变化时,往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newVal) => { // 箭头函数此时this指向当前类Observer 不用箭头函数会导致this指向Object
        this.observe(newVal) // 如果将新的对象赋值给person,要重新劫持一次
        if (newVal !== value) {
          value = newVal
        }
        dep.notify()
      }
    })
  }
}
