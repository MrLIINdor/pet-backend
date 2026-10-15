import authRoutes from "./auth/auth.route.js";
import userRoutes from "./user/user.route.js";

export default async function routes(fastify) {
  await fastify.register(authRoutes, { prefix: "/auth" });
  await fastify.register(userRoutes, { prefix: "/user" });
}
