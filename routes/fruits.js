const express = require("express");
const router = express.Router();
const fruits = require("../models/fruits");

// 获取 test/fruit的数据

router.get("/get_fruits_data", function (req, res) {
  fruits.fetch(function (err, fruit) {
    console.log('req',req.query)
    if (err) {
      console.log("some err hppend:", err);
    }
    console.log(fruit);
    res.status(200).send(fruit);
  });
});

router.post("/inert_fruits_data1", function (req, res) {
  console.log("req.body", req);
  res.status(200).send({ msg: "OK" });
//   res.send({
//     code: 0,
//     data: [],
//     success: true,
//   });
// fruits.fetch(function (err, fruit) {
//     if (err) {
//       console.log("some err hppend:", err);
//     }
//     console.log(fruit);
//     res.status(200).send(fruit);
//   });
  //   fruits.insertData(function (err, data) {
  //     if (err) {
  //       console.log("some err hppend:", err);
  //     }
  //     res.status(200).send({ msg: "OK" });
  //   });
});

// 导出页面
module.exports = router;
