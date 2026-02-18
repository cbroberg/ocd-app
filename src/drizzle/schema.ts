import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()),
});

export const habits = sqliteTable("habits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull().default("general"),
  targetFrequency: text("target_frequency").notNull().default("daily"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const symptoms = sqliteTable("symptoms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  anxietyLevel: integer("anxiety_level").notNull(),
  compulsionCount: integer("compulsion_count").notNull().default(0),
  compulsionDuration: integer("compulsion_duration").notNull().default(0),
  intrusiveThoughtFrequency: text("intrusive_thought_frequency")
    .notNull()
    .default("none"),
  resistanceLevel: integer("resistance_level").notNull().default(5),
  mood: text("mood").notNull().default("neutral"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: integer("difficulty").notNull().default(1),
  estimatedMinutes: integer("estimated_minutes").notNull().default(15),
  instructions: text("instructions"),
  isSystemExercise: integer("is_system_exercise", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const progressLogs = sqliteTable("progress_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  habitId: integer("habit_id").references(() => habits.id, {
    onDelete: "set null",
  }),
  exerciseId: integer("exercise_id").references(() => exercises.id, {
    onDelete: "set null",
  }),
  date: text("date").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  anxietyBefore: integer("anxiety_before"),
  anxietyAfter: integer("anxiety_after"),
  durationMinutes: real("duration_minutes"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});
