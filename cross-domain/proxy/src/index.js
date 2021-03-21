import axios from 'axios'
// axios.get('http://127.0.0.1:3001/user/list')
//   .then(res => {
//     console.log(res)
//   })
axios.get('/user/list')
  .then(res => {
    console.log(res)
  })
axios.post('/user/login')
