import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const catsTable = pgTable("cats", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    image: text("image").notNull(),
});