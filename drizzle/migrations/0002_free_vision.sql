CREATE TABLE `referred_people` (
	`id` varchar(36) NOT NULL,
	`company_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`contact` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `referred_people_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `referred_people` ADD CONSTRAINT `referred_people_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;