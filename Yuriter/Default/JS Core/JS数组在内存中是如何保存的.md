# Javascript中的数组在内存中是如何保存的？

大家在日常编码中，最长碰到的是数组和对象的操作，各种增删改查，但是你真的了解数组和对象么？数组的最基本概念就不解释了，详情看MDN文档——[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
今天我们主要讲一下数组的内存模型。

# 数组的内存模型

Javascript的内存分为堆内存和栈内存，数组作为对象，在建立后存储在堆内存中。
任何计算机语言内存的分配都要经历三个阶段

* * *

*   **分配内存**
*   **对内存进行读、写**
*   **释放内存（垃圾回收）**

* * *

本文主要针对数组的内存分配进行解释。
Javascript中数组有几个不同于其他语言数组的特点

* * *

*   **数组中可以存放不同的数据结构**，可以存放数组、对象、Number、Undefined、Null、String、Symbol、Boolean、Function等等。
*   **数组的index是字符串类型的**，之所以你可以通过arr[1]，获得对应的数据，是因为Javascript自动将数字转化为字符串。

* * *

数组本来应该是一个**连续的内存分配**，但是在Javascript中不是连续分配的，而是类似**哈希映射**的方式存在的。
对于上述的实现方式，熟悉数据结构的同学应该知道，**对于读取操作，哈希表的效率并不高，而修改删除的效率比较高**。
现在浏览器为了优化其操作，对数组的创建时候的内存分配进行了优化：

* * *

*   对于同构的数组，也就是，数组中元素类型一致，会创建连续的内存分配
*   对于不同构数组，按照原来的方式创建。
*   如果你想插入一个异构数据，那么就会重新解构，通过哈希映射的方式创建

* * *

为了进一步优化功能的实现，Javascript中出现了[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)，它可以创建连续的内存供编程人员使用。

* * *

*   ArrayBuffer是创建一块连续的内存，不能直接操作
*   通过视图对分配的内存进行读写操作

* * *

显而易见，如果通过ArrayBuffer创建的数组进行遍历操作，速度更快。
参考文章：
[数组深度解析](http://voidcanvas.com/javascript-array-evolution-performance/)
