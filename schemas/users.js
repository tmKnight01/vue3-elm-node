const mongoose = require('mongoose');

//申明一个mongoons对象
const UsersSchema = new mongoose.Schema({
// 定义要接收的字段
  name: String,
  password: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now() // 设置default可在数据库中没有值时传递默认值
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else {
    this.meta.updateAt = Date.now();
  }

  next();
})

//查询的静态方法
UsersSchema.statics = {
  fetch: function(cb) { //查询所有数据
    return this
        .find()
        // .sort('meta.updateAt') //排序
        .exec(cb) //回调
  },
  findById: function(id, cb) { //根据id查询单条数据
    return this
        .findOne({_id: id})
        .exec(cb)
  }
}

//暴露出去的方法
module.exports = UsersSchema

