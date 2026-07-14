ALTER TABLE `users` DROP FOREIGN KEY `users_company_id_companies_id_fk`;
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('superadmin','admin') DEFAULT 'admin';--> statement-breakpoint
ALTER TABLE `users` ADD `first_name` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE set null ON UPDATE no action;