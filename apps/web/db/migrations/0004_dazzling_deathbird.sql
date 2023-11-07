ALTER TABLE "connections" RENAME COLUMN "connection_url" TO "url";
ALTER TABLE "connections" ADD COLUMN "name" text;