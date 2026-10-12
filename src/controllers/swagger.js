import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default async function initSwagger(fastify) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Pet Бэкенд API",
        description: "Документация нашего Fastify сервера",
        version: "1.0.0",
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
}
