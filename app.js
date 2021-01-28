const { response, request } = require('express')
const express = require('express')
const app = express()
const logger = require('./logger')

// 自定义中间件
app.use(logger('dev'))

app.use((request, response, next) => {
  console.log(1);
  next()
})

app.use((request, response, next) => {
  console.log(2);
  if(true){
    next('未登录')
  } else {
    next()
  }
})

app.use((request, response, next) => {
  console.log(3);
  next()
})

// exporess 默认错误处理
// app.use((error, request, response, next) => {
//   if (request.headersSent) {
//     return next(error)
//   }
//   response.status(500)
//   // response.render('error', { error: error }) // render 需要模板引擎
//   response.send(error)
// })

// 自定义错误处理程序, 一般在最后定义
app.use((error, request, response, next) => {
  console.log(error)
  next(error)
})
let count = 0
app.use((error, request, response, next) => {
  count += 1
  console.log(`目前有${count}个错误`)
  next()
  response.send(error)
})

// next('route') 跳过第二个回调处理函数

app.listen(3001, () => {
  console.log('正在 listen 3001 端口!')
})