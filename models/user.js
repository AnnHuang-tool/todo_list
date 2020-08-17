const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  email: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  password{
  type: String, // 資料型別是字串
  required: true, // 這是個必填欄位
},
  creaedAt: {
  type: Date,
  defult: Date.now
}

})
module.exports = mongoose.model('User', userSchema)