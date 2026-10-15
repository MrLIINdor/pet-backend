import Fastify from "fastify";
import dbPlugin from "./plugins/db.js";
import swaggerPlugin from "./plugins/swagger.js";
import routes from "./modules/index.js";
import jwtPlugin from "./plugins/jwt.js";
import errorHandlerPlugin from "./plugins/error-handler.js";

export async function build() {
  const app = Fastify({ logger: true });

  await app.register(dbPlugin);
  await app.register(jwtPlugin);
  await app.register(swaggerPlugin);
  await app.register(errorHandlerPlugin);
  await app.register(routes, { prefix: "/api/v1" });

  return app;
}
