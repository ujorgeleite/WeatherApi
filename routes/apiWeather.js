const { get } = require("axios");

const BaseRoute = require("./base/baseRoute");
const { mapCondition } = require("../mappers/index");
class WeatherRoutes extends BaseRoute {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey
  }
  
  condition() {
    return {
      path: "/condition",
      method: "GET",
      handler: async (request, headers) => {
        const { city } = request.query
        const { data, status } = await get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`
          );
          return { status, condition: mapCondition(data) };
        },
      };
    }
  }
  
  module.exports = WeatherRoutes;
  