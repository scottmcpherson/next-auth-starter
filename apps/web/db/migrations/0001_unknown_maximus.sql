DO $$ BEGIN
 CREATE TYPE "connection_type" AS ENUM('postgresql', 'mysql');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "tab_type" AS ENUM('sql', 'table', 'generatedData');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "connections" (
	"connection_id" serial PRIMARY KEY NOT NULL,
	"connection_type" connection_type,
	"connection_url" text,
	"organization_id" integer,
	"user_id" text
);

CREATE TABLE IF NOT EXISTS "organizations" (
	"organization_id" serial PRIMARY KEY NOT NULL,
	"name" text,
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

CREATE TABLE IF NOT EXISTS "tabs" (
	"tab_id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"name" text,
	"tab_type" tab_type,
	"connection_id" integer
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

ALTER TABLE "users" RENAME COLUMN "display_name" TO "name";
ALTER TABLE "users" ADD COLUMN "stripe_customer_id" text;
CREATE UNIQUE INDEX IF NOT EXISTS "permissions_name_idx" ON "permissions" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "prices_product_active_idx" ON "prices" ("product_id","active");
CREATE UNIQUE INDEX IF NOT EXISTS "products_active_idx" ON "products" ("active");
CREATE UNIQUE INDEX IF NOT EXISTS "roles_name_idx" ON "roles" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "roles_user_id_idx" ON "subscriptions" ("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripe_customer_id_idx" ON "users" ("stripe_customer_id");
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_organization_id_organizations_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "tabs" ADD CONSTRAINT "tabs_connection_id_connections_connection_id_fk" FOREIGN KEY ("connection_id") REFERENCES "connections"("connection_id") ON DELETE no action ON UPDATE no action;
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
