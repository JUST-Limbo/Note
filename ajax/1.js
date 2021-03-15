var request = new XMLHttpRequest()  // 创建异步对象

request.onreadystatechange = function () { // 注册事件
  if (request.readyState == 4) {
    if (request.status == 200) {
      console.log('响应成功')
      console.log(request.responseText)
    } else {
      console.log('响应失败')
    }
  }
}

request.open('GET', 'http://localhost:3000') // 设置请求的参数

// post请求 设置头信息
// request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") 

request.send() // 发送请求

// post请求 设置请求主体
// request.send(body)
// request.send("name=v1&upwd=v2")
