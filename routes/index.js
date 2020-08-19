// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組 
// router.use('/', home)

// 引入 todos 模組程式碼
const todos = require('./modules/todos')

const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos) // 加入驗證程序
// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
// router.use('/todos', todos)
router.use('/users', users)
router.use('/', authenticator, home) // 加入驗證程序

// 準備引入路由模組
// 匯出路由器
module.exports = router