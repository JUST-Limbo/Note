## @mixin 与 @include

@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。

@include 指令可以将混入（mixin）引入到文档中。

以下实例创建一个名为 "important-text" 的混入：

```scss
@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}
.danger {
  @include important-text;
  background-color: green;
}
```

将以上代码转换为 CSS 代码，如下所示：

```css
.danger {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
  background-color: green;
}
```

传递变量

```scss
/* 混入接收两个参数 */
@mixin bordered($color, $width) {
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);  // 调用混入，并传递两个参数
}

.myNotes {
  @include bordered(red, 2px); // 调用混入，并传递两个参数
}
```

## @extend 与 继承

@extend 指令告诉 Sass 一个选择器的样式从另一选择器继承。

```scss
.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
  background-color: red;
}

.button-submit  {
  @extend .button-basic;
  background-color: green;
  color: white;
}
```

将以上代码转换为 CSS 代码

```css
.button-basic, .button-report, .button-submit {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  background-color: red;
}

.button-submit  {
  background-color: green;
  color: white;
}
```

## 占位符选择器

Sass 有一种特殊的选择器，称为“占位符”。它看起来和行为很像一个类选择器，但它以%开头，**并且不包含在 CSS 输出中。**

占位符选择器有什么用？它仍然能被继承的！与类选择器不同，在占位符没有被@extend，没有被库用户为 HTML 使用特定的类名，他们就不会把CSS弄得杂乱无章。

```scss
%toolbelt {
  box-sizing: border-box;
  border-top: 1px rgba(#000, .12) solid;
  padding: 16px 0;
  width: 100%;

  &:hover { border: 2px rgba(#000, .5) solid; }
}

.action-buttons {
  @extend %toolbelt;
  color: #4285f4;
}

.reset-buttons {
  @extend %toolbelt;
  color: #cddc39;
}
```

```css
.action-buttons, .reset-buttons {
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 16px 0;
  width: 100%;
}
.action-buttons:hover, .reset-buttons:hover {
  border: 2px rgba(0, 0, 0, 0.5) solid;
}

.action-buttons {
  color: #4285f4;
}

.reset-buttons {
  color: #cddc39;
}
```

