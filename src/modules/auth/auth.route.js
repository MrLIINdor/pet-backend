import { AuthLoginSchema, AuthRegisterSchema } from "./auth.schema.js";
import { createAuthService } from "./auth.service.js";

export default async function authRoutes(fastify) {
  const authService = createAuthService({
    db: fastify.db,
    jwt: fastify.jwt,
  });

  fastify.post("/register", { schema: AuthRegisterSchema }, async (request, reply) => {
    const result = await authService.register(request.body);
    return reply.code(201).send(result);
  });

  fastify.post("/login", { schema: AuthLoginSchema }, async (request, reply) => {
    const result = await authService.login(request.body);
    return reply.code(200).send(result);
  });
}
