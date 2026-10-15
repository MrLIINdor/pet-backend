export const UserMeSchema = {
  tags: ["User"],
  summary: "Профиль текущего пользователя",

  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: "object",
      properties: {
        userId: { type: "string", format: "uuid" },
        nickname: { type: "string" },
        createdAt: { type: "string" },
      },
    },
  },
};

export const UserUpdateSchema = {
  tags: ["User"],
  summary: "Обновить свой профиль",

  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    minProperties: 1,
    properties: {
      nickname: { type: "string", minLength: 3, maxLength: 32 },
      currentPassword: { type: "string", minLength: 8, maxLength: 72 },
      newPassword: { type: "string", minLength: 8, maxLength: 72 },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        userId: { type: "string", format: "uuid" },
        nickname: { type: "string" },
        createdAt: { type: "string" },
      },
    },
  },
};
