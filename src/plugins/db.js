import fp from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import * as model from "../db/main.js";

async function dbPlugin(fastify) {
  await fastify.register(fastifyPostgres, {
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(fastify.pg.pool, { model });
  fastify.decorate("db", db);
}

export default fp(dbPlugin, {
  name: "db",
});
