const { response } = require('express')
const express = require('express')
const app = express()
const logger = require('./logger')

// 自定义中间件
app.use(logger('dev'))

app.use((request, response, next) => {
  if(request.path === '/' && request.method === 'get') {
    response.send('根目录')
  }
  next()
})

app.use((request, response, next) => {
  if(request.path === '/aaa') {
    response.send('这是 aaa 目录')
  }
  next()
})

app.use((request, response, next) => {
  if(request.path === '/bbb') {
    response.send('这是 bbb 目录')
  }
  next()
})

// app.use('/xxx', (request, response, next) => {
//   response.send('这是使用 use 方法的 xxx 目录')
//   next()
// })

// app.post('/xxx', (request, response, next) => {
//   response.send('这是使用 post 方法的 xxx 目录')
//   next()
// })

app.route('/xxx')
  .all((request, response, next) => {
    // 所有方法都会执行这个函数
    console.log('访问/xxx 时, 会执行这个函数!')
    next()
  })
  .get((request, response, next) => {
    response.send('这是使用 route 方法的 xxx 目录')
    next()
  })

app.listen(3001, () => {
  console.log('正在 listen 3001 端口!')
})