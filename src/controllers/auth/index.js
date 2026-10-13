import authService from "./service.js";
import { postRegisterSchema } from "./schema.js";

export default async function authController(fastify, options) {
  fastify.post("/register", { schema: postRegisterSchema }, async (request, reply) => {
    const db = fastify.db;

    try {
      const newUser = await authService.registerUser(db, request.body);

      return reply.code(201).send({
        status: "success",
        message: "Вы успешно зарегистрированы!",
        user: newUser,
      });
    } catch (err) {
      if (err.statusCode === 400) {
        return reply.code(400).send({ status: "error", message: err.message });
      }

      fastify.log.error(err);
      return reply.code(500).send({ status: "error", message: "Внутренняя ошибка сервера" });
    }
  });
}
