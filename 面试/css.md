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

## 响应式布局尺寸

响应式布局一般可以分为以下几个常见的屏幕尺寸范围： 

记住：768 992 1200三个分割尺寸

1. 小屏幕设备 (移动设备):
   - 窄屏手机（非常小的屏幕）：小于 576px
   - 手机（小型到中型屏幕）：576px - 767px
2. 中屏幕设备 (平板电脑和小型笔记本电脑):
   - 平板电脑（普通和大屏幕）：768px - 991px
3. 大屏幕设备 (桌面电脑):
   - 桌面显示器（小到中型屏幕）：992px - 1199px
4. 极大屏幕设备 (大型桌面显示器和电视):
   - 大型桌面显示器和电视（大屏幕）：1200px 及以上