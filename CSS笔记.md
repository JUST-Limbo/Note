## :target伪类

**`:target`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [伪类](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) 代表一个唯一的页面元素(目标元素)，其[`id`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-id) 与当前URL片段匹配 

```html
<h3>Table of Contents</h3>
<ol>
 <li><a href="#p1">Jump to the first paragraph!</a></li>
 <li><a href="#p2">Jump to the second paragraph!</a></li>
 <li><a href="#nowhere">This link goes nowhere,
   because the target doesn't exist.</a></li>
</ol>
<h3>My Fun Article</h3>
<p id="p1">You can target <i>this paragraph</i> using a
  URL fragment. Click on the link above to try out!</p>
<p id="p2">This is <i>another paragraph</i>, also accessible
  from the links above. Isn't that delightful?</p>
```

```css
p:target {
  background-color: gold;
}

/* 在目标元素中增加一个伪元素*/
p:target::before {
  font: 70% sans-serif;
  content: "►";
  color: limegreen;
  margin-right: .25em;
}

/*在目标元素中使用italic样式*/
p:target i {
  color: red;
}
```

## outline和border

outline不占页面空间，不会影响元素尺寸和位置，不能像border一样只设置某一边。

## attr()

https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr()

**注意:** `attr()` 理论上能用于所有的CSS属性但目前支持的仅有伪元素的 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性，其他的属性和高级特性目前是实验性的

CSS表达式 `attr()` 用来获取选择到的元素的某一HTML属性值，并用于其样式。它也可以用于伪元素，属性值采用伪元素所依附的元素。

```css
<p data-foo="hello">world</p>

p:before {
    content:attr(data-foo) " ";
}
```



## :nth-of-type :nth-child

`ele:nth-of-type(n)`表示在`ele`父元素下选择第n个`ele`元素

`ele:nth-child(n)`表示在`ele`父元素下第n个子元素

## inset

The **`inset`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) property is a shorthand that corresponds to the [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/top), [`right`](https://developer.mozilla.org/en-US/docs/Web/CSS/right), [`bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom), and/or [`left`](https://developer.mozilla.org/en-US/docs/Web/CSS/left) properties. It has the same multi-value syntax of the [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) shorthand.

```
/* <length> values */
inset: 10px; /* value applied to all edges */
inset: 4px 8px; /* top/bottom left/right */
inset: 5px 15px 10px; /* top left/right bottom */
inset: 2.4em 3em 3em 3em; /* top right bottom left */
```



## pointer-events

`pointer-events`是一个用于 HTML 指针事件的属性，属性有很多值，但是对于浏览器来说，只有`auto`和`none`两个值可用，其它的几个是针对SVG的。

- auto——效果和没有定义pointer-events属性相同，鼠标不会穿透当前层。
- none——可以禁用 HTML 元素的 hover/focus/active 等动态效果，鼠标的动作将不能被该元素及其子元素所捕获，但是能够被其父元素所捕获。但是，当其后代元素的`pointer-events`属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。实际上默认就可以穿透当前层，因为pointer-events默认为auto

若HTML上两个元素之间没有包含关系，那么，鼠标事件就不会在这两个元素之间传递，通常情况上层的元素会覆盖下层的元素，导致下层元素捕获不到事件；此时将上层元素的 `pointer-events` 属性设置为 `none` ，则上层元素将不捕获事件，那么事件将被下层元素捕获到；

### 使用场景

+ 禁用 a 标签事件效果

在做 tab 切换的时候，当选中当前项，禁用当前标签的事件，只有切换其他 tab 的时候，才重新请求新的数据。

 ```html
   <!--CSS-->
   <style>
       .active{
           pointer-events: none;
       }
   </style>
   <!--HTML-->
   <ul>
       <li><a class="tab"></a></li>
       <li><a class="tab active"></a></li>
       <li><a class="tab"></a></li>
   </ul>复制代码
 ```

+ 切换开/关按钮状态

点击提交按钮的时候，为了防止用户一直点击按钮，发送请求，当请求未返回结果之前，给按钮增加 pointer-events: none，可以防止这种情况，这种情况在业务中也十分常见。

```html
 <!--CSS-->
.j-pro{ pointer-events: none; }
<!--HTML-->
<button r-model={this.submit()} r-class={{"j-pro": flag}}>提交</button>
<!--JS-->
submit: function(){
　　this.data.flag = true;
　　this.$request(url, {
　　　　// ... onload: function(json){
　　　　　　　　if(json.retCode == 200){
　　　　　　　　　　this.data.flag = false;
　　　　　　　　} }.bind(this)
　　　　// ...
　　});
}
```

+ 防止透明元素和可点击元素重叠不能点击

一些内容的展示区域，为了实现一些好看的 css 效果，当元素上方有其他元素遮盖，为了不影响下方元素的事件，给被遮盖的元素增加 pointer-events: none; 可以解决。

## p元素嵌套

p标签虽然是块级元素，但不可包含其他块级元素。像p标签 <h1 ~ 6>标签 这几个块元素只可包含内联元素（行内元素）,  所以p标签无法嵌套p div ul标签

p标签在遇到下一个块级元素时就闭合，在浏览器中会被渲染为两倍数量的p元素

## pre标签

pre标签可定义预格式化的文本。被包围在 <pre> 标签 元素中的文本通常会**保留空格和换行符**。而文本也会呈现为等宽字体。

**提示:** <pre> 标签的一个常见应用就是用来表示计算机的源代码。

## 选择器优先级

| 选择器类别                         | 权重   |
| ---------------------------------- | ------ |
| 内联样式                           | 1000   |
| ID选择器                           | 100    |
| 类、伪类选择器；属性选择器         | 10     |
| 元素选择器；子代选择器；相邻选择器 | 0      |
| 继承的样式                         | 无权值 |

```
权重计算规则：
1、第一等：代表内联样式，如: style=””，权值为1000。
2、第二等：代表ID选择器，如：#content，权值为0100。
3、第三等：代表类，伪类和属性选择器，如.content，权值为0010。
4、第四等：代表类型选择器和伪元素选择器，如div p，权值为0001。
5、通配符、子选择器、相邻选择器等的。如*、>、+,权值为0000。
6、继承的样式没有权值。
后代、子代选择器权值相加
权值相同时，以后定义的选择器为主
选择器权值计算不会超过自己的最大数量级
```

## line-height

```
normal
```

取决于用户端。桌面浏览器（包括Firefox）使用默认值，约为`1.2`，这取决于元素的 `font-family`。

```
<数字>
```

该属性的应用值是这个无单位数字[`<数字>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number)乘以该元素的字体大小。计算值与指定值相同。大多数情况下，这是设置`line-height`的**推荐方法**，不会在继承时产生不确定的结果。

```
<长度>
```

指定[`<长度>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)用于计算 line box 的高度。参考[`<长度>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)了解可使用的单位。以 **em** 为单位的值可能会产生不确定的结果。

```
<百分比>
```

与元素自身的字体大小有关。计算值是给定的百分比值乘以元素计算出的字体大小。**百分比**值可能会带来不确定的结果。



## 水平垂直居中

仅居中元素定宽高适用

- absolute + 负margin
- absolute + margin auto
- absolute + calc

居中元素不定宽高

- absolute + transform
- lineheight
- css-table
- flex
- grid

1. absolute + 负margin 宽高确定，父容器`position:relative`，子元素`position:absolute`

```html
<body>
  <div class="box">珠峰培训</div>
</body>

// 宽高确定
<style>
    html,
    body {
      height: 100%;
      overflow: hidden;
    }

    .box {
      box-sizing: border-box;
      width: 100px;
      height: 50px;
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      border: 1px solid lightblue;
      background: lightcyan;
    }

    body {
      position: relative;
    }

    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -25px;
      margin-left: -50px;
    }
  </style>

```

2. absolute + margin auto 宽高必须有，子元素`top: 0;bottom: 0;left: 0;right: 0;margin: auto;`

```html
<body>
  <div class="box">珠峰培训</div>
</body>
<style>
    html,
    body {
      height: 100%;
      overflow: hidden;
    }

    .box {
      box-sizing: border-box;
      width: 100px;
      height: 50px;
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      border: 1px solid lightblue;
      background: lightcyan;
    }

    body {
      position: relative;
    }

    .box {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  </style>
```

3. absolute + calc

```html
<body>
  <div class="box">珠峰培训</div>
</body>
// 宽高确定
<style>
    html,
    body {
      height: 100%;
      overflow: hidden;
    }

    .box {
      box-sizing: border-box;
      width: 100px;
      height: 50px;
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      border: 1px solid lightblue;
      background: lightcyan;
    }

    body {
      position: relative;
    }

    .box {
      position: absolute;
      top: calc(50% - 50px);
    	left: calc(50% - 25px);
    }
  </style>
```

4. absolute + transform无视宽高

```html
<body>
  <div class="box">珠峰培训</div>
</body>
<style>
    html,
    body {
      height: 100%;
      overflow: hidden;
    }

    .box {
      box-sizing: border-box;
      /* width: 100px; */
      /* height: 50px; */
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      border: 1px solid lightblue;
      background: lightcyan;
    }

    body {
      position: relative;
    }

    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  </style>
```

5. lineheight 

把box设置为行内元素，通过`text-align`就可以做到水平居中，通过`vertical-align`在垂直方向做到居中，代码如下

```html
<div class="wp">
    <div class="box">123123</div>
</div>
<style>
.wp {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.box {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left; /* 修正文字 */
}
</style>
```

6. css-table

```html
<style>
.wp {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.box {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left; /* 修正文字 */
}
</style><div class="wp">
    <div class="box">123123</div>
</div>
<style>
.wp {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.box {
    display: inline-block;
}
</style>
```

7. flex

```html
<div class="wp">
    <div class="box">123123</div>
</div>
<style>
.wp {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
```

8. grid



## 容器宽高等比例

> 原理: padding的百分比计算是根据父元素的宽度来计算。

内容写在`.child::after`伪类元素中

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .parent{
      height: 100px;
      width: 100px;
      background-color: lightseagreen;
    }
    .child{
      height: 0;
      /* 高度为宽度的50% */
      padding-bottom: 50%;
      position: relative;
    }
    .child::before{
      display: block;
      content: '宽高2:1';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: red;
    }
  </style>
</head>
<body>
  <div class="parent">
    <div class="child"></div>
  </div>
</body>
</html>
```

## display、visibility、opacity的区别

| **比较**           | **display:none** | **opacity:0**                                        | **visibility:hidden**                                     |
| ------------------ | ---------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| **占据空间**       | **否**           | **是**                                               | **是**                                                    |
| **回流与渲染**     | **是**           | **否**                                               | **否**                                                    |
| **子代继承性**     | **不继承**       | **继承，并且子元素 不能通过 opacity: 1; 来取消隐藏** | **继承子元素可以通过设置 visibility: visible;来取消隐藏** |
| **子代反继承**     | **否**           | **否**                                               | **能**                                                    |
| **transition效果** | **无效**         | **有效**                                             | **hidden有效，visible立即显示**                           |
| **绑定的事件**     | **不响应**       | **能响应**                                           | **不响应**                                                |

**继承性和反继承性**

所谓继承，都是指子代继承父代的东西。反继承就是子代设置自己的属性变得和父代不一样。

很多时候，我们要让一个元素保留位置的同时不触发绑定在这个元素上的事件，此时要结合visibility、opacity、transition一起用才能实现这样的效果。（不得不说opacity和visibility结合了使用，使得同一个元素产生淡进淡出的效果很好用）。如下：

```css
div{
    visibility:hidden;
    opacity:0;
    transition:all .5s;
}
div:hover{
    visibility:visible;
    opacity:1;
}
```



## BFC

当CSS的 **position** 属性为 **static** 或 **relative**，并且 **float** 为 **none** 时，其布局方式为普通流。

独立渲染区域

创建BFC的方式：

1. float不为none（float默认为none）
2. position值为absoluted、fixed（没有relative、static）
3. display值为inline-block、table-cell、flex、flow-root
4. overflow值为hidden、auto、scroll（除了visible？）

能解决什么问题：

1. 边距重叠
2. 边距溢出、盒子塌陷
3. 清除浮动
4. 浮动环绕文字（现象的原因是文本信息不会被浮动元素所覆盖）

## fit-content

fit-content的效果和inline-block、absolute的效果类似，都能实现尺寸收缩效果

fit-content的使用时机：

1. 想保持display、position实现尺寸收缩
2. 让元素有一个确定的width、height

关于(2)的详细描述：

水平垂直居中的代码如下

```css
.center{
  position:absolute;
  left:50%;
  right:50%;
  transform:translate(-50%,-50%);
}

```

如果对上述代码的transform还有其它动画效果则会干扰transform的值

```css
.center{
  position:absolute;
  left:50%;
  right:50%;
  transform:translate(-50%,-50%);
  animation: oo 3s;
}
@keyframes oo {
	from {
		transform: translateY(20px)
	}
	to {
		transform: translateY(0px);
	}
}

```

解决：

```css
.center{
  position:absolute;
  width:fit-content;
  height:fit-content;
  inset:0;
}

```

fit-content也能用来更好的处理水平居中：（via[理解CSS3 max/min-content及fit-content等width值 « 张鑫旭-鑫空间-鑫生活 (zhangxinxu.com)](https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/?shrink=1)）

```css
.box {
    background-color: #f0f3f9;
    padding: 10px;
    /* 这里左右方向是auto */
    margin: 10px auto 20px;
    overflow: hidden;
}

.inline-block {
    display: inline-block;
}
.fit-content {
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;    
}
```

```html
<strong>display:inline-block;</strong>
<div class="box inline-block">
    <img src="mm1.jpg">
    <p>display:inline-block居中要靠父元素，而width:fit-content直接margin:auto.</p>
</div>

<strong>width: fit-content;</strong>
<div class="box fit-content">
    <img src="mm1.jpg">
    <p>display:inline-block居中要靠父元素，而width:fit-content直接margin:auto.</p>
</div>
```

## em和rem

em，相对单位，这个单位表示元素的 [`font-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size) 的计算值。如果用在[`font-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size) 属性本身，它则表示元素*继承*的 `font-size` 值。em不仅可以用作font-size的计算值，也可用于width等。

```css
 /* em的用法1：自己元素设置font-size的值来当作em的参照值 */
.div-em{
    font-size: 32px;  // 1em = 32px
    width: 10em;      // 10em = 10 x 32 = 320px
    height: 10em;     // 10em = 10 x 32 = 320px
    background-color: aquamarine;
}

 /* em的用法2：自己元素不设置，而父级元素设置font-size的值来当作em的参照值 */
.div-em-father{
    font-size: 64px;  // 1em = 64px
}

.div-em-child{
    width: 10em;     // 10em = 10 x 64 = 640px
    height: 10em;    // 10em = 10 x 64 = 640px
    background-color: cadetblue;
}
```

rem，相对单位，这个单位代表根元素（通常为<html> 元素）的 font-size 大小。当用在根元素的 font-size 上面时，它代表了它的初始值。

```css
/* rem的用法 */
html{
    font-size:16px;  // 1rem = 16px
}

.div-rem{
    width: 10rem;    // 10rem = 10 x 16 = 160px
    height: 10rem;   // 10rem = 10 x 16 = 160px
    font-size: 1rem; // 1rem = 16px
    background-color: #a58778;
}
```

```css
html{
  font-size: 2rem; // 2*16=32px
}
.d1{
  font-size: 2rem; // 2*32=64px
}
```
