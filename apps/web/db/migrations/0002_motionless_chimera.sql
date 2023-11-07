DO $$ BEGIN
 CREATE TYPE "organization_type" AS ENUM('personal', 'organization');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "organizations" ADD COLUMN "organization_type" "organization_type";