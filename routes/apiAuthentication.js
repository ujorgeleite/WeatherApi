const Joi = require("joi");
const BaseRoute = require("./base/baseRoute");

class AuthenticationRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  authenticate() {
    return {
      path: "/authentication/{username}/{password}",
      method: "POST",
      config: {
        description: "Get token for apis when the user is valid",
        notes:
          "The user tha need acess to apis, should be send username and passwor fot this api, an after that, will receive to token to authenticate in apis.",
        tags: ["api"],
        validate: {
          params: Joi.object({
            username: Joi.string()
              .min(4)
              .max(20)
              .required()
              .description("This field represents username for user"),
            password: Joi.string()
              .min(4)
              .max(50)
              .required()
              .description(
                "This field represents password for user that need to authenticate in api."
              ),
          }),
        },
      },
      handler: async  (request) => {
        const { username, password } = request.params;
        const user = await this.db.read({ name: username, pwd: password });
        return {
          status: 200,
          token: "1231hvg23v12hgv31h2hg3v12hg3v1ghghv23gh2v13h",
        };
      },
    };
  }
}

module.exports = AuthenticationRoutes;
