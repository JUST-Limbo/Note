# Vue笔记

```vue
props:{
	arr:{
		type: Array,
      	default: function() {
        	return []
      	}
	}
}
```

default属性值为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。**对象或数组的默认值必须从一个工厂函数返回。**