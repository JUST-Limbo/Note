## css 引入方式 link 和 @import 的区别

link是html标签，@import是CSS中的一种规则，必须写在样式表文件的顶部。

link标签除了加载css 还可以加载其他内容，比如RSS，ico图标等。@import只能加载css

link标签支持并行下载，可以同时下载多个CSS文件，加快页面加载速度。@import逐个加载

link引入样式可以在页面加载时加载。@import引入样式必须等页面加载完成再加载

## 宽高等比例布局

### 百分比padding

百分比padding值都是相对于宽度进行计算

```css
div { padding: 50%; }
```

或者：

```css
div { padding: 100% 0 0; }
```

或者：

```css
div { padding-bottom: 100%; }
```

都表示宽高为1:1的正方形

### aspect-ratio

[ˈæspekt] [ˈreɪʃiəʊ]

```css
aspect-ratio: 1 / 1;  // 宽/高
```

首选纵横比为指定的 `width` / `height` 比率。如果省略 `height` 和前面的斜杠字符，则 `height` 默认为 `1`。

### cqw

```css
.box {
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    container-type: inline-size;
}
.box img {
    width: calc(25cqw - 1.5rem / 4);
    height: calc(25cqw - 1.5rem / 4);
    object-fit: cover;
}
```

资料地址

[CSS高宽不等图片固定比例布局的三重进化 « 张鑫旭-鑫空间-鑫生活 (zhangxinxu.com)](https://www.zhangxinxu.com/wordpress/2023/07/css-image-aspect-ratio-layout/)