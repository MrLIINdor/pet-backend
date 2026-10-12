import authController from "./auth/index.js";

export default async function mainController(fastify, options) {
  fastify.register(authController, { prefix: "/auth" });
}
