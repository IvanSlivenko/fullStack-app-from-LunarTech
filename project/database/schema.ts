import { pgEnum } from './../node_modules/drizzle-orm/pg-core/columns/enum.d';
import { integer, uuid, pgTable, varchar, text } from "drizzle-orm/pg-core";

export STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export ROLE_ENUM = pgEnum("ROLE", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name",   {length: 255}).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: 




});