const mongoose = require("mongoose");

const cityData = require("../../InitData/ciites");

const citySchema = new mongoose.Schema({
  data: {},
});

citySchema.statics = {
  cityGuess: function (name) {
    console.log("name", name);
    return new Promise(async (resolve, reject) => {
      const firtWord = name.substr(0, 1).toUpperCase();
      try {
        const city = await this.findOne();
        Object.entries(city.data).forEach((item) => {
          if (item[0] == firtWord) {
            item[1].forEach((cityItem) => {
              if (cityItem.pinyin == name) {
                resolve(cityItem);
              }
            });
          }
        });
      } catch (err) {
        reject({
          name: "ERROR_DATA",
          message: "查找数据失败",
        });
        console.error(err);
      }
    });
  },
  hotCities: function () {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Cities.findOne();
        resolve(result.data.hotCities);
      } catch (err) {
        console.log("err:", err);
        reject({
          name: "ERROR_DATA",
          message: "查找数据失败",
        });
      }
    });
  },

  findCityById: async function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const citys = await this.findOne();
        // const filetCity = Object.keys(citys).forEach(item => item != 'hotCities').reduce((newO)=>{},{})
        for ([key, value] of Object.entries(citys.data)) {
          if (key != "hotCities") {
            for (let i = 0; i < value.length; i++) {
              if (value[i].id == id) {
                resolve(value[i]);
              }
            }
          }
        }
      } catch (err){
        console.log('err',err);
        reject({
          name: "ERROR_DATA",
          message: "查找数据失败",
        });
      }
    }).catch((err) => {
      console.log("err", err);
    });
  },
};

// 将 城市信息插入到数据库中
const Cities = mongoose.model("cities", citySchema);
Cities.findOne((err, data) => {
  // console.log('data',data);
  if (!data) {
    Cities.create(cityData);
  }
});
module.exports = Cities;
