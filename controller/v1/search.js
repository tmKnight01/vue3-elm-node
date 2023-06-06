"use strict";
const  AddressComponent = require("../../prototype/addressComponent");
const CityHandle = require('./cites');
class SearchPlace extends AddressComponent {
  constructor() {
    super();
    this.search = this.search.bind(this);
  }

  async search(req, res, next) {
    const { city_id, keyword } = req.query;

    if (!keyword) {
      res.send({
        message: "参数错误",
        naem: "PARAMS_QUERY_ERROR",
      });
      return;
    }

    if (isNaN(Number(city_id))) {
      res.send({
        message: "city_id错误",
        name: "CITY_ID_ERROR",
      });
    }
    const cityname = await CityHandle.getCityName(req);
    console.log('cityname',cityname);
    const resultObj = await this.getSearchAddress(keyword,cityname);
    console.log('resultObj',resultObj)
  }
}


module.exports = new SearchPlace();