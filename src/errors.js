import createError from "@fastify/error";

export const NicknameTakenError = createError(
  "NICKNAME_TAKEN",
  "Nickname already taken",
  409,
);

export const InvalidCredentialsError = createError(
  "INVALID_CREDENTIALS",
  "Invalid credentials",
  401,
);

export const NotFoundError = createError(
  "NOT_FOUND",
  "Resource not found",
  404,
);