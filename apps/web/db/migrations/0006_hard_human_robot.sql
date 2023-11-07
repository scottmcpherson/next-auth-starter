ALTER TABLE "tabs" ADD COLUMN "user_id" text;
DO $$ BEGIN
 ALTER TABLE "tabs" ADD CONSTRAINT "tabs_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
