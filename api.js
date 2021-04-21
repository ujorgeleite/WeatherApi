//TODO Criar uma rota de authenticação de usuários para retornar o token da api
//TODO Criar uma rota de obtenção de informações se vai chover no destino desejado pelo usuário

require("dotenv/config");
const Hapi = require("@hapi/hapi");
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");


const params = {
  database: process.env.MONGODB_DATABASE_DATABASE,
  user:process.env.MONGODB_DATABASE_USER,
  pwd:process.env.MONGODB_DATABASE_PWD,
  url:process.env.MONGODB_DATABASE_URL,
  aliasConnection:process.env.MONGODB_DATABASE_ALIAS_CONNECTION
}

const { Strategy, Mongodb } = require("./database/index");
const strategy = new Strategy(new Mongodb(params))
const WeatherRoutes = require("./routes/apiWeather");
const AuthentitcationRoutes = require("./routes/apiAuthentication");

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

const main = async () => {

  await strategy.connect()

  const app = await Hapi.Server({
    host: "localhost",
    port: 4000,
  });

  const swaggerOptions = {
    info: {
      title: "Api Weather - by @ujorgeleite",
      version: "v1.0",
    },
  };

  await app.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  await app.start();
  console.log("Server running on %s", app.info.uri);

  app.route(
    mapRoutes(
      new WeatherRoutes(process.env.WEATHER_API_KEY),
      WeatherRoutes.methods()
    )
  );
  app.route(
    mapRoutes(new AuthentitcationRoutes(strategy), AuthentitcationRoutes.methods())
  );

  return app;
};

module.exports = main();
