import authRoutes from "./auth/auth.route.js";

export default async function routes(fastify) {
  await fastify.register(authRoutes, { prefix: "/auth" });
}
