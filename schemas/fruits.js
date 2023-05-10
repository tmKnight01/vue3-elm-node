const mongoose = require("mongoose");

const FruitsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  date: {
    type: Number,
    default: Date.now(),
  },
});

FruitsSchema.statics = {
  insertData: (cb) => {
    this.find().exec(cb)
       
  },
  fetch: function(cb){
    return (
        this.find()
        // .sort('meta.updateAt') //排序
        .exec(cb)
    ); //回调
  },
};


module.exports  = FruitsSchema;