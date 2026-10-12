// import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users } from "../../db/models/users.js";
import { deleteUserSchema, getUsersSchema, registerSchema } from "./schema.js";

export default async function authController(fastify, options) {
  fastify.post("/register", { schema: registerSchema }, async (request, reply) => {
    // Благодарю валидации Fastify, мы уверены, что никнейм и пароль пришли правильными
    const { nickname, password } = request.body;
    const db = fastify.db;

    try {
      // const hashed_password = await bcrypt.hash(password, 10);

      const [new_user] = await db
        .insert(users)
        .values({
          nickname: nickname,
          password: password,
        })
        .returning(); // Просим базу вернуть созданную строку

      reply.code(201);

      return {
        status: "success",
        message: "Вы успешно зарегистрированы!",
        user: new_user,
      };
    } catch (err) {
      if (err.message?.includes("violates unique constraint")) {
        reply.code(400);
        return { status: "error", message: "Этот никнейм уже занят!" };
      }

      fastify.log.error(err);
      reply.code(500);
      return { status: "error", message: "Внутренняя ошибка сервера" };
    }
  });

  fastify.get("/users", { schema: getUsersSchema }, async (request, reply) => {
    const db = fastify.db;

    try {
      const allUsers = await db.select().from(users);

      return allUsers;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500);
      return { status: "error", message: "Не удалось получить пользователей" };
    }
  });

  fastify.delete("/users/:user_id", { schema: deleteUserSchema }, async (request, reply) => {
    const { user_id } = request.params;
    const db = fastify.db;

    const [existingUser] = await db.select().from(users).where(eq(users.user_id, user_id));

    if (!existingUser) {
      reply.code(404);
      return { status: "error", message: "Пользователь с таким ID не найден!" };
    }

    await db.delete(users).where(eq(users.user_id, user_id));

    return {
      status: "success",
      message: `Пользователь ${existingUser.nickname} успешно стерт из системы!`,
    };
  });
}
