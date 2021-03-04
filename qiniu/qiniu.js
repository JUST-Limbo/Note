//nodejs
const request = require('request');
var accessKey = "x653NxGkHI3xqVY5gmQtqm4O-q8zg2emsK14sL6S";
var secretKey = "ls-8MwWHCMfxXBHpcWyEx_gsSDUAzrdkJaT9G5qF";
var bucket = "yurunprogramtest";
var formData = {
  accessKey: "x653NxGkHI3xqVY5gmQtqm4O-q8zg2emsK14sL6S",
  secretKey: "ls-8MwWHCMfxXBHpcWyEx_gsSDUAzrdkJaT9G5qF",
  bucket: "yurunprogramtest"
};
var url = "http://zzzia.net:8080/qiniu/";
request.post({url, form: formData}, (err, res, body) => {
  if(err) {
    throw err;
  }
  var token = JSON.parse(body).token;
  console.log(token);
  return token;
});

//js
//var accessKey = "x653NxGkHI3xqVY5gmQtqm4O-q8zg2emsK14sL6S";
//var secretKey = "ls-8MwWHCMfxXBHpcWyEx_gsSDUAzrdkJaT9G5qF";
//var bucket = "yurunprogramtest";
//var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = function() {
///  if( xhr.readyState == 4 && xhr.status == 200 ) {
//    var result = xhr.response;
//    console.log(result)
//  }
//}
//xhr.open("post", "http://zzzia.net:8080/qiniu/", true);
//var formdata = `accessKey=${accessKey}&secretKey=${secretKey}&bucket=${bucket}`;
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//xhr.send(formdata);