# Vue性能优化

## 延迟渲染

### 延迟渲染

延迟渲染就是分批渲染，假设我们某个页面里有一些组件在初始化时需要执行复杂的逻辑：

```vue
<template>
  <div>
    <!-- Heavy组件初始化时需要执行很复杂的逻辑，执行大量计算 -->
    <Heavy1 />
    <Heavy2 />
    <Heavy3 />
    <Heavy4 />
  </div>
</template>
```

这将会占用很长时间，导致帧数下降、卡顿，其实可以使用分批渲染的方式来进行优化，就是先渲染一部分，再渲染另一部分：

参考黄轶老师揭秘 `Vue.js` 九个性能优化技巧中的代码：

```vue
<template>
  <div>
    <Heavy v-if="defer(1)" />
    <Heavy v-if="defer(2)" />
    <Heavy v-if="defer(3)" />
    <Heavy v-if="defer(4)" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayPriority: 0
    }
  },
  mounted() {
    this.runDisplayPriority()
  },
  methods: {
    runDisplayPriority() {
      const step = () => {
        requestAnimationFrame(() => {
          this.displayPriority++
          if (this.displayPriority < 10) {
            step()
          }
        })
      }
      step()
    },
    defer(priority) {
      return this.displayPriority >= priority
    }
  }
}
</script>
```

其实原理很简单，主要是维护`displayPriority`变量，通过`requestAnimationFrame`在每一帧渲染时自增，然后我们就可以在组件上通过`v-if="defer(n)"`使`displayPriority`增加到某一值时再渲染，这样就可以避免 js 执行时间过长导致的卡顿问题了。