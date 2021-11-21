# DOM

## Element.getBoundingClientRect

`**Element.getBoundingClientRect()**` 方法返回元素的大小及其相对于视口的位置。

如果是标准盒子模型，元素的尺寸等于`width/height` + `padding` + `border-width`的总和。如果`box-sizing: border-box`，元素的的尺寸等于 `width/height`。

```js
domRect = element.getBoundingClientRect();
```

返回的结果是包含完整元素的最小矩形，并且拥有`left`, `top`, `right`, `bottom`, `x`, `y`, `width`, 和 `height`这几个以像素为单位的只读属性用于描述整个边框。除了`width` 和 `height` 以外的属性是相对于视图窗口的左上角来计算的。

![DOMRect 示例图](DOM.assets/rect.png)

