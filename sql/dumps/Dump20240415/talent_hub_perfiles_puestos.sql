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
-- Table structure for table `perfiles_puestos`
--

DROP TABLE IF EXISTS `perfiles_puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfiles_puestos` (
  `id_perfil_puesto` varchar(4) NOT NULL,
  `nombre_perfil` varchar(30) DEFAULT NULL,
  `id_departamento` varchar(4) DEFAULT NULL,
  `numero_plazas` int DEFAULT NULL,
  `id_requisito` int DEFAULT NULL,
  `id_perfil_anterior` varchar(4) DEFAULT NULL,
  `id_perfil_posterior` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id_perfil_puesto`),
  KEY `FK__perfiles___id_de__6754599E` (`id_departamento`),
  KEY `FK__perfiles___id_pe__6A30C649` (`id_perfil_anterior`),
  KEY `FK__perfiles___id_pe__6B24EA82` (`id_perfil_posterior`),
  KEY `FK__perfiles___id_re__6D0D32F4` (`id_requisito`),
  CONSTRAINT `FK__perfiles___id_de__66603565` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `FK__perfiles___id_de__6754599E` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `FK__perfiles___id_pe__68487DD7` FOREIGN KEY (`id_perfil_anterior`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`),
  CONSTRAINT `FK__perfiles___id_pe__693CA210` FOREIGN KEY (`id_perfil_posterior`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`),
  CONSTRAINT `FK__perfiles___id_pe__6A30C649` FOREIGN KEY (`id_perfil_anterior`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`),
  CONSTRAINT `FK__perfiles___id_pe__6B24EA82` FOREIGN KEY (`id_perfil_posterior`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`),
  CONSTRAINT `FK__perfiles___id_re__6C190EBB` FOREIGN KEY (`id_requisito`) REFERENCES `requisitos` (`id_requisito`),
  CONSTRAINT `FK__perfiles___id_re__6D0D32F4` FOREIGN KEY (`id_requisito`) REFERENCES `requisitos` (`id_requisito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfiles_puestos`
--

LOCK TABLES `perfiles_puestos` WRITE;
/*!40000 ALTER TABLE `perfiles_puestos` DISABLE KEYS */;
INSERT INTO `perfiles_puestos` VALUES ('1001','IT','1005',10,NULL,NULL,NULL),('1002','Manager','1011',2,NULL,NULL,NULL),('1003','Engineer','1012',5,NULL,NULL,NULL),('1004','Analyst','1013',3,NULL,NULL,NULL),('1005','Coordinator','1014',2,NULL,NULL,NULL),('1006','Assistant','1015',7,NULL,NULL,NULL);
/*!40000 ALTER TABLE `perfiles_puestos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:35
