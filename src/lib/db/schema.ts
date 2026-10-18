import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ─── Projects ────────────────────────────────────────────────────────
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  techStack: text("tech_stack", { mode: "json" }).notNull().$type<string[]>(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  imageUrl: text("image_url"),
  displayIndex: integer("display_index").notNull().default(0),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ─── Experiences ─────────────────────────────────────────────────────
export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  role: text("role").notNull(),
  company: text("company").notNull(),
  companyUrl: text("company_url"),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  techStack: text("tech_stack", { mode: "json" }).notNull().$type<string[]>(),
  displayIndex: integer("display_index").notNull().default(0),
});

// ─── Profile (single row) ───────────────────────────────────────────
export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  resumeUrl: text("resume_url"),
  avatarUrl: text("avatar_url"),
});

// ─── Social Links ────────────────────────────────────────────────────
export const socialLinks = sqliteTable("social_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  platform: text("platform").notNull(), // github, linkedin, twitter, etc.
  label: text("label").notNull(), // Display name
  url: text("url").notNull(),
  icon: text("icon").notNull(), // Icon identifier (e.g., "github", "linkedin")
  displayIndex: integer("display_index").notNull().default(0),
});

// ─── Type exports ────────────────────────────────────────────────────
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;

export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;

export type SocialLink = typeof socialLinks.$inferSelect;
export type NewSocialLink = typeof socialLinks.$inferInsert;
