import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "../../db/models/users.js";
import { InvalidCredentialsError, NicknameTakenError } from "../../errors.js";

export function createAuthService({ db, jwt }) {
  return {
    async register({ nickname, password }) {
      const [existing] = await db
        .select({ userId: users.userId })
        .from(users)
        .where(eq(users.nickname, nickname))
        .limit(1);

      if (existing) {
        throw new NicknameTakenError();
      }

      const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

      const [user] = await db.insert(users).values({ nickname, password: passwordHash }).returning({
        userId: users.userId,
        nickname: users.nickname,
        createdAt: users.createdAt,
      });

      const token = jwt.sign({
        userId: user.userId,
        nickname: user.nickname,
      });

      return { user, token };
    },

    async login({ nickname, password }) {
      const [user] = await db.select().from(users).where(eq(users.nickname, nickname)).limit(1);

      if (!user) {
        throw new InvalidCredentialsError();
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new InvalidCredentialsError();
      }

      const token = jwt.sign({
        userId: user.userId,
        nickname: user.nickname,
      });

      return {
        user: {
          userId: user.userId,
          nickname: user.nickname,
        },
        token,
      };
    },
  };
}
