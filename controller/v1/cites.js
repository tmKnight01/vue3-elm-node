const Cities = require("../../models/v1/cities");
const AddressComponent = require("../../prototype/addressComponent");
const pinyin = require("pinyin");

class CityHandle extends AddressComponent {
  constructor() {
    super();
    this.getCity = this.getCity.bind(this);
    this.getCityName = this.getCityName.bind(this);
  }

  async getCity(req, res, next) {
    const type = req.query.type;
    let cityInfo;
    try {
      switch (type) {
        case "guess":
          const city = await this.getCityName(req);
          cityInfo = await Cities.cityGuess(city);

          break;
        case "hot":
          cityInfo= await Cities.hotCities();
          break;

        default:
          res.json({
            name: "ERROR_QUERY_TYPE",
            message: "参数错误",
          });
          return;
      }
      res.send(cityInfo);
    } catch {
      res.send({
        name: "ERROR_DATA",
        message: "获取数据失败",
      });
    }
  }

  async getCityName(req) {
    try {
      const cityInfo = await this.guessPosition(req);
      const pinyinArr = pinyin(cityInfo.city, {
        style: pinyin.STYLE_NORMAL,
      });
      let cityName = "";
      pinyinArr.forEach((item) => {
        cityName += item[0];
      });
      return cityName;
    } catch {
      return "北京";
    }
  }
}

module.exports = new CityHandle();
