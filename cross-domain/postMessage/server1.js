const express = require('express')
app = express()
app.listen(1001, _ => {
  console.log('ok')
})
app.use(express.static('./'))
