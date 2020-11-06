DROP DATABASE if EXISTS visitor_tracker;
CREATE DATABASE visitor_tracker;
USE visitor_tracker;

DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor`(

 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `first_name` varchar(255) NOT NULL,
 `last_name` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `street` varchar(255) NOT NULL,
 `number` int(10) NOT NULL,
 `place` varchar(255) NOT NULL,
 `postal_code` int(10) NOT NULL,
 `telephone` varchar(255) NOT NULL,
 PRIMARY KEY (`id`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `booking`;
CREATE TABLE `booking`(
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `start` datetime NOT NULL,
 `end` datetime NOT NULL,
 `visitor` int(10) unsigned,
 FOREIGN KEY(visitor) REFERENCES `visitor`(`id`) ON DELETE CASCADE,
 PRIMARY KEY(`id`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`(

 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `first_name` varchar(255) NOT NULL,
 `last_name` varchar(255) NOT NULL,
 PRIMARY KEY (`id`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `timeslot`;
CREATE TABLE `timeslot`(
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `start` datetime NOT NULL,
 `end` datetime NOT NULL,
 `capacity` int(10) unsigned NOT NULL,
 PRIMARY KEY(`id`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `timeslot_booking`;
CREATE TABLE `timeslot_booking` (
    `timeslot_id` int unsigned not null,
    `booking_id` int unsigned not null,
    CONSTRAINT `timeslot_booking_timeslot` foreign key (`timeslot_id`) references `timeslot`(`id`),
    CONSTRAINT `timeslot_booking_booking` foreign key (`booking_id`) references `booking`(`id`),
    CONSTRAINT `timeslot_booking_unique` UNIQUE (`timeslot_id`, `booking_id`)
)


