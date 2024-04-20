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
-- Table structure for table `competencias`
--

DROP TABLE IF EXISTS `competencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competencias` (
  `id_competencia` int NOT NULL,
  `nombre_competencia` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `peso` int DEFAULT NULL,
  PRIMARY KEY (`id_competencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competencias`
--

LOCK TABLES `competencias` WRITE;
/*!40000 ALTER TABLE `competencias` DISABLE KEYS */;
INSERT INTO `competencias` VALUES (1,'Adaptabilidad',NULL,0),(2,'Análisis de Datos de Producción',NULL,0),(3,'Capacidad Analítica',NULL,0),(4,'Comunicación',NULL,0),(5,'Comunicación Asertiva',NULL,0),(6,'Comunicación Efectiva',NULL,0),(7,'Comunicación Interpersonal',NULL,0),(8,'Control de Calidad',NULL,0),(9,'Creatividad',NULL,0),(10,'Cumplimiento de Metas de Producción',NULL,0),(11,'Desarrollo de Equipos',NULL,0),(12,'Desarrollo de Relaciones',NULL,0),(13,'Desarrollo de Talento',NULL,0),(14,'Desempeño bajo Presión',NULL,0),(15,'Eficiencia de Maquinaria',NULL,0),(16,'Eficiencia en la Producción',NULL,0),(17,'Empatía',NULL,0),(18,'Enfoque en Resultados',NULL,0),(19,'Estandarización de Procesos',NULL,0),(20,'Ética Profesional',NULL,0),(21,'Flexibilidad',NULL,0),(22,'Gestión de Conflictos',NULL,0),(23,'Gestión de Equipos',NULL,0),(24,'Gestión de Inventarios',NULL,0),(25,'Gestión de la Innovación',NULL,0),(26,'Gestión de Personal',NULL,0),(27,'Gestión de Proyectos',NULL,0),(28,'Gestión de Recursos',NULL,0),(29,'Gestión del Cambio',NULL,0),(30,'Gestión del Rendimiento',NULL,0),(31,'Gestión del Tiempo',NULL,0),(32,'Habilidad Analítica',NULL,0),(33,'Habilidad de Negociación',NULL,0),(34,'Iniciativa',NULL,0),(35,'Innovación',NULL,0),(36,'Innovación en Producto',NULL,0),(37,'Liderazgo',NULL,0),(38,'Mantenimiento Preventivo',NULL,0),(39,'Mejora Continua',NULL,0),(40,'Mejora de Procesos',NULL,0),(41,'Negociación',NULL,0),(42,'Optimización de Tiempos',NULL,0),(43,'Orientación al Cliente',NULL,0),(44,'Pensamiento Crítico',NULL,0),(45,'Pensamiento Estratégico',NULL,0),(46,'Planificación de Producción',NULL,0),(47,'Planificación Estratégica',NULL,0),(48,'Reducción de Costos',NULL,0),(49,'Resiliencia',NULL,0),(50,'Resolución de Conflictos',NULL,0),(51,'Resolución de Problemas',NULL,0),(52,'Seguimiento de Indicadores',NULL,0),(53,'Seguridad en el Trabajo',NULL,0),(54,'Sostenibilidad Ambiental\r\n',NULL,0),(55,'Toma de Decisiones\r\n',NULL,0),(56,'Trabajo Bajo Presión\r\n',NULL,0),(57,'Trabajo Colaborativo\r\n',NULL,0),(58,'Trabajo en Equipo',NULL,0);
/*!40000 ALTER TABLE `competencias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:32
