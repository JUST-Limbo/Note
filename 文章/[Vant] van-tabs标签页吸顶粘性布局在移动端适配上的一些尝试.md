## 官方文档地址：

+ [Vant Tab标签页文档示例](https://youzan.github.io/vant/#/zh-CN/tab)

## 问题描述

在开发中使用`Vant`标签页`van-tabs`组件时，遇到了一个关于标签页的粘性布局的屏幕适配问题。

原因是`van-tabs`的`offset-top`属性限制单位为`px`，会导致在不同屏幕尺寸下出现布局问题。

在移动端适配过程中，开发者通常会采取`rem`，`vw/vh`的适配方案。因此当`vant-tabs`的`offset-top`属性值为一个确定的数字时，布局会变得不再稳定。

![](https://user-gold-cdn.xitu.io/2020/6/19/172cc053b642afbf?w=1372&h=485&f=png&s=198613)

## 解决策略

事实上如果该`vant-tabs`组件的`offset-top`属性能支持移动端适配方案，则这个问题就不会出现。

但是既然页面问题已经出现了，当时能想到的解决问题的策略有如下几个：

1. 生写一个原生的`tabs`标签页

   这个方案逻辑上的实现难度小到可以忽略，唯一的难点或许是点击未激活`tabs`标题时底部条的动画。如果只是一个页面用到了这个组件，生写一个原生的`tabs`似乎并不是一个很划算的选择（即使个人能力能得到锻炼）。

2. 修改源码

   问题出现的原因已经知道了，修改源码如果能成功的话确实是一个最强势的方案。但是极有可能会导致解决了一个问题又创造了另一个新问题。

3. 将`vant-tabs`元素移入`.header`

   将`vant-tabs`元素移入`.header`，让`.header`元素引导`tabs`标题栏的粘性布局。

   此外要放弃`vant-tabs`预设的内容区默认插槽（就是说不要在`van-tab`那个双标签里写标签页内容，默认插槽在页面上的元素类名是`.van-tabs__content`），在`.header`元素的同级手写一个内容区`div`进行每个标签页的展示，通过`v-show="active==='a/b/c/d'"`进行切换。

   这个解决方案是四个方案中最稳定最具性价比的，但是缺点是`vant-tabs`关于标签页内容区的动画效果等附加内容几乎全部被阉割。

4. 通过`js`动态获取到`.header`元素的实际渲染高度，手动为`offset-top`赋值

   只需要在**合适的生命周期函数**中拿到想要的高度值，在赋值给`offset-top`后让`van-tabs`渲染出来即可。

   这个方案看起来几乎几乎是完美的，但是具体实现有一个致命的缺陷是在第一次上拉时标题栏大概率出现一次不明原因的瞬间抖动，持续的上拉会引起`.header`的不明原因高频抖动。
   

## 解决方案的代码示例

### 第三个解决方案的代码示例

```vue
<template>
  <div class="container">
    <div class="header">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, a assumenda ratione harum 	sapiente itaque non perferendis reiciendis, corrupti
      <van-tabs v-model="active">
        <van-tab title="标签 1" name="a"></van-tab>
        <van-tab title="标签 2" name="b"></van-tab>
        <van-tab title="标签 3" name="c"></van-tab>
        <van-tab title="标签 4" name="d"></van-tab>
      </van-tabs>
    </div>
    <div class="tabs-content">
      <div v-show="active=='a'">
        <span>
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        </span>
      </div>
      <div v-show="active=='b'">
        <span>
          bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb  bbbbb
        </span>
      </div>
      <div v-show="active=='c'">
        <span>
          ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc
        </span>
      </div>
      <div v-show="active=='d'">
        <span>
          ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd 
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'a'
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  overflow: scroll;
  background-color: lightgreen;
  background-repeat: no-repeat;
  background-size: 100%;
}
.header {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
  overflow: hidden;
}
</style>

```

### 第四个解决方案的代码示例

```vue
<template>
  <div class="container">
    <div
      class="header"
      ref="header"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, a assumenda ratione harum sapiente itaque non perferendis reiciendis, corrupti sapiente itaque non perferendis reiciendis, corrupti</div>
    <!--  :offset-top="offsetTop" -->
    <van-tabs v-if="offsetTop" v-model="active" sticky :offset-top="offsetTop">
      <van-tab title="标签 1" name="a">
        <div>
          <span>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</span>
        </div>
      </van-tab>
      <van-tab title="标签 2" name="b">
        <div>
          <span>bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb</span>
        </div>
      </van-tab>
      <van-tab title="标签 3" name="c">
        <div>
          <span>ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc ccccc</span>
        </div>
      </van-tab>
      <van-tab title="标签 4" name="d">
        <div>
          <span>ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'a',
      offsetTop: ''
    }
  },
  mounted() {
    console.log(this.$refs.header.offsetHeight);
    this.offsetTop = this.$refs.header.offsetHeight
  }
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  overflow: scroll;
  background-color: lightgreen;
  background-repeat: no-repeat;
  background-size: 100%;
}
.header {
  background-color: #fff;
  height: 200px;
  position: sticky;
  top: 0;
  z-index: 999;
  overflow: hidden;
}
</style>

```



## 支线

笔者在工程中用的适配插件是`postcss-px2rem`

在写这篇文章时产生了一个疑问，为什么`offset-top`的属性值不会被适配插件修改？

如果能让适配插件对动态赋值的像素单位进行转换，或许能从根本上解决这一问题。