# SPA优化

## 延迟加载组件

延迟加载组件可以节省大量的初始加载时间。调用`import()`函数时，将会下载所有延迟加载的资源。对于Vue组件，仅在请求渲染时才发生。对话框是注定会这样的。通常仅在用户交互后才显示他们。

```html
<template>
  <div>
    ...
    <app-modal-dialog v-if="showDialog" />
  </div>
</template>
<script>
export default {
  components: {
    ModalDialog: () => import('./ModalDialog.vue')
  }
}
</script>
```

Webpack将为ModalDialog组件创建一个单独的块，该块不会在页面加载时立即下载，而是仅在需要时才下载。
注意不要延迟加载应自动显示的组件。例如以下内容（无提示）将无法加载对话框。

```javascript
mounted() {
  this.$bvModal.show('password-check')
}
```

原因是已安装的hook是在延迟记载模态组件之前进行评估的。

## 延迟加载路由

构建SPA时，JavaScript捆绑包可能会变得很大，从而增加页面加载时间。如果我们可以将每个路由的组成部分拆分为一个单独的块，然后仅在访问路由时才加载它们，则效率会更高。

```javascrip
import ProjectList from '@/components/ProjectList.vue'
export const routes = [
  {
    path: '/projects',
    name: 'projects',
    component: ProjectList
  }
]
```

定义一个异步组件非常容易，该组件将由Webpack自动进行代码拆分。只需更改导入语句：
`const ProjectList = () => import('@/components/ProjectList.vue')`
除此之外，无需更改路由配置。通过以下方式在生产模式下构建你的应用：
`"build": "vue-cli-service build --mode production"`
并确认会生成很多块。

### Vue和Webpack中的代码拆分

你还可以通过在浏览器中打开开发者控制台来验证此功能是否正常。在Network标签中，一旦你访问新路由，就会异步加载多个JavaScript文件。在开发模式下，每个块都将被赋予一个自动递增的数字。在生产模式下，将使用自动计算的哈希值代替。

### 延迟加载的块和预取缓存

Vue有一个很酷的功能就是Vue自动添加Webpack的魔术注释，以便进一步自动预取其他块。但是，预取仅在浏览器完成初始加载并变为空闲之后才开始。

## 使对象列表不可变

通常，我们将从后端获取对象列表，例如用户、项目、文章等。默认情况下，Vue使数组中每个对象的第一级属性都具有响应性。对于大量对象而言，这代价可能会很大。有时我们只想显示对象时就不需要去修改它们。
所以在这种情况下，如果我们阻止Vue使列表具有响应性，那么就可以获得一些性能。我们可以通过使用列表中的`Object.freeze`来做到这一点，例如使其一直不变。

```java
export async function get(url: string): Promise<User[]> {
  const response = await Object.freeze(axios.get<User[]>(url))
  return response.data
}
```

## 功能组件

功能组件是不包含任何状态和实例的组件。将无状态Vue组件转换为功能组件可以大大提高渲染的性能。
只需在顶层`template`标签中添加`functional`关键字即可：

```html
<template functional>
  <div></div>
</template>
```

要想以前一样访问prop和数据，你必须进行一些小调整。

```html
<template functional>
  <div>{{ props.someProp }}</div>
</template>
<script>
export default {
  props: {
    someProp: String
  }
}
</script>
```

如果你使用i18n进行国际化，则必须在parent之前加上`$t`：
`{{ parent.$t('app.not-found.message') }}`

使用功能组件，我们无权使用方法或计算的prop。但是，我们仍然可以使用`$options`访问方法。

```html
<template functional>
  <div>
    {{ $options.username(props.user) }}
  </div>
</template>
<script>
export default {
  props: {
    user: User
  },
  username(user: User): string {
    return user.name
  }
}
</script>
```
