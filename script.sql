CREATE DATABASE app;

USE app;

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `errors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stack` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(2555) NOT NULL,
  `description` varchar(45) NOT NULL,
  `url` varchar(2555) NOT NULL,
  `accountId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_accounts_by_posts_idx` (`accountId`),
  CONSTRAINT `app_accounts_by_posts` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
