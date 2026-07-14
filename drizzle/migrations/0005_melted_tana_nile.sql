CREATE TABLE `files` (
	`id` varchar(36) NOT NULL,
	`company_id` varchar(36),
	`file_name` varchar(255) NOT NULL,
	`file_url` varchar(500) NOT NULL,
	`file_type` varchar(100),
	`mime_type` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `students` ADD `passport_file_id` varchar(36);--> statement-breakpoint
ALTER TABLE `students` ADD `educational_file_id` varchar(36);--> statement-breakpoint
ALTER TABLE `students` ADD `other_file_id` varchar(36);--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_passport_file_id_files_id_fk` FOREIGN KEY (`passport_file_id`) REFERENCES `files`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_educational_file_id_files_id_fk` FOREIGN KEY (`educational_file_id`) REFERENCES `files`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_other_file_id_files_id_fk` FOREIGN KEY (`other_file_id`) REFERENCES `files`(`id`) ON DELETE no action ON UPDATE no action;