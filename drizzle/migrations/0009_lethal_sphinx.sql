CREATE TABLE `company_access_grants` (
	`id` varchar(36) NOT NULL,
	`company_id` varchar(36) NOT NULL,
	`type` enum('country','university','study_area') NOT NULL,
	`value` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `company_access_grants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `students` DROP FOREIGN KEY `students_passport_file_id_files_id_fk`;
--> statement-breakpoint
ALTER TABLE `students` DROP FOREIGN KEY `students_educational_file_id_files_id_fk`;
--> statement-breakpoint
ALTER TABLE `students` DROP FOREIGN KEY `students_other_file_id_files_id_fk`;
--> statement-breakpoint
ALTER TABLE `students` ADD `created_by` varchar(36);--> statement-breakpoint
ALTER TABLE `students` ADD `company_id` varchar(36);--> statement-breakpoint
ALTER TABLE `students` ADD `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `company_access_grants` ADD CONSTRAINT `company_access_grants_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_passport_file_id_files_id_fk` FOREIGN KEY (`passport_file_id`) REFERENCES `files`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_educational_file_id_files_id_fk` FOREIGN KEY (`educational_file_id`) REFERENCES `files`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_other_file_id_files_id_fk` FOREIGN KEY (`other_file_id`) REFERENCES `files`(`id`) ON DELETE set null ON UPDATE no action;