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

app.listen(3001, () => {
  console.log('正在 listen 3001 端口!')
})