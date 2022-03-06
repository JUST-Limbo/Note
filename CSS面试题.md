# CSS面试题

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

