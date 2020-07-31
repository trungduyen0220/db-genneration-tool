drop database if EXISTS dbgeneration;
create database dbgeneration;

ALTER DATABASE dbgeneration CHARACTER SET utf8 COLLATE utf8_general_ci;

use dbgeneration;

CREATE TABLE `user` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `email` varchar(255) NOT NULL,
 `password` varchar(60) NOT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE `user_role` (
 `user_id` int(11) NOT NULL,
 `role_id` int(11) NOT NULL,
 PRIMARY KEY (`user_id`,`role_id`),
);