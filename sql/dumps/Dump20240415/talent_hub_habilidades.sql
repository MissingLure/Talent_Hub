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
-- Table structure for table `habilidades`
--

DROP TABLE IF EXISTS `habilidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilidades` (
  `id_habilidad` int NOT NULL,
  `nombre_habilidad` varchar(50) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `peso` int DEFAULT NULL,
  PRIMARY KEY (`id_habilidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades`
--

LOCK TABLES `habilidades` WRITE;
/*!40000 ALTER TABLE `habilidades` DISABLE KEYS */;
INSERT INTO `habilidades` VALUES (1,'Resolución de Problemas',NULL,0),(2,'Gestión del Cambio',NULL,0),(3,'Interpretación de Datos',NULL,0),(4,'Monitoreo de Indicadores',NULL,0),(5,'Análisis Crítico',NULL,0),(6,'Efectividad en Presentaciones',NULL,0),(7,'Comunicación Clara y Asertiva',NULL,0),(8,'Claridad en la Comunicación',NULL,0),(9,'Construcción de Relaciones',NULL,0),(10,'Inspección y Análisis',NULL,0),(11,'Mejora de Procesos',NULL,0),(12,'Control de Procesos',NULL,0),(13,'Auditorías Internas',NULL,0),(14,'Revisión de Procesos',NULL,0),(15,'Pensamiento Innovador',NULL,0),(16,'Establecimiento de Objetivos',NULL,0),(17,'Reacción ante Obstáculos',NULL,0),(18,'Análisis de Resultados',NULL,0),(19,'Coaching y Desarrollo',NULL,0),(20,'Capacitación y Desarrollo',NULL,0),(21,'Empoderamiento',NULL,0),(22,'Creación de Redes Profesionales',NULL,0),(23,'Colaboración Interdepartamental',NULL,0),(24,'Identificación y Desarrollo',NULL,0),(25,'Gestión Efectiva de la Presión',NULL,0),(26,'Manejo de Equipos',NULL,0),(27,'Optimización de Rendimiento',NULL,0),(28,'Calibración de Equipos',NULL,0),(29,'Reducción de Tiempos',NULL,0),(30,'Reducción de Tiempos Muertos',NULL,0),(31,'Comprensión Empática',NULL,0),(32,'Cumplimiento de Metas',NULL,0),(33,'Documentación de Procedimientos',NULL,0),(34,'Cumplimiento de Normativas',NULL,0),(35,'Integridad',NULL,0),(36,'Adaptación a Cambios',NULL,0),(37,'Resolución de Disputas',NULL,0),(38,'Desarrollo de Habilidades de Equipo',NULL,0),(39,'Control de Almacén',NULL,0),(40,'Optimización de Stock',NULL,0),(41,'Optimización de Logística',NULL,0),(42,'Implementación de Ideas Innovadoras',NULL,0),(43,'Impulso de la Innovación',NULL,0),(44,'Coordinación de Equipos',NULL,0),(45,'Desarrollo de Habilidades',NULL,0),(46,'Organización de Tareas',NULL,0),(47,'Ejecución de Proyectos',NULL,0),(48,'Coordinación de Tareas',NULL,0),(49,'Control de Plazos',NULL,0),(50,'Optimización de Recursos',NULL,0),(51,'Gestión Efectiva de Recursos',NULL,0),(52,'Adaptabilidad',NULL,0),(53,'Capacidad para Dirigir Cambios',NULL,0),(54,'Mejora Continua del Rendimiento',NULL,0),(55,'Organización',NULL,0),(56,'Priorización',NULL,0);
/*!40000 ALTER TABLE `habilidades` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:23
