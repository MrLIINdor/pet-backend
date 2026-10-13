import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import initSwagger from "./src/controllers/swagger.js";
import mainController from "./src/controllers/main.js";

const fastify = Fastify({ logger: true });

const connectionString = process.env.DATABASE_URL;

fastify.register(fastifyPostgres, { connectionString: connectionString });

await fastify.register(async (instance) => {
  fastify.decorate("db", drizzle(instance.pg.pool));
});

await initSwagger(fastify);

fastify.register(mainController);

const init = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
  }
};

init();
