"use strict";
const AddressComponent = require("../../prototype/addressComponent");
const CityHandle = require("./cites");
class SearchPlace extends AddressComponent {
  constructor() {
    super();
    this.search = this.search.bind(this);
  }

  async search(req, res, next) {
    const { city_id, keyword, page = 1, limit = 5 } = req.query;

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

     try{
      const cityname = await CityHandle.getCityName(req);
      console.log("cityname", cityname);
      const resultObj = await this.getSearchAddress(keyword, cityname);
      let cityList = [];
      const size = resultObj.data.length;
      if (size && size > (page - 1) * limit) {
        // 此处是为了进行分页的效果
        resultObj.data
          .slice((page - 1) * limit, limit * page - 1)
          .forEach((item) => {
            cityList.push({
              id: item.id,
              address: this.removeBoforeCity(item.address),
              lat: item.location.lat,
              lng: item.location.lng,
            });
          });
        res.send({ message: "success", cityList, total: size });
      } else {
        res.send({
          message: "未获取地址信息",
          name: "NO_GET_ADDRESS",
        });
      }
  
     } catch(err){
       console.log('err',err);
       res.send({
        err,
        name: "ERROR",
      });
     }
  
  }
}

module.exports = new SearchPlace();
