# Canvas

## 概述

```html
<canvas width="400" height="500" id="mycanvas">
       当前浏览器版本不支持，请升级浏览器
</canvas>
```

> canvas 的标签属性只有两个，width 和 height.。表示的是 canvas 画布的宽度和高度。注意 canvas 的 width 和 height 不要用 css 的样式来设置，如果使用 css 的样式来设置，画布会失真，会变形 标签对儿里面的文字是用来提示低版本浏览器 (IE6/7/8)

```html
<canvas width="500" height="400" id="mycanvas">
    当前浏览器版本不支持,请升级浏览器
  </canvas>
  <script>
    // 得到canvas的画布
    var canvas = document.getElementById("mycanvas")
    // 得到画布的上下文, 2D的上下文和3D的上下文
    // 所有图像绘制都通过ctx属性或方法绘制,与标签无关
    var ctx = canvas.getContext('2d')
    // 设置颜色
    ctx.fillStyle = 'green'
    // 绘制矩形
    ctx.fillRect(100, 100, 200, 50);
    console.log(ctx)
    console.log(canvas)
  </script>
```

### canvas的像素化

> 使用 canvas 绘制了一个图形，一旦绘制成功了，canvas 就像素化了他们。 canvas 没有能力，从画布上再次得到这个图形，也就是说我们没有能力去修改已经在画布上的内容。这个就是 canvas 比较轻量的原因，Flash 重的原因之一就有它可以通过对应的 api 得到已经上 “画布” 的内容然后再次绘制，如果我们想要让这个 canvas 图形移动，必须按照清屏 - 更新 - 渲染的逻辑进行编程，总之就是重新再画一次

### 面向对象