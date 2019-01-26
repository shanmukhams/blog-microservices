# blog-microservices

CREATE TABLE `blogs` (
  `blogID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `content` mediumtext COLLATE utf8mb4_general_ci,
  `author` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dateCreted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datePublished` timestamp NULL DEFAULT NULL,
  `status` varchar(45) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'draft',
  PRIMARY KEY (`blogID`),
  UNIQUE KEY `blogID_UNIQUE` (`blogID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL AUTO_INCREMENT,
  `blogID` int(11) NOT NULL,
  `userID` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `dateCreted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentID`),
  KEY `blogID` (`blogID`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`blogID`) REFERENCES `blogs` (`blogid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
