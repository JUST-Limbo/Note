const express = require('express')
app = express()
app.listen(1002, _ => {
  console.log('ok')
})
app.use(express.static('./'))
