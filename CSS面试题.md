# CSS面试题

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





