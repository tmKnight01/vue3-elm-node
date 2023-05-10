const mongoose = require("mongoose");
const UsersSchema = require("../schemas/users"); //拿到导出的数据集模块
const Users = mongoose.model("user", UsersSchema); // 编译生成Movie 模型 其中'user' 对应数据集合test下的users表
// console.log(Users);
module.exports = Users;
