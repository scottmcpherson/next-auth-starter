CREATE TABLE IF NOT EXISTS "users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" varchar(320),
	"photo_url" text,
	"display_name" text,
	"is_active" boolean DEFAULT true,
	"preferences" json,
	"created_at" timestamp DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");