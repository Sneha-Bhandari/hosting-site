CREATE TABLE `companies` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`contact_number` varchar(50) NOT NULL,
	`financial_contact` varchar(50),
	`address1` varchar(255),
	`address2` varchar(255),
	`city` varchar(100),
	`country` varchar(100),
	`state` varchar(100),
	`zip_code` varchar(20),
	`website` varchar(255),
	`regional_incharge` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);