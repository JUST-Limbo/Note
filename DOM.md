## Element.getBoundingClientRect

`**Element.getBoundingClientRect()**` 方法返回元素的大小及其相对于视口的位置。

如果是标准盒子模型，元素的尺寸等于`width/height` + `padding` + `border-width`的总和。如果`box-sizing: border-box`，元素的的尺寸等于 `width/height`。

```js
domRect = element.getBoundingClientRect();
```

返回的结果是包含完整元素的最小矩形，并且拥有`left`, `top`, `right`, `bottom`, `x`, `y`, `width`, 和 `height`这几个以像素为单位的只读属性用于描述整个边框。除了`width` 和 `height` 以外的属性是相对于视图窗口的左上角来计算的。

![DOMRect 示例图](DOM.assets/rect.png)

## 位置属性

### clientHeight

元素可视区域高度

只读，对于没有定义CSS或者**内联布局盒子**的元素为0，否则，它是元素内部的高度(单位像素)，包含内边距，**但不包括水平滚动条、边框和外边距**。

`clientHeight` 可以通过 CSS `height` + CSS `padding` - 水平滚动条高度 (如果存在)来计算.

> **备注:** 此属性会将获取的值四舍五入取整数。 如果你需要小数结果, 请使用 [`element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect).
>
> 备注：上面的有问题 因为使用element.getBoundingClientRect()只能获取元素的width / height，但是这个值是 offsetWidth / offsetHeight ，包括边框的长度，所以不能获取clientWidth / clientHeight

**语法**

```
var h = element.clientHeight;
```

返回整数 `h`，表示 `element` 的 `clientHeight`（单位像素）。

![Image:Dimensions-client.png](imgs/=Dimensions-client.png)

### clientWidth

元素可视区域宽度

内联元素以及没有 CSS 样式的元素的 `**clientWidth**` 属性值为 0。`**Element.clientWidth**` 属性表示元素的内部宽度，以像素计。该属性包括内边距 padding，但不包括边框 border、外边距 margin 和垂直滚动条（如果有的话）。

> 该属性值会被四舍五入为一个整数。如果你需要一个小数值，可使用 [`element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。

**语法**

```
var intElemClientWidth = element.clientWidth;
```

### offsetHeight

元素可视高度

只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个**整数**。

通常，元素的offsetHeight是一种元素CSS高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before或:after等伪类元素的高度。

如果元素被隐藏（例如 元素或者元素的祖先之一的元素的style.display被设置为none），则返回0

> 这个属性值会被四舍五入为整数值，如果你需要一个浮点数值，请用 [`element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect).

**语法**

```
var intElemOffsetHeight = document.getElementById(id_attribute_value).offsetHeight;
```

### offsetWidth

元素可视宽度

只读属性，返回一个元素的布局宽度。一个典型的offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。

### scrollHeight

这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。

`scrollHeight `的值等于该元素在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度。 没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值[`clientHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight)相同。包括元素的padding，但不包括元素的border和margin。scrollHeight也包括 [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) 和 [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)这样的伪元素。

> 属性将会对值四舍五入取整。如果需要小数值，使用[`Element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect).

### offsetTop

**`HTMLElement.offsetTop`** 为只读属性，它返回当前元素相对于其 [`offsetParent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 元素的顶部内边距的距离。

### offsetLeft

 **`HTMLElement.offsetLeft`** 是一个只读属性，返回当前元素*左上角*相对于  [`HTMLElement.offsetParent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 节点的左边界偏移的像素值。

> **`HTMLElement.offsetParent`** 主要是一个定位元素（开启定位的父元素内边框，如果没有就按照`body`作为标准来计算），即`position`属性值不为`static`
>
> **`HTMLElement.offsetParent`** 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的**定位元素**或者最近的 `table,``td,``th,``body`元素。当元素的 `style.display` 设置为 "none" 时，`offsetParent` 返回 `null`。

> 一、offsetTop 返回的是数字，而 style.top 返回的是字符串，除了数字外还带有单位：px。
>
> 二、offsetTop 只读，而 style.top 可读写。
>
> 三、如果没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串。

### scrollWidth

这个只读属性是元素内容宽度的一种度量，包括由于overflow溢出而在屏幕上不可见的内容。

`scrollWidth`值等于元素在不使用水平滚动条的情况下适合视口中的所有内容所需的最小宽度。 宽度的测量方式与[`clientWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth)相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条（如果存在）。 它还可以包括伪元素的宽度，例如[`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)或[`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)。 如果元素的内容可以适合而不需要水平滚动条，则其`scrollWidth`等于[`clientWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth)

### scrollTop

`**Element.scrollTop**` 属性可以**获取**或**设置**一个元素的内容垂直滚动的像素数。

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

### scrollLeft

**`Element.scrollLeft`** 属性可以读取或设置元素滚动条到元素左边的距离。


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

**`Node.appendChild()`** 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 `appendChild()` 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

这意味着，一个节点不可能同时出现在文档的不同位置。所以，如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。若要保留已在文档中的节点，可以先使用 [`Node.cloneNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) 方法来为它创建一个副本，再将副本附加到目标父节点下。请注意，用 `cloneNode` 制作的副本不会自动保持同步。
