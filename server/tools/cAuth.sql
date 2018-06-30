/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `location_id` integer NOT NULL , 
  `province_id` integer NOT NULL, 
  `city_id` integer NOT NULL, 
  `block_id` integer NOT NULL,
  `street_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `door_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='location';

DROP TABLE IF EXISTS `userInfo`;
CREATE TABLE `userInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_phone` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL
  PRIMARY KEY (`open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='userInfo';

DROP TABLE IF EXISTS `cinema`;
CREATE TABLE `cinema` (
  `cinema_id` integer NOT NULL , 
  `cinema_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cinema_phone` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cinema_des` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cinema_star` float NOT NULL,
  `lowest_price` float NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `cinema_img_url` varchar(200),
  PRIMARY KEY (`cinema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='cinema';

DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `movie_id` integer NOT NULL , 
  `movie_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `movie_des` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `movie_star` integer NOT NULL,
  `movie_img_url` varchar(200),
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='movie';

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `movie_or_cinema_id` integer NOT NULL , 
  `star` integer NOT NULL,
  `comment_type` integer NOT NULL,
  PRIMARY KEY (`movie_or_cinema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='comment';

DROP TABLE IF EXISTS `screening`;
CREATE TABLE `screening` (
  `screening_id` integer NOT NULL,
  `cinema_id` integer NOT NULL , 
  `movie_id` integer NOT NULL, 
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`screening_id`, `cinema_id`, `movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='screening';

DROP TABLE IF EXISTS `seat`;
CREATE TABLE `seat` (
  `screening_id` integer NOT NULL,
  `cinema_id` integer NOT NULL , 
  `movie_id` integer NOT NULL, 
  `seat_id` integer NOT NULL,
  `row` integer NOT NULL, 
  `col` integer NOT NULL,
  `state` integer NOT NULL,
  PRIMARY KEY (`screening_id`, `cinema_id`, `movie_id`, `seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='seat';

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket` (
  `ticket_id` integer NOT NULL, 
  `cinema_id` integer NOT NULL , 
  `movie_id` integer NOT NULL,
  `screening_id` integer NOT NULL, 
  `seat_id` integer NOT NULL,
  `price` float NOT NULL,
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ticket';

DROP TABLE IF EXISTS `ticketOrder`;
CREATE TABLE `ticketOrder` (
  `ticket_id` integer NOT NULL, 
  `order_id` integer NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ticketOrder';

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `item_id` integer NOT NULL, 
  `cinema_id` integer NOT NULL , 
  `price` float NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_des` varchar(1000) NOT NULL, 
  PRIMARY KEY (`cinema_id`, `item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='item';

DROP TABLE IF EXISTS `itemOrder`;
CREATE TABLE `itemOrder` (
  `item_id` integer NOT NULL, 
  `order_id` integer NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='itemOrder';

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_id` integer NOT NULL , 
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` integer NOT NULL, 
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totalPrice` float NOT NULL, 
  `note` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='order';

DROP TABLE IF EXISTS `province`;
CREATE TABLE `province` (
  `province_id` integer NOT NULL,
  `province_name` varchar(50) NOT NULL,
  PRIMARY KEY (`province_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='province';

DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `province_id` integer NOT NULL,
  `city_id` integer NOT NULL,
  `city_name` varchar(50) NOT NULL,
  PRIMARY KEY (`province_id`, `city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='city';

DROP TABLE IF EXISTS `block`;
CREATE TABLE `block` (
  `province_id` integer NOT NULL,
  `city_id` integer NOT NULL,
  `block_id` integer NOT NULL,
  `block_name` varchar(50) NOT NULL,
  PRIMARY KEY (`province_id`, `city_id`, `block_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='block';


DROP TABLE IF EXISTS `locationUserOrCinema`;
CREATE TABLE `locationUserOrCinema` (
  `location_id` integer NOT NULL,
  `type` integer NOT NULL,
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci,
  `cinema_id` integer
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='locationUserOrCinema';

DROP TABLE IF EXISTS `cinemaMovie`;
CREATE TABLE `cinemaMovie` (
  `cinema_id` integer NOT NULL,
  `movie_id` integer NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='cinemaMovie';

SET FOREIGN_KEY_CHECKS = 1;
