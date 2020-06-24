# Fetch与AJAX

fetch是一种HTTP数据请求的方式，是XMLHttpRequest的一种替代方案。fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象。

## AJAX

* 使用步骤
  1. 创建XMLHttpRequest对象
  2. 调用open方法设置基本请求信息
  3. 设置发送的数据，发送请求
  4. 注册监听的回调函数
  5. 拿到返回值，对页面进行更新

```javascript
//1.创建Ajax对象
if (window.XMLHttpRequest) {
    var oAjax = new XMLHttpRequest();
} else {
    var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
}

//2.连接服务器（打开和服务器的连接）
oAjax.open('GET', url, true);

//3.发送
oAjax.send();

//4.接收
oAjax.onreadystatechange = function() {
    if (oAjax.readyState == 4) {
        if (oAjax.status == 200) {
            //alert('成功了：'+oAjax.responseText);
            fnSucc(oAjax.responseText);
        } else {
            //alert('失败了');
            if (fnFaild) {
                fnFaild();
            }
        }
    }
};
```

## fetch

* 特点
  1. 第一个参数是URL
  2. 第二个是可选参数，可以控制不同配置的init对象
  3. 使用了JS Promises来处理结果/回调

```javascript
fetch(url).then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log("Oops, error", e))
```

* 更酷一点
  你可以通过Request构造器函数创建一个新的请求对象，你还可以基于原有的对象创建一个新的对象。 新的请求和旧的并没有什么不同，但你可以通过稍微调整配置对象，将其用于不同的场景。例如：

```javascript
var req = new Request(URL, {
    method: 'GET',
    cache: 'reload'
});
fetch(req).then(function(response) {
    return response.json();
}).then(function(json) {
    insertPhotos(json);
});
```

## fetch和AJAX的主要区别

1. fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500
2. 在默认情况下 fetch不会接受或者发送cookies

## fetch封装

```javascript
export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include', //为了在当前域名内自动发送 cookie ， 必须提供这个选项
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors", //请求的模式
            cache: "force-cache"
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}
```

