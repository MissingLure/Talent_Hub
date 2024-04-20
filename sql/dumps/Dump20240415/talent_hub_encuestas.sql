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
-- Table structure for table `encuestas`
--

DROP TABLE IF EXISTS `encuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encuestas` (
  `id_encuesta` int NOT NULL,
  `id_pefil_puesto` varchar(4) DEFAULT NULL,
  `id_habilidad` int DEFAULT NULL,
  `id_competencia` int DEFAULT NULL,
  `periodicidad` int DEFAULT NULL,
  PRIMARY KEY (`id_encuesta`),
  KEY `FK__encuestas__id_co__59FA5E80` (`id_competencia`),
  KEY `FK__encuestas__id_ha__5BE2A6F2` (`id_habilidad`),
  KEY `FK__encuestas__id_pe__5DCAEF64` (`id_pefil_puesto`),
  CONSTRAINT `FK__encuestas__id_co__59063A47` FOREIGN KEY (`id_competencia`) REFERENCES `competencias` (`id_competencia`),
  CONSTRAINT `FK__encuestas__id_co__59FA5E80` FOREIGN KEY (`id_competencia`) REFERENCES `competencias` (`id_competencia`),
  CONSTRAINT `FK__encuestas__id_ha__5AEE82B9` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidades` (`id_habilidad`),
  CONSTRAINT `FK__encuestas__id_ha__5BE2A6F2` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidades` (`id_habilidad`),
  CONSTRAINT `FK__encuestas__id_pe__5CD6CB2B` FOREIGN KEY (`id_pefil_puesto`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`),
  CONSTRAINT `FK__encuestas__id_pe__5DCAEF64` FOREIGN KEY (`id_pefil_puesto`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuestas`
--

LOCK TABLES `encuestas` WRITE;
/*!40000 ALTER TABLE `encuestas` DISABLE KEYS */;
/*!40000 ALTER TABLE `encuestas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:37
