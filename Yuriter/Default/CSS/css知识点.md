# css知识点

## clip(裁剪)属性

元素设置绝对定位后，元素矩形截取`clip:rect(A, B, C, D);`
![clip-rect]($resource/clip-rect.png)

## CSS3 filter(滤镜)属性

```css
/* 修改所有图片的颜色为黑白 (100% 灰度): */
img {
  -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  filter: grayscale(100%);
}
```
