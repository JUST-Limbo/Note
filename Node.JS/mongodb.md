```shell
# mongodb默认使用执行mongodb命令所处盘符目录的/data/db 的数据存储目录
mongodb

```

如果想要修改默认的数据存储目录 可以

```shell
mongod --dbpath=数据存储目录路径
```

连接数据库

```shell
# 该命令默认连接本机的MongoDB服务
mongo
```

退出

```shell
exit
```

## 基本命令

+ `show dbs`
  + 查看显示所有数据库
+ `db`
  + 查看当前操作的数据库

+ `use 数据库名称`
  + 切换到指定数据库(如果没有就新建)

+ `show collections`
  + 显示当前数据库的所有集合

## 在Node中如何操作MongoDB数据

+ 使用官方的`mongodb`包来操作
+ 使用第三方`mongoose`包来操作MongoDB数据库
  + 基于MongoDB官方`mongodb`包二次封装
  + https://mongoosejs.com/

## MongoDB基本概念

+ 可以有多个数据库
+ 一个数据库可以有多个集合
+ 一个集合中可以有多个文档
+ 文档结构很灵活，没有任何限制
+ MongoDB非常灵活，无需像MySQL一样先创建数据库，表，设计结构
  + 当插入数据时，只需指定哪个数据库的哪个集合操作就可以了

```js
{
  qq:{// 数据库
    users:[ // 集合
      {},{},{},{},{},{},{} // 文档
    ],
    products:[
      
    ],
    ...
  },
  taobao:{
    
  },
  baidu:{
    
  }
}
```

## 设计Schema 发布Model

```javascript
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/itcast', { useNewUrlParser: true });
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true  //  必要
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

// mongoose.model 方法 用来将一个架构发布为model
// 第一个参数 传入一个大写名词单数字符串用来表示数据库名称
// mongoose会自动将大写名词的字符串生生成小写复数的集合名称
// 第二个参数 架构 Schema
// 返回值:模型构造函数
var User = mongoose.model('User', userSchema);
```

## 增加数据

```js
var admin=new User({
  username:'zs',
  password:'123456',
  email:'admin@admin.com'
})

```

## 查询所有

```js
User.find(function(err,res){
  if(err){
    console.log('find fail');
  }else{
    console.log(res);
  }
})
```

## 条件查询

```js
// 无论如何都会放在一个数组中
User.find({
  username:'zs'
},function(err,res){
  if(err){
    console.log('find fail');
  }else{
    console.log(res);
  }
})

// findOne
User.findOne({
  username:'zs',
  password:'123456'
},function(err,res){
  if(err){
    console.log('find fail');
  }else{
    console.log(res);
  }
})
```





## 删除

根据条件删除所有

````js
User.remove({
  username: 'zs'
}, function (err, res) {
  if (err) {
    console.log('remove fail');
  } else {
    console.log(res);
  }
})
````

根据条件删除一个

```js
Model.findOneAndRemove(conditions,[options],[callback])
```

根据ID删除一个

```js
Model.findByIdAndRemove(id,[options],[callback])
```



## 更新

根据条件更新所有

```js
Model.update(conditions,doc,[options],[callback])
```

根据条件更新一个

```js
Model.findOneAndUpdate(conditions,[update],[options],[callback])
```

根据ID更新一个

```js
User.findByIdAndUpdate('5e3b0f8f89a5861a382eac94', {
  password:'31231231231'
},function(err,res){
  if(err){
    console.log('update fail');
  }else{
    console.log('update success');
  }
})
```



