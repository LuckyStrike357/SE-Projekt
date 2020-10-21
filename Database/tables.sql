DROP DATABASE visitor_tracker;
CREATE DATABASE visitor_tracker;
USE visitor_tracker;

DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor`(

 `first_name` varchar(255) NOT NULL,
 `last_name` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `street` varchar(255) NOT NULL,
 `number` int(10) NOT NULL,
 `place` varchar(255) NOT NULL,
 `postal_code` int(10) NOT NULL,
 `telephone` varchar(255) NOT NULL,
 PRIMARY KEY (`email`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `booking`;
CREATE TABLE `booking`(
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `start` date NOT NULL,
 `end` date NOT NULL,
 `visitor` varchar(255),
 FOREIGN KEY(`visitor`) REFERENCES `visitor`(`email`) ON DELETE CASCADE,
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
 `start` date NOT NULL,
 `end` date NOT NULL,
 `capacity` int(10) unsigned NOT NULL,
 `booking_id` int(10) unsigned,
 FOREIGN KEY (booking_id) REFERENCES `booking`(`id`) ON DELETE CASCADE,
 PRIMARY KEY(`id`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;

