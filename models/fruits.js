const mongoose = require("mongoose");
const FruitsSchema = require("../schemas/fruits"); //拿到导出的数据集模块
const Fruits = mongoose.model("fruits", FruitsSchema); // 编译生成Movie 模型 其中'user' 对应数据集合test下的users表
console.log(Fruits);
module.exports = Fruits;
