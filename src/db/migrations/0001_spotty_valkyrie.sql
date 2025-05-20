ALTER TABLE "books" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "updated_at" SET NOT NULL;