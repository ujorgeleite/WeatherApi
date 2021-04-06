const BaseRoute = require("./base/baseRoute");

class WeatherRoutes extends BaseRoute {
  constructor() {
    super();
  }

  condition() {
    return {
      path: "/condition",
      method: "GET",
      handler: (request, headers) => {
        return { condition: "clear" };
      },
    };
  }
}

module.exports = WeatherRoutes;
