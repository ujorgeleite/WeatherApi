const { get } = require("axios");
const Joi = require("joi")

const BaseRoute = require("./base/baseRoute");
const { mapCondition } = require("../mappers/index");
const baseUrl = "http://api.openweathermap.org";
class WeatherRoutes extends BaseRoute {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey
  }
  
  condition() {
    return {
      path: "/condition/{city}",
      method: "GET",
      config: {
        description:'Get the weather condition three hour ago',
        notes: 'This api was  thought for help to encapsulate functionality to get weather data by api http://api.openweathermap.org.',
        tags: ['api'],
        validate: {
          params: Joi.object({
            city: Joi.string()
            .min(4)
            .max(50)
            .required()
            .description("This field define where from you want to know the weather condition")
          })
        }
      },
      handler: async (request, headers) => {
        const { city } = request.params
        const { data, status } = await get(
          `${baseUrl}/data/2.5/forecast?q=${city}&appid=${this.apiKey}`
          );
          return { status, condition: mapCondition(data) };
        },
      };
    }
  }
  
  module.exports = WeatherRoutes;
  