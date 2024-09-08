## @import

能够导入 Sass 和 CSS 样式表

@import使所有变量、mixin 和函数都可以全局访问。

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}
// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}
// style.scss
@import 'foundation/code', 'foundation/lists';
```

```css
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

当 Sass 导入一个文件时，该文件被评估，就像其内容直接出现在@import的位置一样。导入文件中的任何mixin、函数和变量都是可用的，它的所有CSS都包含在@import的编写位置。此外，在@import之前定义的任何混合、函数或变量（包括来自其他@import的）都可以在导入的样式表中使用。

如果多次导入同一个样式表，它们将被多次编译为 CSS 。

> 导入的路径无需写明文件格式后缀。
>
> It wouldn’t be any fun to write out absolute URLs for every stylesheet you import, so Sass’s algorithm for finding a file to import makes it a little easier. For starters, you don’t have to explicitly write out the extension of the file you want to import; `@import "variables"` will automatically load `variables.scss`, `variables.sass`, or `variables.css`.

**Partials**

以下划线开头的文件，将不会生成独立的css文件。

不以下划线开头的文件，将会生成独立的css文件。

可以在导入部分时省略`_`。

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}
// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}
// foundation/_index.scss
@import 'code', 'lists';
// style.scss
@import 'foundation';
```

**嵌套**

导入通常写在样式表的顶层，也可以嵌套在样式规则或纯 CSS 规则中。

```scss
// _theme.scss
pre, code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
// style.scss
.theme-sample {
  @import "theme";
}
```

```css
.theme-sample pre, .theme-sample code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
```

**在scss文件中导入css文件**

除了导入*.sass*和*.scss*文件，Sass 还可以导入普通的*.css*文件。唯一的规则是导入不能显式包含*.css*扩展名，因为那是用来表示@import的纯 CSS。

```css
// code.css
code {
  padding: .25em;
  line-height: 0;
}
```

```scss
// style.scss
@import 'code';
```

```css
code {
  padding: .25em;
  line-height: 0;
}
```

**导入纯CSS**（没看懂）

因为在 CSS 中，也定义有@import，所以 Sass 需要一种@import编译纯 CSS 的方法，而不是在编译时尝试导入文件。为了实现这一点，并确保 SCSS 尽可能多地成为 CSS 的超集，Sass 会将@import具有以下特征的，编译为纯 CSS 导入：

- 导入 URL 以`.css`结尾。
- 导入 URL 开始的位置是`http://`或`https://`。
- 导入 URL 写为`url()`。
- 具有媒体查询的导入。

```scss
@import "theme.css";
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import "landscape" screen and (orientation: landscape);
@import url(theme);
```

```css
@import url(theme.css);
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import "landscape" screen and (orientation: landscape);
@import url(theme);
```





## @use

@use支持缓存导入的文件，将导入的文件当成一个模块，后面即使重复导入，也不会合入多次，而是只合入一次。

@use支持导入scss文件和css文件

使用@use加载的成员（变量、函数和混合），**仅在加载它们的样式表中可见**。

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}
// style.scss
@use 'foundation/code';
```

转css

```css
code {
  padding: .25em;
  line-height: 0;
}
```

**命名空间**

默认情况下，模块的命名空间只是其 URL 的最后一个组成部分，没有文件扩展名。

```scss
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}
// style.scss
@use "src/corners";

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

转css

```css
.button {
  border-radius: 3px;
  padding: 8px;
}
```

**自定义命名空间**

```scss
@use "<url>" as <namespace>
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}
// style.scss
@use "src/corners" as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

**私有成员**

如果不想定义的某些成员被模块外使用，可以通过以-或开头_的名称定义私有成员。

```scss
// src/_corners.scss
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}
// style.scss
@use "src/corners";

.button {
  @include corners.rounded;

  // This is an error! $-radius isn't visible outside of `_corners.scss`.
  padding: 5px + corners.$-radius;
}
```

**可配置默认值**

模块中使用`!default`标记变量，以使其可配置。使用`@use <url> with `加载`<variable>:<value>,<variable>:<value>`样式，配置的值将覆盖变量的默认值。

```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

```css
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```

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
@mixin bordered($color, $width:10px) { // 支持默认值语法
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);  // 调用混入，并传递两个参数
}

.myNotes {
  @include bordered(red, 2px);
}
// 通过名称传递参数
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}
```

## **内容块@content**

```scss
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

```css
.button {
  border: 1px solid black;
}
.button:not([disabled]):hover {
  border-width: 2px;
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

占位符选择器能被继承，与类选择器不同，在占位符没有被@extend，没有被库用户为 HTML 使用特定的类名，他们就不会把CSS弄得杂乱无章。

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

## @debug

调试命令，在控制台中输出表达式的值

```scss
@mixin inset-divider-offset($offset, $padding) {
  $divider-offset: (2 * $padding) + $offset;
  @debug "divider offset: #{$divider-offset}";

  margin-left: $divider-offset;
  width: calc(100% - #{$divider-offset});
}
```

```she
xxx/background.scss:8 DEBUG: divider offset: 5px
```

## @at-root

其中的所有内容都在文档的根部发出，而不是使用正常的嵌套。

```scss
@at-root<selector>{...}
```

## @function

```scss
 @function double($n){
     @return $n*2
 }
 .content {
     width: double(100px);
     height: 30px * 3;
     border: 1px solid red;
 }
```

## map-get

map-get($map,$key) 函数的作用是根据 $key 参数，返回 $key 在 $map 中对应的 value 值。如果 $key 不存在 $map中，将返回 null 值。

```scss
$social-colors: ( dribble: #ea4c89, facebook: #3b5998, github: #171515, google: #db4437, twitter: #55acee );
.btn-dribble{ color: map-get($social-colors,facebook); } 
```

## @each

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

You can also use `@each` to iterate over every key/value pair in a map by writing it `@each <variable>, <variable> in <expression> { ... }`. The key is assigned to the first variable name, and the element is assigned to the second.

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```
