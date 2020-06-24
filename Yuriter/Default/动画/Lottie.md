# 前端动画之Lottie

## 简单了解一下Lottie

1. 动画设计交给UI，UI通过AE设计，bodymovin插件导出动画数据为json文件
2. 前端在项目中引入lottie.js，通过相应方法加载json形成动画

## 那该怎么写呢？

### Normal Html中的写法

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <!-- 1.首先，你得需要一个装动画的盒子 -->
  <div id="lottieDiv"></div>
  <!-- 最简写法，当然，效果也缩水了，官网写了，咱也就拿过来瞅一下 -->
  <div class="lottie" data-animation-path="./data.json" data-anim-loop="true"></div>
</body>
<!-- 2.然后，你还需要引入lottie的js文件，静态资源或者cdn都可以 -->
<script src="./lottie.js"></script>
<script>
  // 3.最后，使用lottie中的方法加载动画，就行啦
  var test = lottie.loadAnimation({
    container: document.getElementById("lottieDiv"), //装动画的dom元素
    name: 'title', // 动画实例的名字
    renderer: "svg", // svg/canvas/html
    loop: true, // 循环？true/false/num，num从0开始的次数
    autoplay: true, // 自动播放
    path: 'data.json' // 动画json路径
  });
</script>
</html>
```

### Vue中的写法

#### 最easy的是？

不用我说，我们都知道，Vue项目中是有一个public目录的，里面存放了唯一的index.html，那，懂了吧，上面的写法在这里也可以用，但是，需要注意，这样子的动画效果不经过特殊处理的话，是全局效果。

#### 组件中咋办？

一种是官网的js方案

```html
<template>
  <div id="lottieBox">
    <button @click="startLottie">开始动画</button>
    <button @click="stopLottie">停止动画</button>
  </div>
</template>

<script>
// npm i lottie-web
import lottie from 'lottie-web'
// 引入了动画的json文件（其中一种方案）
import animationData from '../assets/data.json'

export default {
  data() {
    return {
      anim:{},
    }
  },
  methods: {
    startLottie() {
      this.anim.play();
    },
    stopLottie() {
      this.anim.pause();
      // this.anim.togglePause();
      // this.anim.destroy();
    }
  },
  mounted() { // 必须是mounted
    this.anim = lottie.loadAnimation({
      container: document.getElementById('parent'),
      name: 'title',
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: 'data.json' // 引入动画的json的文件（另一种方案），值得注意的是，这里data.json还是放在assets目录中，但是，当前vue文件在views目录中，而views和assets是同级目录，但引入的时候是不需要写前缀路径的
      // animationData: animationData // 这是刚刚上面import进来的，也就是第一种json引入方案
    });
  }
}
</script>

<style>
</style>
```

另一种是组件方案

```javascript
// main.js

// npm i vue-lottie
import lottie from 'vue-lottie'
Vue.component('lottie', lottie);
```

```html
<template>
  <div>
    <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
import animationData from '../assets/data.json'

export default {
  data() {
    return {
      defaultOptions: {
        animationData,
      }, // 这个就是上面js方案中lottie.loadAnimation()中的参数
      anim:{}
    }
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
      console.log(anim);
    }
  }
}
</script>

<style>
</style>
```

## 看点好东西

### 动画实例的主要方法

`anim.play()` —— 播放动画
`anim.stop()` —— 停止动画
`anim.pause()` —— 暂停动画
`anim.setSpeed(speed)` —— 设置播放速度，参数speed为Number，1为正常速度
`anim.setDirection(direction)` —— 设置播放方向。1为正着播，-1为反着播
`anim.goToAndStop(value, isFrame)` —— 调到某一帧并暂停播放。第一个参数是Number，第二个参数是Boolean，设置true则表明第一个参数代表的是帧数，false代表第一个参数为时间值（单位毫秒），默认false
`anim.goToAndPlay(value, isFrame)` —— 调到某一帧并播放。同上
`anim.playSegments(segments, forceFlag)` —— 播放某一片段。第一个参数为一维数组或多维数组，每个数组包含两个值（开始帧， 结束帧），第二个参数是一个Boolean，决定是否立即强制播放该片段
`anim.destroy()` —— 注销动画，清空DOM节点

### lottie的主要方法

`lottie.play(<name>)` —— 播放所有动画，name为动画名称，播放该动画
`lottie.stop(<name>)` —— 停止，同上
`lottie.setSpeed(speed, <name>)` —— 举一反三
`lottie.setDirection(direction, <name>)` —— 反四
`lottie.destroy()` —— 反五
`lottie.loadAnimation(obj)` —— 加载动画
`lottie.registerAnimation(element, animationData)` —— 可以给一个节点直接注册一个动画。第一个元素是装动画的盒子，和之前没区别，第二个元素是动画的json数据。这个方法的动画默认配置项需要写在页面中的指定元素上。属性如下：

* `data-anim-name='动画名'`
* `data-anim-loop='循环?'`
* `data-anim-autoplay='自动播放?'`
* `data-anim-type='svg/canvas/html'`

上面这些是不是非常熟悉啊
`lottie.setQuality()` —— 设置播放质量，默认high，可以设置为high、medium、low或者一个大于1的数值。在有些动画中，数值低于2时不会有区别

### 事件监听

`complete` —— 动画播放结束时触发（循环播放不会触发）

```javascript
anim.addEventListener("complete", function() {
  console.log("complete...");
});
```

`loopComplete` —— 进入下一个循环时触发，为什么这么说？当动画配置中的loop为0时，是不会触发这个事件的
`enterFrame` —— 每进入一帧触发一次
`segmentStart` —— 进入片段播放时触发
`config_ready` —— 初始化配置完成时触发
`data_ready` —— 动画所有部分加载完成时触发
`DOMLoaded` —— DOM元素加载完成时触发
`destroy` —— 注销动画时触发