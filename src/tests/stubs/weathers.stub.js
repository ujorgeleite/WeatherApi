const weathersStub = {
    
        cod: "200",
        message: 0,
        cnt: 40,
        list: [
          {
            dt: 1617732000,
            main: {
              temp: 301.69,
              feels_like: 301.83,
              temp_min: 301.69,
              temp_max: 302.25,
              pressure: 1016,
              sea_level: 1016,
              grnd_level: 1010,
              humidity: 46,
              temp_kf: -0.56,
            },
            weather: [
              {
                id: 802,
                main: "Clouds",
                description: "scattered clouds",
                icon: "03d",
              },
            ],
            clouds: { all: 27 },
            wind: { speed: 1.46, deg: 154 },
            visibility: 10000,
            pop: 0,
            sys: { pod: "d" },
            dt_txt: "2021-04-06 18:00:00",
          },
          {
            dt: 1617742800,
            main: {
              temp: 299.17,
              feels_like: 299.17,
              temp_min: 298.63,
              temp_max: 299.17,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 1010,
              humidity: 55,
              temp_kf: 0.54,
            },
            weather: [
              { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
            ],
            clouds: { all: 7 },
            wind: { speed: 3.43, deg: 123 },
            visibility: 10000,
            pop: 0.12,
            sys: { pod: "d" },
            dt_txt: "2021-04-06 21:00:00",
          },
          {
            dt: 1617753600,
            main: {
              temp: 295.99,
              feels_like: 296.18,
              temp_min: 295.64,
              temp_max: 295.99,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 1012,
              humidity: 71,
              temp_kf: 0.35,
            },
            weather: [
              { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
            ],
            clouds: { all: 2 },
            wind: { speed: 3.14, deg: 105 },
            visibility: 10000,
            pop: 0.08,
            sys: { pod: "n" },
            dt_txt: "2021-04-07 00:00:00",
          },
          {
            dt: 1617764400,
            main: {
              temp: 294.22,
              feels_like: 294.52,
              temp_min: 294.16,
              temp_max: 294.22,
              pressure: 1017,
              sea_level: 1017,
              grnd_level: 1012,
              humidity: 82,
              temp_kf: 0.06,
            },
          },
        ]

}

module.exports = weathersStub