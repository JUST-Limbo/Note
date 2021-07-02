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

```JavaScript
var canvas=document.getElementById("mycanvas");
var ctx=canvas.getContext("2d")
ctx.fillStyle="blue"
// 设置信号量
var left=10;
setInterval(()=>{
    //清除画布
    ctx.clearRect(0,0,700,600)
    // 更新信号量
    left++;
    ctx.fillRect(left,left,100,100)
    if(left==700){
        left=10
    }
},4)
```





### 面向对象

因为 canvas 不能得到已经上屏的对象，所以我们要维持对象的状态。在 canvas 动画中，我们都使用面向对象来进行编程，因为我们可以使用面向对象的方式来维持 canvas 需要的属性和状态

```js
// 获取画布
var can = document.getElementById("can")
var ctx = can.getContext("2d");
// 绘制方法
function Rect(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color
}
// 更新方法
Rect.prototype.update = function () {
    this.x++;
}
// 渲染
Rect.prototype.render = function () {
    // 设置颜色
    ctx.fillStyle = this.color;
    // 渲染
    ctx.fillRect(this.x, this.y, this.w, this.h);
}
// 实例化
var r1 = new Rect(100, 100, 50, 50, "#91d5ff")
// 动画过程
setInterval(() => {
    //清屏
    ctx.clearRect(0, 0, can.width, can.height)
    //更新
    r1.update()
    // 渲染
    r1.render()
}, 5)
```

## 绘制功能

| 方法 / 属性                  | 描述                                             |
| ---------------------------- | ------------------------------------------------ |
| fillStyle                    | 设置填充颜色                                     |
| fillRect(x,y,width,height)   | 方法绘制 “已填色” 的矩形。默认的填充颜色是黑色。 |
| strokeStyle                  | 设置边框颜色                                     |
| strokeRect(x,y,width,height) | 方法绘制矩形边框。默认的填充颜色是黑色。         |
| clearRect(x,y,width,height)  | 清除画布内容                                     |
| globalAlpha                  | 设置透明度 0-1                                   |

### 绘制路径

```js
// 创建路径
ctx.beginPath()
// 移动绘制点
ctx.moveTo(100,100)
// 描述行进路径
ctx.lineTo(200,300);
ctx.lineTo(300,230);
ctx.lineTo(440,290);
ctx.lineTo(380,50);
// 封闭路径
ctx.closePath()
// 设置颜色
ctx.strokeStyle="#91d5ff"
// 绘制不规则图形
ctx.stroke()
// 填充不规则图形
ctx.fill()
```

