import fp from "fastify-plugin";
import { STATUS_CODES } from "node:http";

async function errorHandlerPlugin(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    if (error.statusCode && error.code) {
      request.log.warn({ code: error.code, statusCode: error.statusCode }, error.message);

      return reply.code(error.statusCode).send({
        statusCode: error.statusCode,
        code: error.code,
        error: STATUS_CODES[error.statusCode] ?? "Error",
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      statusCode: 500,
      code: "INTERNAL_ERROR",
      error: "Internal Server Error",
      message: "Something went wrong",
    });
  });
}

export default fp(errorHandlerPlugin, { name: "error-handler" });
