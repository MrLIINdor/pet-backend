export const getUsersSchema = {
  tags: ["Auth"],
  summary: "Получение списка всех пользователей",

  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          user_id: { type: "string", format: "uuid" },
          nickname: { type: "string" },
          created_at: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

export const registerSchema = {
  tags: ["Auth"],
  summary: "Регистрация нового пользователя",

  body: {
    type: "object",
    required: ["nickname", "password"],
    properties: {
      nickname: {
        type: "string",
        minLength: 3,
        maxLength: 30,
        description: "Уникальный никнейм пользователя",
      },
      password: {
        type: "string",
        minLength: 6,
        description: "Пароль пользователя (минимум 6 символов)",
      },
    },
  },

  response: {
    201: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
        user: {
          type: "object",
          properties: {
            user_id: { type: "string", format: "uuid" },
            nickname: { type: "string" },
            created_at: { type: "string", format: "date-time" },
          },
        },
      },
    },

    400: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};

export const deleteUserSchema = {
  tags: ["Auth"],
  summary: "Удаление пользователя по его user_id",

  params: {
    type: "object",
    required: ["user_id"],
    properties: {
      user_id: {
        type: "string",
        format: "uuid",
        description: "UUID пользователя, которого нужно удалить",
      },
    },
  },

  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};
