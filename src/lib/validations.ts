import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const habitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().default("general"),
  targetFrequency: z.enum(["daily", "weekly", "as-needed"]).default("daily"),
  isActive: z.boolean().default(true),
});

export const symptomSchema = z.object({
  date: z.string().min(1, "Date is required"),
  anxietyLevel: z.number().min(0).max(10),
  compulsionCount: z.number().min(0).default(0),
  compulsionDuration: z.number().min(0).default(0),
  intrusiveThoughtFrequency: z
    .enum(["none", "rare", "occasional", "frequent", "constant"])
    .default("none"),
  resistanceLevel: z.number().min(0).max(10).default(5),
  mood: z
    .enum(["great", "good", "neutral", "bad", "terrible"])
    .default("neutral"),
  notes: z.string().optional(),
});

export const exerciseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum([
    "contamination",
    "checking",
    "symmetry",
    "intrusive-thoughts",
    "general",
  ]),
  difficulty: z.number().min(1).max(5).default(1),
  estimatedMinutes: z.number().min(1).default(15),
  instructions: z.string().optional(),
});

export const progressLogSchema = z.object({
  habitId: z.number().optional(),
  exerciseId: z.number().optional(),
  date: z.string().min(1, "Date is required"),
  completed: z.boolean().default(false),
  anxietyBefore: z.number().min(0).max(10).optional(),
  anxietyAfter: z.number().min(0).max(10).optional(),
  durationMinutes: z.number().min(0).optional(),
  notes: z.string().optional(),
});
