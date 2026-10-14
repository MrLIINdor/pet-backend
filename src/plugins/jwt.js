import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

async function jwtPlugin(fastify) {
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
    sign: { expiresIn: "7d" },
  });
}

export default fp(jwtPlugin, { name: "jwt" });
