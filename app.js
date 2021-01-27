const express = require('express')
const app = express()
const logger = require('./logger')

// 自定义中间件
app.use(logger('dev'))

app.use((request, response, next) => {
  // response.send('hi') // 响应只能发送一次
  response.write('hi') // 响应只能发送一次
  next()
})

app.use((request, response, next) => {
  response.write('hi')
  next()
})

app.use((request, response, next) => {
  response.end()
  next()
})

app.listen(3001, () => {
  console.log('正在 listen 3001 端口!')
})