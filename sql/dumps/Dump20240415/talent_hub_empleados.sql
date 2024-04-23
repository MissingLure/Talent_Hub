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
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` varchar(8) NOT NULL,
  `primer_nombre` varchar(30) DEFAULT NULL,
  `segundo_nombre` varchar(30) DEFAULT NULL,
  `primer_apellido` varchar(30) DEFAULT NULL,
  `segundo_apellido` varchar(30) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `numero_identidad` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `id_pais` int DEFAULT NULL,
  `correo` varchar(80) DEFAULT NULL,
  `id_perfil_puesto` varchar(4) DEFAULT NULL,
  `id_departamento` varchar(4) DEFAULT NULL,
  `id_jefe` varchar(8) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_retiro` date DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_empleado`),
  KEY `FK__empleados__id_de__52593CB8` (`id_departamento`),
  KEY `FK__empleados__id_je__5441852A` (`id_jefe`),
  KEY `FK__empleados__id_pa__5629CD9C` (`id_pais`),
  KEY `FK__empleados__id_pe__5812160E` (`id_perfil_puesto`),
  CONSTRAINT `FK__empleados__id_de__5165187F` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `FK__empleados__id_de__52593CB8` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `FK__empleados__id_je__534D60F1` FOREIGN KEY (`id_jefe`) REFERENCES `empleados` (`id_empleado`),
  CONSTRAINT `FK__empleados__id_je__5441852A` FOREIGN KEY (`id_jefe`) REFERENCES `empleados` (`id_empleado`),
  CONSTRAINT `FK__empleados__id_pa__5535A963` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`),
  CONSTRAINT `FK__empleados__id_pa__5629CD9C` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`),
  CONSTRAINT `FK__empleados__id_pe__571DF1D5` FOREIGN KEY (`id_perfil_puesto`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`),
  CONSTRAINT `FK__empleados__id_pe__5812160E` FOREIGN KEY (`id_perfil_puesto`) REFERENCES `perfiles_puestos` (`id_perfil_puesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES ('1000001','Josue','Francisco','De Jesus','Moreno','32276440','1998-06-11','0501199807685','Col Stibys 3 Calle 2 y 3 Ave Casa 428',NULL,'joshuadejesus777@gmail.com','1001','1005',NULL,'2023-12-01',NULL,1),('1000002','Emilie','Henderson','Pren','Trunchion','32854566','2005-05-24','0501123456789','02066 Dixon Circle',NULL,'htrunchion0@microsoft.com','1005','1007',NULL,'2023-12-03',NULL,1),('1000003','Dory','Isacco','Ellyatt','Megarrell','320148969','1999-06-11','0501188908576','6 Coolidge Park',NULL,'imegarrell1@gmail.com','1002','1011',NULL,'2023-12-03',NULL,1),('1000004','Farlie','Edd','Abendroth','Crispe','32286440','2000-06-13','0501200008577','078 Pierstorff Parkway',NULL,'ecrispe2@gmail.com','1005','1014',NULL,'2023-12-03',NULL,1),('1000005','Merwin','Alberto','Serrano','Orellana','32875625','2000-01-20','0501199907525','Col. Fesitrahn',NULL,'merwin@gmail.com','1003','1005',NULL,'2023-12-03',NULL,1),('1000006','Mario','Javier','Lopez','Funez','32568565','2005-12-03','0501199804525','Col. Jardines del Valle',NULL,'mario@gmail.com','1002','1011',NULL,'2023-12-03',NULL,1),('1000007','Mario','Javier','Lopez','Funez','32568565','2005-12-03','0501199804785','Col. Jardines del Valle',NULL,'mariolopez@gmail.com','1002','1011',NULL,'2023-12-03',NULL,1),('1000008','sdfdsf','dsfdf','sdfsd','sdfsd','32556559','2005-12-03','05011233215252','ewrwerwr',NULL,'asds@gmail.com','1003','1006',NULL,'2023-12-03',NULL,1),('1000009','sdfdsf','dsfdf','sdfsd','sdfsd','32556559','2005-12-03','05011234515252','ewrwerwr',NULL,'asdd@gmail.com','1003','1006',NULL,'2023-12-03',NULL,1),('1000010','sdfdsf','dsfdf','sdfsd','sdfsd','32556559','2005-12-03','05011234514552','ewrwerwr',NULL,'asdd@gmail.com','1003','1006',NULL,'2023-12-03',NULL,1),('1000011','Josue','Francisco','De Jesus','Moreno','32276440','2005-12-04','0501123456781','Col Stibys 3 Calle 2 y 3 Ave Casa 428',NULL,'joshua@gmail.com','1003','1005',NULL,'2023-12-04',NULL,1);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:44
