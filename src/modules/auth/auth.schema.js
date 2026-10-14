export const registerSchema = {
  tags: ["Auth"],
  summary: "Регистрация нового пользователя",

  body: {
    type: "object",
    required: ["nickname", "password"],
    properties: {
      nickname: { type: "string", minLength: 3, maxLength: 32 },
      password: { type: "string", minLength: 8, maxLength: 72 },
    },
  },

  response: {
    201: {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            userId: { type: "string", format: "uuid" },
            nickname: { type: "string" },
            createdAt: { type: "string" },
          },
        },
        token: { type: "string" },
      },
    },
  },
};
