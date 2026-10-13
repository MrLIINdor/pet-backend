import { eq } from "drizzle-orm";
import { users } from "../../db/models/users.js";
import bcrypt from "bcryptjs";

const authService = {
  async registerUser(db, { nickname, password }) {
    const [existingUser] = await db.select().from(users).where(eq(users.nickname, nickname));

    if (existingUser) {
      const error = new Error("Этот никнейм уже занят!");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        nickname,
        password: hashedPassword,
      })
      .returning();

    return newUser;
  },
};

export default authService;
