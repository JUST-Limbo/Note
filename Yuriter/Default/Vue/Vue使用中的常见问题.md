---
tags:
  - Vue
  - 常见问题
flag: blue
note: Vue
---
# Vue使用中的常见问题

## 一、vue监听不到state数组/json对象内的元素的值的变化

```javascript
this.arr[index] = value;
/*
vue监听不到数组内的元素的值的变化，要手动通知触发，或者用
computed来得出新的view数组进行处理，或者使用watch来监听变化重新
进行更新
*/
this.$set(this.arr, index, this.arr[index]);
this.$set(this.jsonObj, 'myKey', myValue); // 针对jsonObj
```

解决方案一般如下：

vue监听不到数组/json对象内的元素的值的变化：

1. 要手动通知触发；
2. 或者用compute来得出新的view数组/jsonObj进行处理；
3. 或者使用watch/deep watch来监听变化重新进行更新。

## 二、vue用splice删除多维数组元素导致视图更新失败情况

```javascript
this.arr[i] = null; // 可以把元素设为null，使用时用computed进行过滤即可
this.$set(this.arr, i, this.arr[i]);
```

## 三、vue项目如何部署到php或者java环境的服务器？

可行方案：

1、可以把打包出来静态文件中的index.html改成.tpl或者.php尾的等模板文件格式，然后可以在里面动态输出一些js变量如token，userinfo等信息供vue应用使用

2、也可以初始化的内容通过接口来请求过来，保存在localstorage或者全局变量供全局使用

## 四、vue-router各种路由跳转

```javascript
// 后退 类似 window.history.go(n)
this.$router.go(-1);

// 字符串
router.push('/home');

// 对象
router.push({ path: '/home' });

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }});

// 带查询参数，变成 /register?plan=private
router.push({
  path: '/register',
  query: { plan: 'private' }
});

// 替换，但history不会记录一条新的记录
this.$router.replace({
  path: '/mypath',
  query: {m: 'model'},
})

// 路径：http://localhost:8081/#/test?name=1
<router-link :to="{path:'/test',query: {name: id}}">跳转</router-link>(id是参数)

// 路径：http://localhost:8081/#/test/1
<router-link :to="'/test/'+id">跳转</router-link>(id是参数)
```

`params`、`query`是什么？
`params`：**`/router1/:id`** ，`/router1/123`，`/router1/789` , 这里的id叫做params, 且路由时必需传id
`params`：**`/router1/:id?`** ，`/router1/123`，`/router1` , 这里的id叫做params, 路由时可不传id
`query`：**`/router1?id=123`** ，`/router1?id=456`，这里的id叫做query，路由时可不传id

## 五、vue-router如何取参？

`this.$route.params.id`

`this.$route.query.id`

## 六、vue中如何深度watch？

```javascript
watch: {
  obj: {
    handler: function (v, o) {
    },
    deep: true
  }
}
```

## 七、vue生命周期及所有东西

```html
<template>
  <article class="pageview">
    {{msg}}
  </article>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Home',
  mixins: [],
  components: {
  },
  data () {
    return {
      msg: 'Home',
    }
  },
  beforeCreate () {
  },
  created () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  methods: {
  },
  computed: {
  },
  filters: {
  }
}
</script>

// Add "scoped" attribute to limit CSS to this component only
<style lang="scss" scoped>
</style
```

## 八、vue-router路由拦截中间件

```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title; // 动态设置meta或者可以进行其他路由前的操作
  }
  NProgress.start() // NProgress进度条开始
  next()
})

router.afterEach((transition) => {
  NProgress.done() // NProgress进度条结束
})
```

## 九、axios请求拦截中间件处理

```javascript
axios.interceptors.request.use(
  (headerConfig) => { // 这里，发送请求之前可以设置request header
    return config
  },
  (error) => { // 请求错误处理
    return Promise.reject(error)
  }
); // 添加响应拦截器

axios.interceptors.response.use(
  (response) => {
    let {data} = response; // 这里，请求完成后可以对数据进行拦截处理
    return data
  },
  (error) => { // 响应错误处理
    return Promise.reject(error)
  }
);
```

## 十、autoprefixer版本设置不能使用默认，browsers: ['last 2 versions']

last 10 versions

## 十一、设置反向代理来调用开发环境的接口实现跨域

修改 config/index.js 文件

写法一、使用filter统一代理

```javascript
proxyTable: {
  '**': {
    target: 'https://www.xxxx.com', // 要设置需跨域访问的接口的baseUrl，dev/qa/production
    changeOrigin: true,
    filter: function(pathname, req) {
      const isApiDev = pathname.indexOf('/api-dev/') == 0;
      const isApiTest = pathname.indexOf('/api-qa/') == 0;
      const isApiProduction = pathname.indexOf('/api-production/') == 0; return isApiDev||isApiTest||isApiProduction ;
    }
  }
}
```

 写法二、使用pathRewrite的写法

```javascript
proxyTable: {
  '/api/resource': {
    target: 'https://xxx.xxx.xxx.xxx:7070',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api/resource'': '/resource'}
  }
}
```

## 十二、scoped CSS样式对子组件无效问题

解决方案，使用/deep/

```html
<template>
  <div id="app">
    <el-input v-model="text" class="text-box"></el-input>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() { return {
      text: 'hello' };
  }
};
</script>

<style lang="less" scoped>
.text-box { // 样式可以作用于el-input 组件
  /deep/ input {
    width: 166px; text-align: center;
  }
}
</style>
```

## 十三、路由鉴权逻辑

 简单的登录+是否VIP会员的鉴权写法如下

```javascript
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

NProgress.inc(0.2);
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
});
router.beforeEach((to, from, next) => {
  const isLogin = false // 是否登录
  const isVip= false // 是否VIP会员
  NProgress.start();
  if (isLogin && isVip) {
    if (to.path.indexOf('/login') !== -1 || to.path.indexOf('/order-vip') !== -1) {
      next('/home');
      NProgress.done();
    } else {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next();
    }
  } else if (isLogin && !isVip) {
    if (to.path.indexOf('/login') !== -1 || to.path.indexOf('/home') !== -1) {
      next('/order-vip');
      NProgress.done() ;
    } else {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next()
    }
  } else {
    if (to.path.indexOf('/login') !== -1) {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  NProgress.done(); // 结束Progress
})
```

## 十四、如何修改Vue打包之后的文件路径为相对路径？

1、修改config目录下的index.js

```javascript
build: { // Template for index.html
  index: path.resolve(__dirname, '../dist/index.html'), // Paths
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '', // 修改这里由“/”改为“./”或者“”
}
```

2、修改build目录下的utils.js

```javascript
if (options.extract) {
  return ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader',
    publicPath: '../../' // 增加相对路径，主要是针对css背景图
  })
```

## 十五、在Vue中使用全局变量或者全局挂载

在小型的vue项目当中，其实并不需要使用到vuex，使用全局变量即可，使用方式：直接在main.js里面定义即可

```javascript
// 全局变量定义
global.USER_ID = null;
global.USER_NAME = null;
global.USER_MOBILE = null;
```

 当然也可以在main.js中把常量或者方法挂载到Vue的原型链prototype上，然后在页面中就可以直接通过this.xxx直接使用，如：

```javascript
import axios from 'axios'
import {
  Toast,
  MessageBox,
  Indicator,
  DatetimePicker
} from 'mint-ui' Vue.use(DatetimePicker)

Vue.prototype.SUCCESS_CODE = 0;
Vue.prototype.$toast = Toast;
Vue.prototype.$messagebox = MessageBox;
Vue.prototype.$indicator = Indicator;
Vue.prototype.axios = axios;
```

## 十六、旧系统手机及低版浏览器出现白屏问题的解决

解决方式：在`main.js`引入`babel-polyfill`

`import 'babel-polyfill'`

## 十七、在vue的template里面使用style动态设置图片背景问题

如果同时使用`style`及`:style`去**分开设置`background:url(xxx)`及`background-size:xx xx`的话**，**后面设置的`background-size`会失效**，可以使用下面的方式来设置解决

`background: url(https://www.xxx.com/xxx.jpg) center center / 100% 100% no-repeat;`

## 十八、当配置vue项目打包出来的css/js文件不带版本号时，如何解决缓存问题？

服务器端可使用`Cache-Control: max-age=xxxx`来控制静态文件缓存时间，类似如下：

```javascript
// 服务端代码
app.get('/xxxx.js', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=3600') // ...其他输出
})
```

## 十九、路由页面不变参数变化情况，页面状态不更新问题

```javascript
watch: {
  '$route' (to, from) { // 针对变化进行相应的处理
  }
}
```

## 二十、Vue中配置反向代理使用localhost:8080时报[HPM] Error occurred while trying to proxy request，请求时报504错误

解决方法：把`config/index.js`文件中的`localhost`改为本地IP就行了，然后后面再改回来试试，或者再检查一下localhost指向不对了（host文件）

## 二十一、Vue中node-sass突然使用不了，报...Run `npm rebuild node-sass` to build the binding...等错误

当你在平时的带有`node-sass`依赖包的vue项目中执行`yarn dev`或者`npm run dev`时，会报错，大概报错如下：

Node Sass could not find a binding for your current environment
This usually happens because your environment has changed since running `npm install`
Run `npm rebuild node-sass` to build the binding for your current environment

然后，rebuild就rebuild呗，结果还发现由于墙的原因，二进制文件地址（https://github-production-release-asset-2e65be.s3.amazonaws.com/4128353/585e4c80-9c28-11e8-8cdf-78861f5b0424?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20190220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190220T104233Z&X-Amz-Expires=300&X-Amz-Signature=12d9dd3497845f932f0926c62c2c02ace2b12095f8212a70957430c2b706aadb&X-Amz-SignedHeaders=host&actor_id=7983722&response-content-disposition=attachment%3B%20filename%3Dwin32-x64-64_binding.node&response-content-type=application%2Foctet-stream）
一直下载失败，一直rebuild失败

1）切换到联通4G把文件下载到本地如（D:\temp\win32-x64-48_binding.node ）

2）执行命令：set SASS_BINARY_PATH=D:\temp\win32-x64-48_binding.node

3）执行_npm rebuild node-sass _成功啦，最后，执行yarn dev或者npm run dev应该没问题了。

## 二十二、Vue发包上线cache control控制文件缓存策略问题，特别是index.html文件

不做缓存策略**会存在的问题：微信下打开总会load到旧包或者会出现白屏情况**

vue项目打包发布时生成的静态包文件要发布上线时可选用的策略：

１）如果用户访问量大的，服务器可以设置`cache control`及增量发包

２）如果系统用户数访问量不大的，可以设置html添加`meta`设计`cache-control`为`no-cache`或者其他，也可以结合服务器一起配置

## 二十三、document.activeElement.scrollIntoViewIfNeeded()解决iphone输入框移位或者vue keep-alive页面后退白屏问题

iphone X系列页面偶尔会出现因页面变换而渲染失败的情况，引用`scrollIntoViewIfNeeded`可以强制滚动页面让其重新渲染出来

## 二十四、使用`babel-polyfill`解决旧版手机白屏或者PC浏览器兼容问题

`npm install --save babel-polyfill`

在`main.js`文件头部引入

`import 'babel-polyfill' // 或者require('babel-polyfill')`

## 二十五、使用computed的get,set可实时反向更改源数据

```javascript
computed: {
  fullname: {
    // getter
    get: function () {
      return this.firstName + this.familyName
    },
    // setter
    set: function (newValue) {
      let names = newValue.split(' ')
      this.firstName = names[0]
      this.familyName = names[1]
    }
  }
}
```

## 二十六、在页面上如何调用组件内的函数？

在`template`上加上组件引用标识`ref`，类似于以前的react组件引用方式

`<my-component ref="myComponent"/>`

然后在js代码中直接使用

`this.$refs.myComponent.fn() // 比如组件上有fn这个内置方法，直接调用`

## 二十七、在Vue中如何突破模版限制递归渲染类树结构视图内容？

使用render函数即其中的h函数进行处理，可参照：[Vue中使用渲染函数render实现无限节点的树](http://www.a4z.cn/fe/2019/04/26/vue-render-tree/)

## 二十八、vue-router路由拦截的写法坑

`router.beforeEach((to, from, next) => { // 所有if else条件都必需提供next路由出口，不然会出现死询环（不停加载）或者路由失败（白屏的情况 })`

## 二十九、移动端ios8的坑，路由前页面没有滚到顶部，路由后的页面使用了fixed内容且宽为100%时，宽度会超过750px/10rem，导致布局错乱

解决方式：给路由后的fixed内容加宽度限制

`max-width: 10rem; /* 750px; */`

## 三十、axios请求formData的方式

```javascript
axios({
  url: '/api',
  method: 'post',
  data: {
    param1:param1,
    param2:param2
  },
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&' }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
```

## 三十一、vue动态设置raw html的方式

```html
<div v-html="message">{{message}}</div>
export default {
  data () {
    return {
      message: "<h2>这里可以包含html标签<h2>"
    }
  }
}
```

## 三十二、组件内部的点击事件触发dom结构重画或者重流时，导致android微信浏览器崩溃问题

解决方案：让事件异步执行

```javascript
methods: {
  handleClick () {
    setTimeout(() => {
      this.$router.go(-1) // 或者其他关闭对话框事件等等
    }, 0);
  }
}
```

## 三十三、Vue中子组件如何向父组件传递事件？

```html
<script>
// Vue子组件定义事件event1
Vue.component('child-component', {
  methods: {
    emitEvent() {
      this.$emit('event1', 'This is a event.')
    }
  },
  mounted() {
    this.emitEvent()
  }
})
</script>
 
// Vue 父组件绑定监听子组件事件event1
<template>
  <div>
    <child-component @event1="eventHandler" />
  </div>
</template>
  
<script>
  import childComponent from './child-component'
  export default {
    components: {
      childComponent
    },
    methods: {
      eventHandler(event) {
        console.log(event)
      }
    }
  }
</script>
```

## 三十四、Vuex中的mutations操作后视图不更新问题

```javascript
mutations: {
  UPDATE_STATE: (state, options) => {
  // state = { ...state, ...options } // 此方式可能会更新失败
    Object.keys(options).forEach((key) => { // 使用Vue.set强制更新
      Vue.set(state, key, options[key])
    })
  }
},
```

## 三十五、ios系统$router.go(-1)后退后页面图片不渲染问题

使用`<keep-alive>`或者使用`scrollIntoView`与`scrollIntoViewIfNeed`

## 三十六、Vue内页中引入相对路径build时，其实是相对于index.html这文件的路径

比如如果在vue内页中使用

`let myUrl = './static/js/a.js'`
build出来后是相对于`http://xxx/xx/index.html`的，结果为`http://xxx/xx/static/js/a.js`

## 三十七、Vue中使用canvas画布画图要注意的问题

１、如何引用本地的图片？

```javascript
// 如果要使用一张图片，可以先把img import进来再画到canvas上，
import myImg from '../../assets/my-img.png'
// ...
export default { // ...
  data () {
    return {
      myImg: myImg
    }
  }, // ...
}
```

２、图片请求时是来源于外域，但canvas最后要使用`btoa`、`canvas.toDataURL()`时，浏览器是不允许跨域把canvas转成图片的。

解决办法是要，图片服务器设置允许跨域请求，同时`<img>`要加上`crossOrigin="anonymous"`属性，告诉页面图片将要通过跨域请求。

可参考：

[https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror/27260385#27260385](https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror/27260385#27260385)

[https://www.jianshu.com/p/6fe06667b748](https://www.jianshu.com/p/6fe06667b748)

## 三十八、Element-UI日历date-picker组件在IE下的首次渲染初始值失败问题

被placeholder占位了，
删除placeholder或者自己额外添加假placeholder

参考：[https://blog.csdn.net/siwangdexie_copy/article/details/89947594](https://blog.csdn.net/siwangdexie_copy/article/details/89947594)

## 三十九、Vue中使用css3组合动画要注意vdom的重新渲染问题

**问题**：当使用class样式结合`setTimeout`进行组合动画时，如果使用了dom操作来添加或者修改动画，此时，如果过程中state值发生了变化，有可能导致动画失效（dom被重新渲染了）

**解决方式**：应当尽可能使用减少直接对dom的操作，更多的**使用直接变更`state`切换`class`或者`v-if`、`v-show`来结合 `setTimeout`来创建组合动画**。

## 四十、axios怎么获取到error中的response响应数据

**解决方式**：在error后面添加`error.response`

## 四十一、element-ui的table表格控件表头与内容列不对齐问题

解决element-ui的table表格控件表头与内容列不对齐问题
`/deep/ .el-table th.gutter { display: table-cell !important;}`

## 四十二、axios下载excel文件(blob二进制方式/arraybuffer方式)

```javascript
// blob二进制方式
axios({
  method: 'post',
  url: '/api/exportExcel',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    token: 'xxxx',
  }
}).then((res) => {
  // console.log(res)
  const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); // application/vnd.openxmlformats-officedocument.spreadsheetm
  l.sheet这里表示xlsx类型
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = 'xxxx.xlsx'; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}).catch((error) => {
  console.log(error.message);
})
```

arraybuffer方式也类似，可参考：[https://blog.csdn.net/qq_37588752/article/details/80407471](https://blog.csdn.net/qq_37588752/article/details/80407471)

## 四十三、如何创建一个支持v-model的组件

```html
<template> 
  <div>
    <label><input type="checkbox" :checked="value" @click="change" />勾选我吧</label>
  </div>
</template>
<script>
export default {
  data() {
  },
  model:{
    prop: 'value',
    event: 'valueChange'
  },
  props:{
    value: Number
  },
  methods:{
    change(e) {
      let number = 0;
      if(e.target.checked) {
        number = 1;
      }
      this.$emit('valueChange', number);
    }
  }
}
</script>
```

## 四十四、dev或者打包时报TypeError: Cannot assign to read only property 'exports' of object '#<Object>'错误

**问题所在**就是代码段**同时出现了`import`与`module.exports`**

**解决方案：去掉`module.export`，使用统一ES6的方式编写即可，用`export default`代替**