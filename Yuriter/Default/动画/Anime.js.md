# 一、简介

anime.js 是一款功能强大的Javascript 动画库插件。anime.js 可以和CSS3 属性，SVG，DOM 元素和JS 对象一起工作，制作出各种高性能，平滑过渡的动画效果。

# 二、安装与使用

## 安装

```html
<!-- html中，下载压缩的js -->
<script type="text/javascript" src="js/anime.min.js"></script>
```

```javascript
// vue中
// npm安装
npm i animejs

// 引入
import anime from 'animejs/lib/anime.js'
```

## 使用

```javascript
var myAnimation = anime({
  targets: '.blue',
  translateX: 250,
  easing: 'easeInOutQuad',
  loop: true,
  duration: 3000
});
```

# 三、常用配置参数介绍

| 参数      | 意义      |  默认值  | 其他 |
| --------- | -------- | ----- | -- |
| targets | 设置动画的DOM元素 | 无 | 必填 |
| delay | 延迟 | 0 | 取值为number，或function(el, index, total)，单位毫秒 |
| duration | 持续时间 | 1000 | number，或function(el, index, total)，单位毫秒 |
| autoplay | 自动播放 | true | boolean |
| loop | 循环播放 | false | number，boolean |
| direction | 播放顺序 | "normal" | "normal"，"reverse"，"alternate" |
| easing | 时间曲线 | "easeOutElastic" | "linear"，多而不列 |
| begin | 动画开始 | undefined | 动画开始时执行 |
| update | 每次变化 | undefined | 每次变化时执行 |
| complete | 动画结束 | undefined | 动画结束时执行 |

# 四、详解

## 动画的目标对象（targets）

### 1. CSS选择器

```javascript
anime({
  targets: '.css-selector .el',
  translateX: 250
});
```

### 2. DOM元素/元素集合

```javascript
anime({
  targets: document.getElementById('demo');
  translateX: 250
});
```

### 3. JS对象

```javascript
var logEl = document.querySelector('.battery-log');

var battery = {
  charged: '0%',
  cycles: 120
}

anime({
  targets: battery,
  charged: '100%',
  cycles: 130,
  round: 1,
  easing: 'linear',
  update: function() {
    logEl.innerHTML = JSON.stringify(battery);
  }
});
```

### 4. 数组

```javascript
var el = document.querySelector('.mixed-array-demo .el-01');
var obj = {num: 1};

anime({
  targets: [el, '.mixed-array-demo .el-02', obj], // 支持混搭
  translateX: 250
});
```

## 可动画的目标属性

### 1. CSS属性

大部分的CSS属性都会导致布局更改或重新绘制，并会导致动画不稳定。因此尽可能优先考虑opacity和CSS transform。

```javascript
anime({
  targets: '.css-prop-demo .el',
  left: '240px',
  backgroundColor: '#FFF',
  borderRadius: ['0%', '50%'],
  easing: 'easeInOutQuad'
});
```

### 2. CSS3 transform属性

可以为每个变换属性指定不同的排序，具体可查看特殊属性部分。

```javascript
anime({
  targets: '.css-transforms-demo .el',
  translateX: 250,
  scale: 2,
  rotate: '1turn', // 旋转一圈
});
```

### 3. JS对象属性

包含数值的任何对象属性都可以设置动画。

```
var objPropLogEl = document.querySelector('.js-object-log');

var myObject = {
  prop1: 0,
  prop2: '0%'
}

anime({
  targets: myObject,
  prop1: 50,
  prop2: '100%',
  easing: 'linear',
  round: 1,
  update: function() {
    objPropLogEl.innerHTML = JSON.stringify(myObject);
  }
});
```

### 4. DOM属性

任何包含数值的DOM属性都可以设置动画。

```
anime({
  targets: '.dom-attribute-demo input', // 这是一个输入框
  value: [0, 1000], // input的value属性
  round: 1,
  easing: 'easeInOutExpo'
});
```

### 5. SVG属性

与任何其他DOM属性一样，包含至少一个数值的所有SVG属性都可以设置动画。

```javascript
anime({
  targets: ['.svg-attributes-demo polygon', 'feTurbulence', 'feDisplacementMap'],
  points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
  baseFrequency: 0,
  scale: 1,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutExpo'
});
```

## 动画基础参数

### 1. duration（持续时间）

定义动画的持续时间（以毫秒为单位）。

| 类型 | 默认值 | 示例 |
| --- | --- | --- |
| Number | `1000` | `3000` |
| anime.stagger | See staggering section | `anime.stagger(150)` |
| Function | See function based parameters section | `(el, i) => i * 150` |

### 2. delay（延迟）

定义动画的延迟（以毫秒为单位）

| 类型 | 默认值 | 示例 |
| --- | --- | --- |
| Number | `0` | `3000` |
| anime.stagger | See staggering section | `anime.stagger(150)` |
| Function | See function based parameters section | `(el, i) => i * 150` |

### 3. endDelay（末端延迟）

在动画结束时以毫秒为单位添加一些额外时间。

| 类型 | 默认值 | 示例 |
| --- | --- | --- |
| Number | `0` | `1000` |
| anime.stagger | See staggering section | `anime.stagger(150)` |
| Function | See function based parameters section | `(el, i) => i * 150` |

### 4. round（数字格式）

### 5. 特殊属性

使用Object作为值为动画的每个属性定义特定参数。
未在Object中指定的其他属性继承自主动画。

```javascript
anime({
  targets: '.specific-prop-params-demo .el',
  translateX: {
    value: 250,
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});
```

### 6. 函数返回数值

为动画的每个目标和属性设置不同的值。
function 接受三个参数:
| 参数 | 含义 |
| --- | --- |
| `target` | 当前动画目标元素 |
| `index` | 动画目标的索引 |
| `targetsLength` | 总动画目标数 |

```javascript
anime({
  targets: '.function-based-params-demo .el',
  translateX: 270,
  direction: 'alternate',
  loop: true,
  delay: function(el, i, l) {
    return i * 100;
  },
  endDelay: function(el, i, l) {
    return (l - i) * 100;
  }
});
```

## 动画赋值方式

### 1. 无单位数值

如果原始值具有单位，则他将自动添加到动画值中。

```javascript
anime({
  targets: '.unitless-values-demo .el',
  translateX: 250, // -> '250px'
  rotate: 540 // -> '540deg'
});
```

### 2. 有单位数值

强制动画使用某个单位并自动转换初始目标值。
转换精度可能因使用的单位而异。
你还可以使用数组直接定义动画的初始值，请参阅设定动画初始值部分。

```javascript
anime({
  targets: '.specific-unit-values-demo .el',
  width: '100%', // -> from '28px' to '100%',
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true
});
```

### 3. 相对数值

添加，减去或乘以原始值。
| 有效值 | 含义 | 示例 |
| --- | --- | --- |
| `'+='` | Add | `'+=100'` |
| `'-='` | Substract | `'-=2turn'` |
| `'*='` | Multiply | `'*=10'` |

```javascript
var relativeEl = document.querySelector('.el.relative-values');
relativeEl.style.transform = 'translateX(100px)';

anime({
  targets: '.el.relative-values',
  translateX: {
    value: '*=2.5', // 100px * 2.5 = '250px'
    duration: 1000
  },
  width: {
    value: '-=20px', // 28 - 20 = '8px'
    duration: 1800,
    easing: 'easeInOutSine'
  },
  rotate: {
    value: '+=2turn', // 0 * 2 = '2turn'
    duration: 1800,
    easing: 'easeInOutSine'
  },
  direction: 'alternate'
});
```

### 4. 颜色

不支持颜色的英文单词。
| 有效值 | 示例 |
| --- | --- |
| Haxadecimal | `'#FFF'` or `'#FFFFFF'` |
| RGB | `'rgb(255, 255, 255)'` |
| RGBA | `'rgba(255, 255, 255, .2)'` |
| HSL | `'hsl(0, 100%, 100%)'` |
| HSLA | `'hsla(0, 100%, 100%, .2)'` |

```javascript
var colorsExamples = anime.timeline({
  endDelay: 1000,
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true
})
.add({ targets: '.color-hex',  background: '#FFF' }, 0)
.add({ targets: '.color-rgb',  background: 'rgb(255,255,255)' }, 0)
.add({ targets: '.color-hsl',  background: 'hsl(0, 100%, 100%)' }, 0)
.add({ targets: '.color-rgba', background: 'rgba(255,255,255, .2)' }, 0)
.add({ targets: '.color-hsla', background: 'hsla(0, 100%, 100%, .2)' }, 0)
.add({ targets: '.colors-demo .el', translateX: 270 }, 0);
```

### 5. 设定动画的初始值

强制动画以指定值开始。
| 类型 | 示例 |
| --- | --- |
| `Array` | `['50%', '100%']` |

```javascript
anime({
  targets: '.el.from-to-values',
  translateX: [100, 250], // from 100 to 250
  delay: 500,
  direction: 'alternate',
  loop: true
});
```

### 6. 函数返回数值

为动画的每个目标和属性设置不同的值。
function 接受三个参数:
| 参数 | 含义 |
| --- | --- |
| `target` | 当前动画目标元素 |
| `index` | 动画目标的索引 |
| `targetsLength` | 总动画目标数 |

```javascript
anime({
  targets: '.function-based-values-demo .el',
  translateX: function(el) {
    return el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 50 + (-50 * i);
  },
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
  borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
  duration: function() { return anime.random(1200, 1800); },
  delay: function() { return anime.random(0, 400); },
  direction: 'alternate',
  loop: true
});
```

## 关键帧

### 1. 动画关键帧

动画关键帧是使用`keyframes`属性中的数组定义的。
如果关键帧内没有指定duration（持续时间），则每个关键帧的持续时间将等于动画总持续时间除以关键帧数。
| 类型 | 示例 |
| --- | --- |
| `Array` | `[ {value: 100, easing: 'easeOutExpo'}, {value: 200, delay: 500}, {value: 300, duration: 1000} ]` |

```javascript
anime({
  targets: '.animation-keyframes-demo .el',
  keyframes: [
    {translateY: -40},
    {translateX: 250},
    {translateY: 40},
    {translateX: 0},
    {translateY: 0}
  ],
  duration: 4000,
  easing: 'easeOutElastic(1, .8)',
  loop: true
});
```

### 2. 属性关键帧

与动画关键帧类似，属性关键帧是使用属性对象的Array定义的。 属性关键帧允许重叠动画，因为每个属性都有自己的关键帧数组。
如果关键帧内没有指定duration（持续时间），则每个关键帧的持续时间将等于动画总持续时间除以关键帧数。

| TYPE | EXAMPLE |
| --- | --- |
| `Array` | `[ {value: 100, easing: 'easeOutExpo'}, {value: 200, delay: 500}, {value: 300, duration: 1000} ]` |

```javascript
anime({
  targets: '.property-keyframes-demo .el',
  translateX: [
    { value: 250, duration: 1000, delay: 500 }, // 1
    { value: 0, duration: 1000, delay: 500 }, // 2
  ],
  translateY: [
    { value: -40, duration: 500 }, // 3
    { value: 40, duration: 500, delay: 1000 }, // 4
    { value: 0, duration: 500, delay: 1000 }, // 5
  ],
  scaleX: [
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' }, // 6
    { value: 1, duration: 900 }, // 7
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' }, // 8
    { value: 1, duration: 900 }, // 9
  ],
  scaleY: [
    { value: [1.75, 1], duration: 500 }, // 10
    { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' }, // 11
    { value: 1, duration: 450 }, // 12
    { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' }, // 13
    { value: 1, duration: 450 }, //14
  ],
  easing: 'easeOutElastic(1, .8)',
  loop: true
});
```

![Animejs关键帧顺序]($resource/Animejs%E5%85%B3%E9%94%AE%E5%B8%A7%E9%A1%BA%E5%BA%8F.jpg)

## 交错动画（stagger）

### 1. 基础交错动画

anime.stagger(value, options)
| 参数 | 类型 | 含义 | 是否必须 |
| --- | --- | --- | --- |
| Value | `Number`, `String`, `Array` | 操纵值 | Yes |
| Options | `Object` | 交错参数 | No |

```javascript
anime({
  targets: '.basic-staggering-demo .el',
  translateX: 270,
  delay: anime.stagger(100) // 每个元素的延迟增加100毫秒。
});
```

### 2. 设定交错开始值

从特定值开始产生交错效果。
anime.stagger(value, {start: startValue})

```javascript
anime({
  targets: '.staggering-start-value-demo .el',
  translateX: 270,
  delay: anime.stagger(100, {start: 500}) // 延迟从500ms开始，然后每个元素增加100ms。
});
```

### 3. 设定交错范围值

在两个数字之间均匀分配值。
anime.stagger([startValue, endValue])

```javascript
anime({
  targets: '.range-value-staggering-demo .el',
  translateX: 270,
  rotate: anime.stagger([-360, 360]), // 旋转将在-360deg到360deg之间均匀分布在所有元素之间
  easing: 'easeInOutQuad'
});
```

### 4. 交错动画开始位置

从特定位置开始交错效果。
anime.stagger(value, {from: startingPosition})
| 可填 | 类型 | 含义 |
| --- | --- | --- |
| `'first'` (default) | `'string'` | 从第一个元素开始效果 |
| `'last'` | `'string'` | 从最后一个元素开始效果 |
| `'center'` | `'string'` | 从中心开始效果 |
| `index` | `number` | 从指定的索引启动效果 |

```javascript
anime({
  targets: '.staggering-from-demo .el',
  translateX: 270,
  delay: anime.stagger(100, {from: 'center'})
});
```

### 5. 交错动画方向

更改交错动画的顺序。
anime.stagger(value, {direction: 'reverse'})

| 可填 | 含义 |
| --- | --- |
| `'normal'` (default) | 正常交错方向，从第一个元素到最后一个元素。 |
| `'reverse'` | 倒退交错方向，从最后一个元素到第一个元素 |

```javascript
anime({
  targets: '.staggering-direction-demo .el',
  translateX: 270,
  delay: anime.stagger(100, {direction: 'reverse'})
});
```

### 6. 交错的时间曲线

使用easing函数设置交错值。
anime.stagger(value, {easing: 'easingName'})
easing的取值：默认时间曲线名车的字符串，或自定义函数

```javascript
anime({
  targets: '.staggering-easing-demo .el',
  translateX: 270,
  delay: anime.stagger(300, {easing: 'easeOutQuad'})
});
```

### 7. 网格交错

基于数组的交错值，以产生“波纹”效果。
anime.stagger(value, {grid: [rows, columns]})

```javascript
anime({
  targets: '.staggering-grid-demo .el',
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
});
```

### 8. 网格交错方向

定义网格交错的方向。
anime.stagger(value, {grid: [rows, columns], axis: 'x'})
axis：沿x/y轴

```
anime({
  targets: '.staggering-axis-grid-demo .el',
  translateX: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'x'}),
  translateY: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'y'}),
  rotateZ: anime.stagger([0, 90], {grid: [14, 5], from: 'center', axis: 'x'}),
  delay: anime.stagger(200, {grid: [14, 5], from: 'center'}),
  easing: 'easeInOutQuad'
});
```

## 时间轴

### 1. 基础时间轴

时间轴可让你将多个动画同步在一起。
默认情况下，添加到时间轴的每个动画都会在上一个动画结束时开始。

创建时间轴：

```javascript
var myTimeline = anime.timeline(parameters);
```

parameters：对象，可被时间轴上的动画继承的参数。

将动画添加到时间轴：

```javascript
myTimeline.add(parameters, offset);
```

| 参数 | 类型 | 含义 | 必填 |
| --- | --- | --- | --- |
| `parameters` | `Object` | 要添加到时间轴的子时间轴或动画 | Yes |
| `offset` | `String` or `Number` | 偏移量，即动画添加到时间轴的位置。可为绝对位置或相对位置。 | No |

```javascript
// 使用默认参数创建时间轴
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

// 增加子项
tl
.add({
  targets: '.basic-timeline-demo .el.square',
  translateX: 250,
})
.add({
  targets: '.basic-timeline-demo .el.circle',
  translateX: 250,
})
.add({
  targets: '.basic-timeline-demo .el.triangle',
  translateX: 250,
});
```

### 2. 时间轴偏移量（offset）

它定义动画在时间轴中的开始时间，如果未指定偏移，则动画将在上一个动画结束后开始。
偏移可以相对于最后一个动画，也可以相对于整个时间轴。

| 类型 | OFFSET | 示例 | 含义 |
| --- | --- | --- | --- |
| String | `'+='` | `'+=200'` | 相对位置：在上一个动画结束后200ms开始 |
| String | `'-='` | `'-=200'` | 相对位置：在上一个动画结束前200ms开始 |
| Number | `Number` | `100` | 绝对位置：无论时间轴的上一个动画何时结束，这个动画都在100毫秒处开始 |

```javascript
// 使用默认参数创建时间轴
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '.offsets-demo .el.square',
  translateX: 250,
})
.add({
  targets: '.offsets-demo .el.circle',
  translateX: 250,
}, '-=600') // 相对偏移量
.add({
  targets: '.offsets-demo .el.triangle',
  translateX: 250,
}, 0); // 绝对偏移量
```

### 3. 参数继承

父时间轴实例中设置的参数将由所有子项继承。
可被继承的参数`targets、duration、delay、endDelay、round`

```javascript
var tl = anime.timeline({
  targets: '.params-inheritance-demo .el',
  delay: function(el, i) { return i * 200 },
  duration: 500,
  easing: 'easeOutExpo',
  direction: 'alternate',
  loop: true
});

tl
.add({
  translateX: 250,
  // 当前动画轴覆盖主轴中的easing
  easing: 'spring',
})
.add({
  opacity: .5,
  scale: 2
})
.add({
  // 当前动画轴覆盖主轴中的targets
  targets: '.params-inheritance-demo .el.triangle',
  rotate: 180
})
.add({
  translateX: 0,
  scale: 1
});
```

## 动画控制

### 1. play/pause（暂停/播放）

播放暂停的动画，如果`autoplay` 参数设置为`false`，则启动动画。
`animation.play();`

暂停正在运行的动画。
`animation.pause();`

### 2. restart（重新开始）

从动画的初始值重新开始动画。
`animation.restart();`

### 3. reverse（反转方向）

反转动画的方向。
`animation.reverse();`

### 4. seek（瞬移）

跳转到特定时间（以毫秒为单位）。
`animation.seek(timeStamp);`
也可用于在滚动时控制动画。
`animation.seek((scrollPercent / 100) * animation.duration);`

### 5. 时间轴控制

时间轴控制与动画控制的方法一样。

```javascript
timeline.play();
timeline.pause();
timeline.restart();
timeline.seek(timeStamp);
```

```javascript
var controlsProgressEl = document.querySelector('.timeline-controls-demo .progress');

var tl = anime.timeline({
  direction: 'alternate',
  loop: true,
  duration: 500,
  easing: 'easeInOutSine',
  update: function(anim) {
    controlsProgressEl.value = tl.progress;
  }
});

tl
.add({
  targets: '.timeline-controls-demo .square.el',
  translateX: 270,
})
.add({
  targets: '.timeline-controls-demo .circle.el',
  translateX: 270,
}, '-=100')
.add({
  targets: '.timeline-controls-demo .triangle.el',
  translateX: 270,
}, '-=100');

document.querySelector('.timeline-controls-demo .play').onclick = tl.play;
document.querySelector('.timeline-controls-demo .pause').onclick = tl.pause;
document.querySelector('.timeline-controls-demo .restart').onclick = tl.restart;

controlsProgressEl.addEventListener('input', function() {
  tl.seek(tl.duration * (controlsProgressEl.value / 100));
});
```

## 回调函数/事件函数

### 1. update

动画开始播放后，每帧都会触发此回调。

```javascript
var updates = 0;

anime({
  targets: '.update-demo .el',
  translateX: 270,
  delay: 1000,
  direction: 'alternate',
  loop: 3,
  easing: 'easeInOutCirc',
  update: function(anim) { // anim，返回当前动画对象
    updates++;
    progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
    updateLogEl.value = 'updates : '+updates;
  }
});
```

### 2. begin/complete

当动画开始播放时，`begin()`回调被触发一次。
动画完成后，会触发一次`complete()`回调。
如果动画的持续时间为0，则`begin()`和`complete()`都会被调用。

### 3. loopBegin/looComplete

每次循环开始时都会触发一次`loopBegin()` 回调。
每次循环结束时，就会触发一次`loopComplete()`回调函数。

### 4. change

在动画的delay和endDelay之间的每个帧上触发此回调。

### 5. changeBegin/changeComplete

每次动画改变开始（delay结束）时都会触发`changeBegin()`回调
每次动画改变结束（endDelay开始）时都会触发`changeComplete()`回调

![animejs回调函数顺序]($resource/animejs%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E9%A1%BA%E5%BA%8F.png)

### 6.  promise

动画完成后，每个动画实例都会返回一个完成的promise。

```javascript
animation.finished.then(function() {
  // Do things...
});
```

**Promises are not suported in IE < 11.**

## 时间曲线

### 1. 匀速

不对动画应用任何缓动时间曲线。
对于opacity和colors过渡很有用。
`easing: 'linear'`

### 2. 不匀速

Availabe easings :
| IN | OUT | IN-OUT |  |
| --- | --- | --- | --- |
| `'easeInQuad'` | `'easeOutQuad'` | `'easeInOutQuad'` | 由快至慢 |
| `'easeInCubic'` | `'easeOutCubic'` | `'easeInOutCubic'` | 由快至慢，效果更强 |
| `'easeInQuart'` | `'easeOutQuart'` | `'easeInOutQuart'` | 由快至慢，效果更强 |
| `'easeInQuint'` | `'easeOutQuint'` | `'easeInOutQuint'` | 由快至慢，效果更强 |
| `'easeInSine'` | `'easeOutSine'` | `'easeInOutSine'` | 由快至慢，比Quad弱 |
| `'easeInExpo'` | `'easeOutExpo'` | `'easeInOutExpo'` | 突然减速，效果较强 |
| `'easeInCirc'` | `'easeOutCirc'` | `'easeInOutCirc'` | 突然减速，效果较弱 |
| `'easeInBack'` | `'easeOutBack'` | `'easeInOutBack'` | 冲出终点后返回 |

![时间曲线]($resource/%E6%97%B6%E9%97%B4%E6%9B%B2%E7%BA%BF.png)

### 3. 三次贝塞尔

使用自定义立方贝塞尔曲线`cubicBezier(x1, y1, x2, y2)`。
`easing: 'cubicBezier(.5, .05, .1, .3)'`
[Caesar](https://cubic-bezier.com/#.17,.67,.83,.67)贝塞尔曲线坐标生成器。

### 4. 弹簧（spring）

`easing: 'spring(mass, stiffness, damping, velocity)'`
弹簧动画的持续时间由弹簧参数定义。
不会考虑动画持续时间参数。
| 参数 | 默认 | MIN | MAX | 含义 |
| --- | --- | --- | --- | ---|
| Mass | `1` | `0` | `100` | 质量 |
| Stiffness | `100` | `0` | `100` | 弹性系数 |
| Damping | `10` | `0` | `100` | 阻尼系数 |
| Velocity | `0` | `0` | `100` | 初始速度 |

**Mass：**
 质量，影响图层运动时的弹簧惯性，质量越大，弹簧拉伸和压缩的幅度越大。
**Stiffness：**
刚度系数(劲度系数/弹性系数)，刚度系数越大，形变产生的力就越大，运动越快。
**Damping：**
阻尼系数，阻止弹簧伸缩的系数，阻尼系数越大，停止越快。
`easing: 'spring(1, 80, 10, 0)'`

### 5. 弹跳

`easing: 'easeOutElastic(amplitude, period)'`
| IN | OUT | IN-OUT |
| --- | --- | --- |
| `'inElastic'` | `'outElastic'` | `'inOutElastic'` |

| 参数 | 默认值 | MIN | MAX | 含义 |
| --- | --- | --- | --- | --- |
| Amplitude | `1` | `1` | `10` | 控制曲线的过冲 |
| Period | `.5` | `0.1` | `2` | 控制曲线来回的次数 |

### 6. 台阶式

定义动画到达其结束值所需的跳转次数。
`easing: 'steps(numberOfSteps)'`
| 参数 | 默认值 | MIN | MAX |
| --- | --- | --- | --- |
| `'numberOfSteps'` | `'10'` | `'1'` | 无穷 |

### 7. 自定义

`easing: function() { return function(time) { return time * i} }`
`time`：返回动画的当前时间。

## SVG

### 运动路径动画

动画一个元素，使之相对于SVG路径的x，y和角度值运动。
`var  myPath = anime.path('svg path');`
path函数返回一个返回指定属性的新函数。

| 参数 | 示例 | 含义 |
| --- | --- | --- |
| `'x'` | `myPath('x')` | 返回SVG路径的当前x值(`'px'`) |
| `'y'` | `myPath('y')` | 返回SVG路径的当前y值(`'px'`) |
| `'angle'` | `myPath('angle')` | 返回SVG路径的当前角度(`'degrees'`) |

```javascript
var path = anime.path('.motion-path-demo path'); // svg中的path标签

anime({
  targets: '.motion-path-demo .el',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 2000,
  loop: true
});
```

### 变形动画

创建两个svg形状之间的过渡。
形状必须具有相同的点数。

```javascript
anime({
  targets: '.morphing-demo .polymorph',
  points: [
    { value: [
      '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369',
      '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369']
    },
    { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
    { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
    { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
  ],
  easing: 'easeOutQuad',
  duration: 2000,
  loop: true
});
```

### 画线动画

anime.js使用`anime.setDashoffset()`方法获取到SVG路径的长度并将此长度设置为SVG的`'stroke-dasharray'`值，并返回该长度，再使用`strokeDashoffset`将SVG的`'stroke-dashoffset'`属性值在[from, to]格式中产生动画从而创建路径绘制效果。

```javascript
//从起点开始画完
strokeDashoffset: [anime.setDashoffset, 0] 

//从一半开始画完
strokeDashoffset: function(el) {
  var svgLength = anime.setDashoffset(el);
  return [svgLength*0.5, 0];
} 
```

```javascript
anime({
  targets: '.line-drawing-demo .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});
```

## anime.js方法

### 1. 删除目标

从正在运行的动画或时间轴中删除目标。
`targets`参数接受与动画配置中的targets属性相同的值。
`anime.remove(targets)`

### 2. 获取值

返回DOM元素的原始值。
`anime.get(targets, propertyName, unit);`
由于anime.js使用getComputedStyle来访问原始CSS，因此返回值几乎总是'px'单位。第三个（可选）参数转换所需单位的值。
`anime.get(domNode, 'width', 'rem');`

### 3. 设定值

`anime.set(targets, {property: value});`

```javascript
anime.set('.set-value-demo .el', {
  translateX: function() { return anime.random(50, 250); },
  rotate: function() { return anime.random(0, 360); },
});
```

### 4. 随机数

返回指定范围内的随机整数。
`anime.random(minValue, maxValue);`

### 5. TICK

使用外部requestAnimationFrame循环播放动画。
`animation.tick(time)`
不要忘记将`autoplay`参数设置为`false`以防止anime.js内置RAF循环启动。

```javascript
var animation = anime({
  targets: '.tick-demo .el',
  translateX: 270,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutQuad',
  autoplay: false
});

function loop(t) {
  animation.tick(t);
  customRAF = requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
```

### 6. 运行的动画实例

返回当前正在运行的动画实例的数组。
`anime.running`