## 官方文档地址：

+ [百度地图 JavaScript API v3.0](http://lbsyun.baidu.com/index.php?title=jspopular3.0)

+ [vue-baidu-map](https://dafrok.github.io/vue-baidu-map/#/zh/index)
+ [原生JS在折线上添加方向箭头官方案例](http://lbsyun.baidu.com/jsdemo.htm#c1_25)



> 在开发过程中发现`vue-baidu-map`封装的`BmPolyline`折线组件不能顺利绘制出带箭头的纹理。
>
> 原因是`BmPolyline`文档中虽然有`icons`属性，但是对应的源文件中并没有props接收`icons`

## 最初的开发思路：

根据`vue-baidu-map`折线组件的官方文档，在vue中通过Prop，为`BmPolyline`组件传递一个`icons`数组，数组的元素必须为`IconSequence`类的实例对象。


![](https://user-gold-cdn.xitu.io/2020/4/27/171ba3a198c4f75d?w=1245&h=586&f=png&s=45326)

而`IconSequence`类的实例对象则是在`BaiduMap`组件的`ready`事件中拿到`BMap`类和`map`地图实例对象，然后依次调用`BMap`基类的`Symbol`，`IconSequence`子类，完成`IconSequence`对象的初始化。具体参数含义及代码实现见上文发的官方案例地址。

按照上述思路完成代码编写后并不能得到预期中的结果。因为`BmPolyline`对应的源文件中并没有props接收`icons`。



## 解决方案

将`/node_modules/vue-baidu-map/components/overlays`目录下的`BmPolyline`源文件复制，粘贴到另一个vue文件中，然后手动为折线组件配置`icons`

详细解决方案见下方代码：

**new_polyline.vue**  新的折线组件文件

```vue
<script>
/**
 * 注意此处三个引入路径
 * 在源文件中使用的是相对路径
 * 但是因为现在是自定义组件,所以要重新调整路径
 */
import commonMixin from "vue-baidu-map/components/base/mixins/common.js";
import bindEvents from "vue-baidu-map/components/base/bindEvent.js";
import { createPoint } from "vue-baidu-map/components/base/factory.js";

export default {
  // 起一个新名字
  name: "new-polyline",
  render() {},
  mixins: [commonMixin("overlay")],
  props: {
    path: {
      type: Array
    },
    // 新声明一个icons
    icons: {
      type: Array
    },
    strokeColor: {
      type: String
    },
    strokeWeight: {
      type: Number
    },
    strokeOpacity: {
      type: Number
    },
    strokeStyle: {
      type: String
    },
    massClear: {
      type: Boolean,
      default: true
    },
    clicking: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    path: {
      handler(val, oldVal) {
        this.reload();
      },
      deep: true
    },
    strokeColor(val) {
      this.originInstance.setStrokeColor(val);
    },
    strokeOpacity(val) {
      this.originInstance.setStrokeOpacity(val);
    },
    strokeWeight(val) {
      this.originInstance.setStrokeWeight(val);
    },
    strokeStyle(val) {
      this.originInstance.setStrokeStyle(val);
    },
    editing(val) {
      val
        ? this.originInstance.enableEditing()
        : this.originInstance.disableEditing();
    },
    massClear(val) {
      val
        ? this.originInstance.enableMassClear()
        : this.originInstance.disableMassClear();
    },
    clicking(val) {
      this.reload();
    }
  },
  methods: {
    load() {
      const {
        BMap,
        map,
        path,
        // 参数解构 加入icons
        icons,
        strokeColor,
        strokeWeight,
        strokeOpacity,
        strokeStyle,
        editing,
        massClear,
        clicking
      } = this;
      const overlay = new BMap.Polyline(
        path.map(item =>
          createPoint(BMap, {
            lng: parseFloat(item.lng),
            lat: parseFloat(item.lat)
          })
        ),
        {
          strokeColor,
          strokeWeight,
          strokeOpacity,
          strokeStyle,
          // 配置icons
          icons,
          enableEditing: editing,
          enableMassClear: massClear,
          enableClicking: clicking
        }
      );
      this.originInstance = overlay;
      map.addOverlay(overlay);
      bindEvents.call(this, overlay);
    }
  }
};
</script>

```

地图文件

```vue
<template>
  <div class="container">
    <baidu-map class="map" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @ready="ready">
      <new-polyline
        v-if="points && points.length >= 2 && checkPoints({ points })"
        :path="points"
        :icons="icons"
        stroke-color="#0091ea"
        :stroke-opacity="0.8"
        :stroke-weight="10"
      ></new-polyline>
    </baidu-map>
  </div>
</template>
<script>
import newPolyline from "./new_polyline";
export default {
  components: {
    newPolyline
  },
  data() {
    return {
      center: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 5,
      points: [],
      icons: []
    };
  },
  methods: {
    ready({ BMap, map }) {
      this.points = this.getPointsSomehow();
      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW, {
        scale: 0.5, // 图标缩放大小
        strokeColor: "#fff", // 设置矢量图标的线填充颜色
        strokeWeight: "3" // 设置线宽
      });
      var icons = new BMap.IconSequence(sy, "5%", "15%");
      this.icons.push(icons)
    },
    getPointsSomehow() {
      // 116.324356,39.980648
      // 118.532031,32.010158
      // 121.475599,31.380939
      var arr = [
        { lng: 116.324356, lat: 39.980648 },
        { lng: 118.532031, lat: 32.010158 },
        { lng: 121.475599, lat: 31.380939 }
      ];
      return arr;
    },
    // 查重 如果数组中只有一组有意义的坐标,绘制折线时可能会报错,因为绘制一条折线需要两组不同的坐标点
    checkPoints({ points }) {
      // 拿到第一组点
      var originPoint = points[0];
      // 将第一组点与后续点进行对比 如果坐标集合中只有一组实际坐标点则return false
      // 只要坐标集合中有两组不同的实际坐标点,则return true
      for (var i = 1; i < points.length; i++) {
        if (
          points[i].lat !== originPoint.lat ||
          points[i].lng !== originPoint.lng
        ) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>

```