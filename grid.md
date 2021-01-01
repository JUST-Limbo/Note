#  Grid-Layout



Grid 布局的属性分成两类。一类定义在容器上面，称为**容器属性**；另一类定义在项目上面，称为**项目属性**。

## 容器属性

### display属性

`display: grid`指定一个容器采用网格布局。

默认情况下，容器元素都是块级元素，但也可以设成行内元素。

```css
div {
  display: inline-grid;
}
```

上面代码指定`div`是一个行内元素，该元素内部采用网格布局。



### grid-template-columns 

### grid-template-rows

容器指定了网格布局以后，接着就要划分行和列。`grid-template-columns`属性定义每一列的列宽，`grid-template-rows`属性定义每一行的行高。