## Element.getBoundingClientRect

`Element.getBoundingClientRect()` 方法返回元素的大小及其相对于视口的位置。

如果是标准盒子模型，元素的尺寸等于`width/height` + `padding` + `border-width`的总和。如果`box-sizing: border-box`，元素的的尺寸等于 `width/height`。

```js
domRect = element.getBoundingClientRect();
```

返回的结果是包含完整元素的最小矩形，并且拥有`left`, `top`, `right`, `bottom`, `x`, `y`, `width`, 和 `height`这几个以像素为单位的只读属性用于描述整个边框。除了`width` 和 `height` 以外的属性是相对于视图窗口的左上角来计算的。

![DOMRect 示例图](assets/DOM.assets/rect.png)

## 位置属性

### clientHeight clientWidth

元素可视区域高度，元素可视区域宽度，此属性会将获取的值四舍五入取整数。

宽高包括内边距 padding，但不包括边框 border、外边距 margin 和滚动条。

border在布局上会在外部包裹滚动条，滚动条的内容将以内边距的形式布局（然而实际的padding值为0）。

> `clientHeight` 可以通过 CSS `height` + CSS `padding` - 水平滚动条高度 (如果存在)来计算.
>
> css height = content height +  padding，其中padding包含scroll bar height

使用element.getBoundingClientRect()只能获取元素的width / height，但是这个值是 offsetWidth / offsetHeight，不能获取clientWidth / clientHeight

```
var h = element.clientHeight;
var intElemClientWidth = element.clientWidth;
```

![Image:Dimensions-client.png](imgs/=Dimensions-client.png)

### offsetHeight offsetWidth

元素可视高度，元素可视宽度

只读属性，它返回该元素的像素宽高，高度包含元素的内边距和边框，且是一个**整数**。

> 这个属性值会被四舍五入为整数值，如果你需要一个浮点数值，请用 [`element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect).

```
var intElemOffsetHeight = document.getElementById(id_attribute_value).offsetHeight;
```

只读属性，返回一个元素的布局宽度。一个典型的offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。

### offsetTop offsetLeft

**`HTMLElement.offsetTop`** 只读属性，返回当前元素相对于其 [`offsetParent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 元素的顶部内边距的距离。

 **`HTMLElement.offsetLeft`** 只读属性，返回当前元素*左上角*相对于  [`offsetParent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 节点的左边界偏移的像素值。

> **`HTMLElement.offsetParent`** 主要是一个定位元素（开启定位的父元素内边框，如果没有就按照`body`作为标准来计算），即`position`属性值不为`static`
>
> **`HTMLElement.offsetParent`** 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的**定位元素**或者最近的 `table,``td,``th,``body`元素。当元素的 `style.display` 设置为 "none" 时，`offsetParent` 返回 `null`。

> 一、offsetTop 返回的是数字，而 style.top 返回的是字符串，除了数字外还带有单位：px。
>
> 二、offsetTop 只读，而 style.top 可读写。
>
> 三、如果没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串。

### scrollHeight scrollWidth

只读属性，是一个元素内容高度的度量，包括由于overflow溢出而在屏幕上不可见的内容。

`scrollHeight `的值等于该元素在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度。 没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值[`clientHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight)相同。包括元素的padding，但不包括元素的border和margin。scrollHeight也包括 [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) 和 [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)这样的伪元素。

`scrollWidth`值等于元素在不使用水平滚动条的情况下适合视口中的所有内容所需的最小宽度。 宽度的测量方式与[`clientWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth)相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条（如果存在）。 它还可以包括伪元素的宽度，例如[`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)或[`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)。 如果元素的内容可以适合而不需要水平滚动条，则其`scrollWidth`等于[`clientWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth)

> 属性将会对值四舍五入取整。如果需要小数值，使用[`Element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect).

### scrollTop scrollLeft

`Element.scrollTop` 属性可以**获取**或**设置**一个元素的内容垂直滚动的像素数。

**`Element.scrollLeft`** 属性可以读取或设置元素滚动条到元素左边的距离。

一个元素的 `scrollTop` 值是这个元素的**`内容顶部`**（卷起来的）到它的视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 `scrollTop` 值为`0`。

**语法**

```
// 获得滚动的像素数
var  intElemScrollTop = someElement.scrollTop;
```

`scrollTop` **可以被设置**为任何整数值，同时注意：

- 如果一个元素不能被滚动（例如，它没有溢出，或者这个元素有一个"**non-scrollable"**属性）， `scrollTop`将被设置为`0`。
- 设置`scrollTop`的值小于0，`scrollTop` 被设为`0`
- 如果设置了超出这个容器可滚动的值, `scrollTop` 会被设为最大值。


## 判断页面是否滚动到底部

```js
const scrollTop=document.body.scrollTop
const scrollHeight=document.body.scrollHeight
const clientHeight=document.body.clientHeight
if(scrollTop+clientHeight +50 >=scrollHeight){
  console.log('reach bottom')
}
```

## contextmenu

打开上下文菜单触发该事件，通常为鼠标右键点击触发。

如果想要实现右击鼠标不打开默认的浏览器菜单，可以通过`preventDefault()`取消默认行为实现。

监听鼠标右键的另一个方法：

```js
document.onmousedown = function(event) {
	if (event.button == 2) {
    	//鼠标右键
    }
}
```

## Node.appendChild

[Node.appendChild - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)

**`Node.appendChild()`** 方法将一个节点附加到指定父节点的子节点列表的末尾处。

**如果将被插入的节点已经存在于当前文档的文档树中，那么 `appendChild()` 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。**

这意味着，一个节点不可能同时出现在文档的不同位置。所以，如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。若要保留已在文档中的节点，可以先使用 [`Node.cloneNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) 方法来为它创建一个副本，再将副本附加到目标父节点下。请注意，用 `cloneNode` 制作的副本不会自动保持同步。

## outerHTML

获取描述元素（包括其后代）的序列化 HTML 片段。

```js
// HTML:
/*
<div id="d">
    <p>Content</p>
    <p>Further Elaborated</p>
</div>
*/

const d = document.getElementById("d");
console.log(d.outerHTML);

/*
    字符串 '<div id="d"><p>Content</p><p>Further Elaborated</p></div>'
    被显示到控制台窗口
*/
```

## window.innerWidth

返回以像素为单位的窗口的内部宽度。**如果垂直滚动条存在，则这个属性将包括它的宽度**。

如果你需要获取除去滚动条和边框的窗口宽度，请使用根元素`document.documentElement` 的[`clientWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth) 属性。

## Element.clientWidth

在根元素（`<html>` 元素）或怪异模式下的 `<body>` 元素上使用 `clientWidth` 时，该属性将返回视口宽度（不包含任何滚动条）。
