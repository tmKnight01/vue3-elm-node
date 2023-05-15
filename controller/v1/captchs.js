"use strict";

const captchapng = require("captchapng");

class Chatchapng {
  constructor() {}

  async getChatchapng(_, res) {
    const cap = parseInt(Math.random() * 9000 + 1000);
    const p = new captchapng(80, 30, cap); // 设置图片大小
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);

    const base64 = p.getBase64();

    // res.writeHead(200,{
    //   "Content-Type": "text/plain",
    // });

    res.send({
      status: 1,
      code: "data:image/png;base64," + base64,
      cap,
    });
  }
}
module.exports = new Chatchapng();
