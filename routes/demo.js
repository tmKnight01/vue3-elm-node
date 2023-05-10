const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); //导入mongoose模块
const users = require("../models/user"); //导入模型数据模块

// 获取MongoDB数据库数据
router.get("/users", function (req, res) {
  users.fetch(function (err, users) {
    if (err) {
      console.log(err);
    }
    console.log(users);
    res.status(200).send(users);
  });
});
//
router.get("/getOne", function (req, res) {
  users.findById("5f7be3ea52f8abd63742c518", function (err, users) {
    if (err) {
      console.log(err);
    }
    res.status(200).send("<p>some html</p>");
  });
});
//导出整个页面
exports = module.exports = router;
