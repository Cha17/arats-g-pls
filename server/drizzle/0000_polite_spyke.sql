CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"kinde_id" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"picture_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_kinde_id_unique" UNIQUE("kinde_id")
);
