# CSS

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



## :nth-of-type





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
