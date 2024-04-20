-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 44.202.106.102    Database: talent_hub
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `id_empleado` varchar(8) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `contrasena` varchar(250) DEFAULT NULL,
  `sal` varchar(250) DEFAULT NULL,
  `rol` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `FK__usuarios__id_emp__6EF57B66` (`id_empleado`),
  CONSTRAINT `FK__usuarios__id_emp__6E01572D` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`),
  CONSTRAINT `FK__usuarios__id_emp__6EF57B66` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'1000001','joshuadejesus777@gmail.com','KGqFc6IVvslLSxpRDCJcJHXyTMnbAsYONu/zlQG7QwUObmBwa2KImTHFJtXeqDVamcnYTRNqNKGr5+q/HkyGMA==','FWHt5kNoGAU/z5e+6JobQPvj2jFXwpfAnJ78qCMsBmWmqiws3BtNkKQ515X+bJZIuxS+VlNTo4C9dqd8NVZ+AOBJGLr6ACow0265oJlJ+YyngmIW38nFv0ywYYDQEgHfOfLnF9maj+ohcwn58ACtLBPlqxkFjzReguIkWXBa/U4=','2'),(2,'1000002','htrunchion0@microsoft.com','DZM8mUhQ3kBWFYHm7GFt187Q8JTmMit91jQ2UmR1bB2igzQFG2zGDPaXWoj6awxLIaU+a85hbd0sCTccb/RM5Q==','XP/2Cm8H1uCZCzYOxaE6nJ3jg8Ye3Z4IKKuekcb6IhHqWmUm8bqLIth8kGZks/y+Q2M8GYDwGcdK2K8yiUwEs6w5bWOsR2XU60rYBm9attVmLCOOWhxcoHvmJb9e+zm7gejLIKqulu2RMDhkv8SYegoNc061ndY9Zc6pBOfHvmY=','1'),(3,'1000004','ecrispe2@gmail.com','N1X9JjjhRyCQcH5DP3XZQZzOfZQgvV2Cxpni7VrO0WR/GlHEILsZL2fG7FfI722TVs7+lpTrRRinC9n0ykhRPw==','k6tA9DDl4Bp5ZOgrxDZBDLZeChHKAcD2huOVnPHkU6Z0CcFyCVcodzR2LHqIPPObhTuPO8sMWDe7BG2fmBXixPo/w6xcgV35M9LShm1Ii+ONdmjjb+s3M0a1XvTJpDtFwcngxhZEqNcalCWzSRoha7Nk1iEO3ojLpM5LeNQqZ2Q=','1');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:20
