## 不能直接侦听响应式对象的属性值

```js
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

这里需要用一个返回该属性的 getter 函数：

```js
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)

```

[侦听器 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/essentials/watchers.html#basic-example)

## watchEffect

`watchEffect()` 允许我们自动跟踪回调的响应式依赖。上面的侦听器可以重写为：

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

**如果你需要侦听一个嵌套数据结构中的几个属性，`watchEffect()` 可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。**

## watchEffect和watch

watchEffect不需要显式指明所监听的数据。

watchEffect会立即执行一次，在依赖数据变化时再次执行。watch只在所监测数据变化时执行。

## vue视图更新为什么是异步的，nextTick的实现

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div id="app">
            <button id="btn">count++</button>
            <div id="el"></div>
        </div>
        <script>
            const el = document.querySelector('#el');
            const btn = document.querySelector('#btn');
            function effect(fn) {
                activeEffect = fn;
                fn();
                activeEffect = null;
            }
            let activeEffect = null;
            const set = new Set();

            const tasks = new Set();
            function runTasks() {
                Promise.resolve().then(() => {
                    tasks.forEach((task) => task());
                    tasks.clear();
                });
            }

            const count = {
                _value: 0,
                get value() {
                    activeEffect && set.add(activeEffect);
                    return this._value;
                },
                set value(val) {
                    this._value = val;
                    set.forEach((cb) => tasks.add(cb));
                    runTasks();
                },
            };
            effect(() => {
                el.innerText = count.value;
            });
            function nextTick(cb) {
                Promise.resolve().then(cb);
            }
            btn.addEventListener('click', () => {
                count.value++;
                count.value++;
                console.log(el.innerText); // 取不到最新的值
                nextTick(() => {
                    console.log(el.innerText);
                });
            });
        </script>
    </body>
</html>

```

参考资料

+ 【vue 的异步更新原理和 nextTick 的实现】 https://www.bilibili.com/video/BV1xwpme4EJk/?share_source=copy_web&vd_source=dc1323228f1470bd561672c18d78adf3
