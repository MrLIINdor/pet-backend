import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: uuid("user_id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),

  nickname: text("nickname").notNull().unique(),
  password: text("password").notNull(),

  created_at: timestamp("created_at").defaultNow(),
});

export const users_oauth = pgTable("users_oauth", {
  oauth_id: uuid("oauth_id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),

  user_id_fk: uuid("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),

  provider: text("provider").notNull(),
  provider_user_id: text("provider_user_id").notNull(),

  created_at: timestamp("created_at").defaultNow(),
});
