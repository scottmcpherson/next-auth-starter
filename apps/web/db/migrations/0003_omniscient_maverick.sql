CREATE TABLE IF NOT EXISTS "groups" (
	"group_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" text,
	"sequence" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

ALTER TABLE "tabs" RENAME COLUMN "order" TO "sequence";
ALTER TABLE "connections" ADD COLUMN "group_id" integer;
CREATE UNIQUE INDEX IF NOT EXISTS "groups_user_id_idx" ON "groups" ("user_id");
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_group_id_groups_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
