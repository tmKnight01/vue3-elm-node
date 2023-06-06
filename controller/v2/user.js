"use strict";
const AddressComponent = require("../../prototype/addressComponent");
const UserModal = require("../../models/v2/user");
const UserInfoModal = require("../../models/v2/userInfo");
const formidable = require("formidable");
const dayjs = require("dayjs");

class User extends AddressComponent {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  async login(req, res, next) {
    try {
      const form = new formidable.IncomingForm();
      console.log("1111");
      form.parse(req, async (err, fields, files) => {
        const { username, password, cap } = fields;
        console.log("test", cap);
        if (err) {
          console.log("err", err);
          next(err);
          res.status(err.httpCode || 400).send(err);
          return;
        }
        const user = await UserModal.findOne({ username });
        const user_id = await this.getId("user_id");

        console.log("user", user);

        if (!user) {
          const cityInfo = await this.guessPosition(req); // 存入周边城市信息
          const newUser = { user_id, is: user_id, username, password };
          const registe_time = dayjs().format("YYYY-MM-DD HH:mm:ss");
          const newUserInfo = {
            username,
            user_id,
            id: user_id,
            city: cityInfo.city,
            registe_time,
          };
          await UserModal.create(newUser);
          const user_info = await UserInfoModal.create(newUserInfo);
          console.log("userInfo", user_info);
          req.session.user_id = user_id;

          res.send(user_info);
        } else if (String(password) !== String(user.password)) {
          // 判断密码是否正确
          console.log("用户登录密码错误");
          res.send({
            status: 0,
            type: "ERROE_PASSWORD",
            message: "密码错误",
          });
        } else {
          req.session.user_id = user.user_id;
          const userinfo = await UserInfoModal.findOne({
            user_id: user.user_id,
          });
          res.send(userinfo);
        }
      });
    } catch (err) {
      console.log("err", err);
      res.send({
        status: -1,
        err,
      });
    }
  }

  async getUserInfoById(req, res, next) {
    const user_id = req.query.user_id;
    if (!user_id || !Number(user_id)) {
      res.send({
        status: 1,
        message: "参数错误，未获取到用户Id",
      });
    }
    try {
      const userInfo = await UserInfoModal.findOne({ user_id });
      if (userInfo) {
        res.send(userInfo);
      }
    } catch (err) {
      res.send({
        message: "通过ID获取用户信息失败",
        status: 1,
      });
    }
  }
}

module.exports = new User();
