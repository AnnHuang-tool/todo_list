// 載入 express 並建構應用程式伺服器
const express = require('express')
const session = require('express-session')
const app = express()
// app.js
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

const exphbs = require('express-handlebars');
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')

// const Todo = require('./models/todo') // 載入 Todo model



// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// 將 request 導入路由器
app.use(routes)

// 設定首頁路由

// app.get('/', (req, res) => {
//   Todo.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ _id: 'asc' }) // desc +
//     .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
// })

// 新增
// app.get('/todos/new', (req, res) => {
//   return res.render('new')
// })

// 瀏覽
// app.get('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('detail', { todo }))
//     .catch(error => console.log(error))
// })

// 編輯
// app.get('/todos/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })
// Create 功能：資料庫新增資料
// app.post('/todos', (req, res) => {
//   const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
//   return Todo.create({ name })     // 存入資料庫
//     .then(() => res.redirect('/')) // 新增完成後導回首頁
//     .catch(error => console.log(error))
// })

// Update 功能：資料庫修改特定 todo 的資料
// app.put('/todos/:id', (req, res) => {
//   const id = req.params.id
//   // const name = req.body.name
//   const { name, isDone } = req.body
//   return Todo.findById(id)
//     .then(todo => {
//       todo.name = name
//       todo.isDone = isDone === 'on'
//       return todo.save()
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })

// delete
// app.delete('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })
// app.get('/', (req, res) => {
//   res.render('index')
// })

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})