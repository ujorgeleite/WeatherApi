//TODO Criar uma classe para chamar api google e validar como vai estar o clima no destino
//TODO Criar uma rota de authenticação de usuários para retornar o token da api
//TODO Criar uma rota de obtenção de informações se vai chover no destino desejado pelo usuário

require('dotenv/config')
const Hapi = require("hapi");

const WheaterRoutes = require("./routes/apiWeather");

const app = Hapi.Server({
  port: 4000,
  host: "localhost",
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

const main = async () => {
  app.route([...mapRoutes(new WheaterRoutes(process.env.WEATHER_API_KEY), WheaterRoutes.methods())]);

  await app.start();
  console.log("Server running on %s", app.info.uri);

  return app;
};

module.exports = main();
