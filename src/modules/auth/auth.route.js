import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "../../db/models/users.js";
import { registerSchema } from "./auth.schema.js";

export default async function authRoutes(fastify) {
  fastify.post("/register", { schema: registerSchema }, async (request, reply) => {
    const { nickname, password } = request.body;

    const [existing] = await fastify.db
      .select({ userId: users.userId })
      .from(users)
      .where(eq(users.nickname, nickname))
      .limit(1);

    if (existing) {
      return reply.code(409).send({
        statusCode: 409,
        code: "NICKNAME_TAKEN",
        error: "Conflict",
        message: "Nickname already taken",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await fastify.db
      .insert(users)
      .values({ nickname, password: passwordHash })
      .returning({
        userId: users.userId,
        nickname: users.nickname,
        createdAt: users.createdAt,
      });

    const token = fastify.jwt.sign({
      userId: user.userId,
      nickname: user.nickname,
    });

    return reply.code(201).send({ user, token });
  });
}
