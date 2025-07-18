ALTER TABLE "cats" ADD COLUMN "color" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cats" ADD COLUMN "hair_length" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cats" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;