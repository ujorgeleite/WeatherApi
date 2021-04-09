require('dotenv/config')
const assert = require("assert");
const nock = require("nock");

const api = require("../api");
const { weathersStub } = require("./stubs/index");

let app = {};

describe("Api Weather tests", function() {
  this.beforeAll(async () => {
    app = await api;
    
    nock("http://api.openweathermap.org")
      .get(
        `/data/2.5/forecast?q=viamao&appid=${process.env.WEATHER_API_KEY}`
      )
      .reply(200, weathersStub);
  });

  this.afterAll(() => {
    app.stop();
  });

  it("Get Condition", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/condition/viamao",
    });

    const expected = {
      status: 200,
      condition: {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d",
      },
    };

    const data = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepStrictEqual(statusCode, 200);
    assert.deepStrictEqual(data, expected);
  });
});
