## css 引入方式 link 和 @import 的区别

link是html标签，@import是CSS中的一种规则，必须写在样式表文件的顶部。

link标签除了加载css 还可以加载其他内容，比如RSS，ico图标等。@import只能加载css

link标签支持并行下载，可以同时下载多个CSS文件，加快页面加载速度。@import逐个加载

link引入样式可以在页面加载时加载。@import引入样式必须等页面加载完成再加载