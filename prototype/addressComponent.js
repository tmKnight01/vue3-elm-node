const BaseComponent = require("./baseComponent");

class AddressComponent extends BaseComponent {
  constructor() {
    super();
    this.tencentkey = "TO7BZ-UIZ3Q-GNC55-B6XNV-Y77NO-4TB64";
    this.tencentkey2 = "RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X";
    this.tencentkey3 = "OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN";
    this.tencentkey4 = "Z2BBZ-QBSKJ-DFUFG-FDGT3-4JRYV-JKF5O";
    this.baidukey = "fjke3YUipM9N64GdOIh1DNeK2APO2WcT";
  }

  //获取定位地址
  async guessPosition(req) {
    return new Promise(async (resolve, reject) => {
      let ip;
      const defaultIp = "219.133.168.5";
      if (process.env.NODE_ENV == "development") {
        ip = defaultIp;
      } else {
        try {
          ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
          const ipArr = ip.split(":");
          ip = ipArr[ipArr.length - 1];
        } catch (e) {
          ip = defaultIp;
        }
      }

      console.log("ip", ip);
      try {
        let result = await this.fetch(
          "http://apis.map.qq.com/ws/location/v1/ip",
          {
            key: this.tencentkey,
          }
        );
        if (result.status != 0) {
          result = await this.fetch(
            "http://apis.map.qq.com/ws/location/v1/ip",
            {
              ip,
              key: this.tencentkey2,
            }
          );
        }
        if (result.status != 0) {
          result = await this.fetch(
            "http://apis.map.qq.com/ws/location/v1/ip",
            {
              ip,
              key: this.tencentkey3,
            }
          );
        }
        if (result.status != 0) {
          result = await this.fetch(
            "http://apis.map.qq.com/ws/location/v1/ip",
            {
              ip,
              key: this.tencentkey4,
            }
          );
        }
        if (result.status == 0) {
          const cityInfo = {
            lat: result.result.location.lat,
            lng: result.result.location.lng,
            city: result.result.ad_info.city,
          };
          global.myLocation = result.result.location;
          cityInfo.city = cityInfo.city.replace(/市$/, "");
          console.log("cityInfo", result);
          resolve(cityInfo);
        } else {
          console.log("定位失败", result);
          reject("定位失败");
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // 获取当前服务器的ip地址
  async getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
      for (const addr of iface) {
        if (addr.family === "IPv4" && !addr.internal) {
          return addr.address;
        }
      }
    }
  }

  // 获取就近的相关地址位置
  async getSearchAddress(keyword, cityName, size, page_index) {
    // 首先判断一下 global的上的myLocation是否存在，如何存在那么直接获取Mylocation上的经纬度,
    // 如何没有的话那么直接调用api来获取当前经纬度.

    try {
      let myLocation;
      if (global.myLocation) {
        myLocation = global.myLocation;
      } else {
        const cityLocation = await this.fetch(
          "https://apis.map.qq.com/ws/location/v1/ip",
          {
            key: this.tencentkey,
          }
        );
        if (cityLocation) myLocation = cityLocation.result.location;
        else throw Error("获取经纬度位置失败");
      }

      const result = await this.fetch(
        "http://apis.map.qq.com/ws/place/v1/search",
        {
          key: this.tencentkey,
          keyword: encodeURIComponent(keyword),
          boundary: `nearby(${myLocation.lat},${myLocation.lng},1000,1)`,
          page_index,
          size,
          orderby: "_distance",
        }
      );
      console.log("result", result);
      if (result.status == 0) {
        return result;
      } else {
        throw Error("搜索位置失败");
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  // 将市之前的内容省略
  removeBoforeCity(address) {
    console.log("address", address);
    const index = address.indexOf("市");
    if (index > 0) {
      console.log("str", address.slice(index + 1));
      return address.slice(index + 1);
    }
    return address;
  }
}

module.exports = AddressComponent;
