DO $$ BEGIN
 CREATE TYPE "organization_type" AS ENUM('personal', 'organization');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "chat_messages" (
	"tab_content_id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"chat_topic_id" integer
);

CREATE TABLE IF NOT EXISTS "chat_topics" (
	"chat_topic_id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"user_id" text,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "organizations" (
	"organization_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"organization_type" organization_type,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "permissions" (
	"permission_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "prices" (
	"price_id" text PRIMARY KEY NOT NULL,
	"unit_amount" text,
	"currency" varchar(10),
	"interval" varchar(100),
	"active" boolean DEFAULT true,
	"product_id" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "products" (
	"product_id" text PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"active" boolean DEFAULT true,
	"tier" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "roles" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "roles_permissions" (
	"role_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_role_id_permission_id" PRIMARY KEY("role_id","permission_id");

CREATE TABLE IF NOT EXISTS "subscriptions" (
	"subscription_id" text PRIMARY KEY NOT NULL,
	"status" varchar(100),
	"metadata" json,
	"price_id" varchar(100),
	"cancel_at_period_end" boolean DEFAULT false,
	"current_period_end" timestamp,
	"user_id" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" varchar(320),
	"photo_url" text,
	"name" text,
	"is_active" boolean DEFAULT true,
	"preferences" json,
	"stripe_customer_id" text,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "users_roles" (
	"user_id" text NOT NULL,
	"role_id" integer NOT NULL,
	"organization_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_user_id_role_id_organization_id" PRIMARY KEY("user_id","role_id","organization_id");

CREATE TABLE IF NOT EXISTS "users_to_organizations" (
	"user_id" text NOT NULL,
	"organization_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_to_organizations" ADD CONSTRAINT "users_to_organizations_user_id_organization_id" PRIMARY KEY("user_id","organization_id");

CREATE UNIQUE INDEX IF NOT EXISTS "permissions_name_idx" ON "permissions" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "prices_product_active_idx" ON "prices" ("product_id","active");
CREATE UNIQUE INDEX IF NOT EXISTS "products_active_idx" ON "products" ("active");
CREATE UNIQUE INDEX IF NOT EXISTS "roles_name_idx" ON "roles" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "roles_user_id_idx" ON "subscriptions" ("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripe_customer_id_idx" ON "users" ("stripe_customer_id");
DO $$ BEGIN
 ALTER TABLE "chat_topics" ADD CONSTRAINT "chat_topics_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_permission_id_permissions_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_organization_id_organizations_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_to_organizations" ADD CONSTRAINT "users_to_organizations_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_to_organizations" ADD CONSTRAINT "users_to_organizations_organization_id_organizations_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
