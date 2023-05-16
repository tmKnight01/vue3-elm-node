let fetch = require("node-fetch");
const Ids = require("../models/ids");

module.exports = class BaseComponent {
  constructor() {
    this.idList = [
      "restaurant_id",
      "food_id",
      "order_id",
      "user_id",
      "address_id",
      "cart_id",
      "img_id",
      "category_id",
      "item_id",
      "sku_id",
      "admin_id",
      "statis_id",
    ];
  }

  async fetch(url = "", data = {}, type = "GET", resType = "JSON") {
    type = type.toUpperCase();
    resType = resType.toUpperCase();
    if (type == "GET") {
      let dataStr = ""; //数据拼接字符串
      Object.keys(data).forEach((key) => {
        dataStr += key + "=" + data[key] + "&";
      });

      if (dataStr !== "") {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
    }

    let requestConfig = {
      method: type,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (type == "POST") {
      Object.defineProperty(requestConfig, "body", {
        value: JSON.stringify(data),
      });
    }
    let responseJson;
    try {
      const response = await fetch(url, requestConfig);
      if (resType === "TEXT") {
        responseJson = await response.text();
      } else {
        responseJson = await response.json();
      }
    } catch (err) {
      console.log("获取http数据失败", err);
      throw new Error(err);
    }
    return responseJson;
  }

  // 返回 type类型的id
  async getId(type) {
    // 遍历这个idList 查找是否存在
    if (!this.idList.includes(type)) {
      throw new Error("类型不存在！");
    }
    try {
      const IdData = await Ids.findOne();
      IdData[type]++;
      console.log(type,IdData[type]);
      await IdData.save();
      return IdData[type];
    } catch (err) {
      console.log("err", err);
      throw new Error(err);
    }
  }
};
