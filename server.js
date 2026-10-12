import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import initSwagger from "./src/controllers/swagger.js";
import mainController from "./src/controllers/main.js";

const fastify = Fastify({ logger: true });

// Забираем готовую строку подключения из .env, которую прокинул Docker
const connectionString = process.env.DATABASE_URL;

// 1. Регистрируем драйвер базы данных
fastify.register(fastifyPostgres, { connectionString: connectionString });

// 2. Инициализируем Drizzle ORM и делимся им со всем приложением
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
