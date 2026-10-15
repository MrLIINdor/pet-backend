import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

async function swaggerPlugin(fastify) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Pet Бэкенд API",
        description: "Документация нашего Fastify сервера",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
}

export default fp(swaggerPlugin, { name: "swagger" });
