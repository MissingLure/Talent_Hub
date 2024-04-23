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
-- Table structure for table `evaluaciones_comportamientos`
--

DROP TABLE IF EXISTS `evaluaciones_comportamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluaciones_comportamientos` (
  `id_pregunta` int NOT NULL,
  `id_competencia` int DEFAULT NULL,
  `id_habilidad` int DEFAULT NULL,
  `pregunta` varchar(250) DEFAULT NULL,
  `comportamiento` varchar(250) DEFAULT NULL,
  `lenguaje` varchar(15) DEFAULT NULL,
  `tipo` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluaciones_comportamientos`
--

LOCK TABLES `evaluaciones_comportamientos` WRITE;
/*!40000 ALTER TABLE `evaluaciones_comportamientos` DISABLE KEYS */;
INSERT INTO `evaluaciones_comportamientos` VALUES (9,1,1,'¿Cómo se adapta a los cambios repentinos y cómo resuelve problemas en situaciones difíciles?','Adaptarse a cambios y resolver problemas de manera eficiente','Español','Competencia'),(10,1,2,'¿Cómo se adapta y lidera durante cambios organizacionales?','Adaptarse y liderar durante cambios organizacionales','Español','Competencia'),(11,2,3,'¿Cómo interpreta datos de producción para identificar oportunidades de mejora?','Interpretar datos para identificar oportunidades de mejora','Español','Competencia'),(12,2,4,'¿Cómo monitorea indicadores para identificar desviaciones en la producción?','Monitorear indicadores para identificar desviaciones','Español','Competencia'),(13,3,5,'¿Cómo realiza análisis críticos y objetivos para tomar decisiones fundamentadas?','Realizar análisis críticos y objetivos','Español','Competencia'),(14,4,6,'¿Cómo realiza presentaciones efectivas ante audiencias?','Realizar presentaciones efectivas ante audiencias','Español','Competencia'),(15,5,7,'¿Puede comunicarse de manera clara y asertiva para transmitir mensajes importantes?','Comunicarse de manera clara y asertiva','Español','Competencia'),(16,6,8,'¿Puede comunicarse claramente para evitar malentendidos en el trabajo?','Comunicarse de manera clara y efectiva','Español','Competencia'),(17,7,9,'¿Cómo construye relaciones efectivas con colegas y clientes en su trabajo?','Construir relaciones efectivas con colegas y clientes','Español','Competencia'),(18,8,10,'¿Cómo lleva a cabo inspecciones y análisis de calidad para mantener los estándares?','Realizar inspecciones y análisis de calidad de manera rigurosa','Español','Competencia'),(19,8,11,'¿Cómo identifica mejoras para elevar los estándares de calidad en la producción?','Identificar mejoras para elevar los estándares de calidad','Español','Competencia'),(20,8,12,'¿Cómo controla los procesos para mantener la calidad del producto final?','Controlar los procesos para mantener la calidad del producto','Español','Competencia'),(21,8,13,'¿Cómo realiza auditorías internas para garantizar calidad en la producción?','Realizar auditorías internas para garantizar calidad','Español','Competencia'),(22,10,17,'¿Cómo supera obstáculos para alcanzar metas establecidas de producción?','Superar obstáculos para alcanzar metas establecidas','Español','Competencia');
/*!40000 ALTER TABLE `evaluaciones_comportamientos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:15:33
