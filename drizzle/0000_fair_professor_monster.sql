CREATE TABLE `activities_local` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`status` text NOT NULL,
	`title` text,
	`notes` text,
	`start_at` integer NOT NULL,
	`end_at` integer,
	`distance_m` integer DEFAULT 0 NOT NULL,
	`duration_s` integer DEFAULT 0 NOT NULL,
	`avg_speed_mps` real,
	`avg_pace_s_per_km` real,
	`photo_uri` text,
	`server_id` integer,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gps_points` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`activity_id` text NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`alt_m` real,
	`accuracy_m` real,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sync_queue` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`payload_json` text NOT NULL,
	`created_at` integer NOT NULL
);
