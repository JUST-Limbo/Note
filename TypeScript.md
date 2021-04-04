# TypeScript

## 安装

`npm i -g typescript`

`tsc -v `校验typescript

tsc作用：负责将ts代码转为浏览器和nodejs识别的js代码

## 自动编译ts文件

![image-20210324220122229](typescript.assets/image-20210324220122229.png)

终端中输入`tsc -w`

## function

### 可选参数

JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用 `?`实现可选参数的功能。 比如，我们想让last name是可选的：

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

**可选参数必须跟在必须参数后面**。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。

### 默认参数

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是`undefined`时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为`"Smith"`。

```ts
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```

**在所有必须参数后面的带默认初始化的参数都是可选的**，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型。

**与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。** 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 `undefined`值来获得默认值。 例如，我们重写最后一个例子，让 `firstName`是带默认值的参数：

```ts
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```

## class

## 理解 `private`

当成员被标记成 `private`时，它就不能在声明它的类的外部访问。比如：

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

## 抽象类

## 接口
## vue中添加ts

![image-20210325160231123](TypeScript.assets/image-20210325160231123.png)

![image-20210325160619229](TypeScript.assets/image-20210325160619229.png)





## typescript在vue中的应用

Component装饰器

```vue
@Component({
  name: "App",  // 当前组件name属性
  components: { // 注册子组件
    HelloWorld,
  },
  filters: {},  // 过滤器
  directives: {}, // 自定义指令
})
```