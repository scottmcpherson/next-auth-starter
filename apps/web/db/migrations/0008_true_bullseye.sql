CREATE TABLE IF NOT EXISTS "tab_content" (
	"tab_content_id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"tab_id" integer
);

DO $$ BEGIN
 ALTER TABLE "tab_content" ADD CONSTRAINT "tab_content_tab_id_tabs_tab_id_fk" FOREIGN KEY ("tab_id") REFERENCES "tabs"("tab_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
