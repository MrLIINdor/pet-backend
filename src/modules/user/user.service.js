import { and, eq, ne } from "drizzle-orm";
import { users } from "../../db/models/users.js";
import { InvalidCredentialsError, NicknameTakenError, NotFoundError } from "../../errors.js";
import bcrypt from "bcryptjs";

export function createUserService({ db }) {
  return {
    async me({ userId }) {
      const [user] = await db
        .select({
          userId: users.userId,
          nickname: users.nickname,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.userId, userId))
        .limit(1);

      if (!user) {
        throw new NotFoundError();
      }

      return user;
    },

    async updateMe({ userId, data }) {
      const { nickname, currentPassword, newPassword } = data;

      const [taken] = await db
        .select({ userId: users.userId })
        .from(users)
        .where(and(eq(users.nickname, nickname), ne(users.userId, userId)))
        .limit(1);

      if (taken) throw new NicknameTakenError();

      const [user] = await db
        .select({ password: users.password })
        .from(users)
        .where(eq(users.userId, userId))
        .limit(1);

      if (!user) throw new NotFoundError();

      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) throw new InvalidCredentialsError();

      const newHash = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS));

      const [updated] = await db
        .update(users)
        .set({ nickname, password: newHash })
        .where(eq(users.userId, userId))
        .returning({
          userId: users.userId,
          nickname: users.nickname,
          createdAt: users.createdAt,
        });

      if (!updated) throw new NotFoundError();
      return updated;
    },
  };
}
