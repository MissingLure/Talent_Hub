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
-- Table structure for table `perfil_puesto_habilidades`
--

DROP TABLE IF EXISTS `perfil_puesto_habilidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil_puesto_habilidades` (
  `id_perfil_puesto_habilidad` int NOT NULL,
  `id_pefil_puesto` varchar(4) DEFAULT NULL,
  `id_habilidad` int DEFAULT NULL,
  PRIMARY KEY (`id_perfil_puesto_habilidad`),
  KEY `FK__perfil_pu__id_ha__6383C8BA` (`id_habilidad`),
  KEY `FK__perfil_pu__id_pe__656C112C` (`id_pefil_puesto`),
  CONSTRAINT `FK__perfil_pu__id_ha__628FA481` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidades` (`id_habilidad`),
  CONSTRAINT `FK__perfil_pu__id_ha__6383C8BA` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidades` (`id_habilidad`),
  CONSTRAINT `FK__perfil_pu__id_pe__6477ECF3` FOREIGN KEY (`id_pefil_puesto`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`),
  CONSTRAINT `FK__perfil_pu__id_pe__656C112C` FOREIGN KEY (`id_pefil_puesto`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil_puesto_habilidades`
--

LOCK TABLES `perfil_puesto_habilidades` WRITE;
/*!40000 ALTER TABLE `perfil_puesto_habilidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfil_puesto_habilidades` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:42
