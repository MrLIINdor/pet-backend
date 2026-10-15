import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

async function jwtPlugin(fastify) {
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
    sign: { expiresIn: "7d" },
  });

  fastify.decorate("authenticate", async function (request, reply) {
    await request.jwtVerify();
  });
}

export default fp(jwtPlugin, { name: "jwt" });
