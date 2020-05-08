```js
const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

(async () => {
  try {
    const data = await readFilePromise('./1.txt')
    console.log(data.toString());
  } catch (error) {
    console.log(error);
  }
})()
```



async await本质上是promise then简写

```js
var p1=()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(12345)
    },5000)
  })
}

async function q1(){
  var res=await p1()
  console.log(res);
}
async function q2(){
  var res=await p1()
  console.log(res);
}


// p1().then((res)=>{
//   console.log(res);
// })
// console.log('两次promise之间');
// p1().then((res)=>{
//   console.log(res);
// })


// q1()
// console.log('两次async之间')
// q2()

(async ()=>{
  await q1()
  console.log('两次async之间')
  await q2()
})()
console.log(1);
```

