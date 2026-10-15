import { UserMeSchema, UserUpdateSchema } from "./user.schema.js";
import { createUserService } from "./user.service.js";

export default async function userRoutes(fastify) {
  const userService = createUserService({
    db: fastify.db,
  });

  fastify.get(
    "/me",
    { schema: UserMeSchema, onRequest: [fastify.authenticate] },
    async (request) => {
      const result = await userService.me({ userId: request.user.userId });
      return reply.code(200).send(result);
    },
  );

  fastify.put(
    "/me",
    { schema: UserUpdateSchema, onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const result = await userService.updateMe({
        userId: request.user.userId,
        data: request.body,
      });
      return reply.code(200).send(result);
    },
  );
}
