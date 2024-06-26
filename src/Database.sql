USE [master]
GO
/****** Object:  Database [talent_hub]    Script Date: 06/12/2023 7:50:02 a. m. ******/
CREATE DATABASE [talent_hub]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'talent_hub', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\talent_hub.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'talent_hub_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\talent_hub_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [talent_hub] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [talent_hub].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [talent_hub] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [talent_hub] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [talent_hub] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [talent_hub] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [talent_hub] SET ARITHABORT OFF 
GO
ALTER DATABASE [talent_hub] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [talent_hub] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [talent_hub] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [talent_hub] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [talent_hub] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [talent_hub] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [talent_hub] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [talent_hub] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [talent_hub] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [talent_hub] SET  DISABLE_BROKER 
GO
ALTER DATABASE [talent_hub] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [talent_hub] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [talent_hub] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [talent_hub] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [talent_hub] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [talent_hub] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [talent_hub] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [talent_hub] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [talent_hub] SET  MULTI_USER 
GO
ALTER DATABASE [talent_hub] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [talent_hub] SET DB_CHAINING OFF 
GO
ALTER DATABASE [talent_hub] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [talent_hub] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [talent_hub] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [talent_hub] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [talent_hub] SET QUERY_STORE = ON
GO
ALTER DATABASE [talent_hub] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [talent_hub]
GO
/****** Object:  User [talent-hub-user]    Script Date: 06/12/2023 7:50:02 a. m. ******/
CREATE USER [talent-hub-user] FOR LOGIN [root] WITH DEFAULT_SCHEMA=[dbo]
GO
USE [talent_hub]
GO
/****** Object:  Sequence [dbo].[id_empleado_seq]    Script Date: 06/12/2023 7:50:02 a. m. ******/
CREATE SEQUENCE [dbo].[id_empleado_seq] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Table [dbo].[9_grid_box]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[9_grid_box](
	[id_9_grid] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](100) NULL,
	[ccuadrante_x] [int] NULL,
	[ccuadrante_y] [int] NULL,
	[categoria] [varchar](255) NULL,
	[rango_minimo] [int] NULL,
	[rango_maximo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_9_grid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[competencias]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[competencias](
	[id_competencia] [int] IDENTITY(1,1) NOT NULL,
	[nombre_competencia] [varchar](50) NULL,
	[descripcion] [varchar](50) NULL,
	[peso] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_competencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[departamentos]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[departamentos](
	[id_departamento] [varchar](4) NOT NULL,
	[nombre_departamento] [varchar](30) NULL,
	[id_jefe] [varchar](8) NULL,
	[numero_empleados] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_departamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[empleados]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[empleados](
	[id_empleado] [varchar](8) NOT NULL,
	[primer_nombre] [varchar](30) NULL,
	[segundo_nombre] [varchar](30) NULL,
	[primer_apellido] [varchar](30) NULL,
	[segundo_apellido] [varchar](30) NULL,
	[telefono] [varchar](12) NULL,
	[fecha_nacimiento] [date] NULL,
	[numero_identidad] [varchar](15) NULL,
	[direccion] [varchar](100) NULL,
	[id_pais] [int] NULL,
	[correo] [varchar](80) NULL,
	[id_perfil_puesto] [varchar](4) NULL,
	[id_departamento] [varchar](4) NULL,
	[id_jefe] [varchar](8) NULL,
	[fecha_ingreso] [date] NULL,
	[fecha_retiro] [date] NULL,
	[activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[encuestas]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[encuestas](
	[id_encuesta] [int] IDENTITY(1,1) NOT NULL,
	[id_pefil_puesto] [varchar](4) NULL,
	[id_habilidad] [int] NULL,
	[id_competencia] [int] NULL,
	[periodicidad] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_encuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[evaluaciones]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[evaluaciones](
	[id_evaluacion] [int] IDENTITY(1,1) NOT NULL,
	[nombre_evaluacion] [varchar](50) NULL,
	[tipo] [varchar](20) NULL,
	[fecha] [date] NULL,
	[estado] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_evaluacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[evaluaciones_comportamientos]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[evaluaciones_comportamientos](
	[id_pregunta] [int] IDENTITY(1,1) NOT NULL,
	[id_competencia] [int] NULL,
	[id_habilidad] [int] NULL,
	[pregunta] [varchar](250) NULL,
	[comportamiento] [varchar](250) NULL,
	[lenguaje] [varchar](15) NULL,
	[tipo] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_pregunta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[habilidades]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[habilidades](
	[id_habilidad] [int] IDENTITY(1,1) NOT NULL,
	[nombre_habilidad] [varchar](50) NULL,
	[descripcion] [varchar](150) NULL,
	[peso] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_habilidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[paises]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[paises](
	[id_pais] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_pais] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[perfil_puesto_competencias]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perfil_puesto_competencias](
	[id_perfil_puesto_competencias] [int] IDENTITY(1,1) NOT NULL,
	[id_perfil_puesto] [varchar](4) NULL,
	[id_competencia] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_perfil_puesto_competencias] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[perfil_puesto_habilidades]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perfil_puesto_habilidades](
	[id_perfil_puesto_habilidad] [int] IDENTITY(1,1) NOT NULL,
	[id_pefil_puesto] [varchar](4) NULL,
	[id_habilidad] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_perfil_puesto_habilidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[perfiles_puestos]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perfiles_puestos](
	[id_perfil_puesto] [varchar](4) NOT NULL,
	[nombre_perfil] [varchar](30) NULL,
	[id_departamento] [varchar](4) NULL,
	[numero_plazas] [int] NULL,
	[id_requisito] [int] NULL,
	[id_perfil_anterior] [varchar](4) NULL,
	[id_perfil_posterior] [varchar](4) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_perfil_puesto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[requisitos]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[requisitos](
	[id_requisito] [int] IDENTITY(1,1) NOT NULL,
	[sexo] [varchar](15) NULL,
	[escolaridad] [varchar](50) NULL,
	[experiencia] [varchar](50) NULL,
	[edad_minima] [int] NULL,
	[edad_maxima] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_requisito] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[id_empleado] [varchar](8) NULL,
	[correo] [varchar](50) NULL,
	[contrasena] [varchar](250) NULL,
	[sal] [varchar](250) NULL,
	[rol] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[competencias] ON 

INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (1, N'Adaptabilidad', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (2, N'Análisis de Datos de Producción', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (3, N'Capacidad Analítica', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (4, N'Comunicación', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (5, N'Comunicación Asertiva', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (6, N'Comunicación Efectiva', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (7, N'Comunicación Interpersonal', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (8, N'Control de Calidad', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (9, N'Creatividad', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (10, N'Cumplimiento de Metas de Producción', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (11, N'Desarrollo de Equipos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (12, N'Desarrollo de Relaciones', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (13, N'Desarrollo de Talento', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (14, N'Desempeño bajo Presión', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (15, N'Eficiencia de Maquinaria', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (16, N'Eficiencia en la Producción', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (17, N'Empatía', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (18, N'Enfoque en Resultados', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (19, N'Estandarización de Procesos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (20, N'Ética Profesional', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (21, N'Flexibilidad', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (22, N'Gestión de Conflictos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (23, N'Gestión de Equipos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (24, N'Gestión de Inventarios', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (25, N'Gestión de la Innovación', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (26, N'Gestión de Personal', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (27, N'Gestión de Proyectos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (28, N'Gestión de Recursos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (29, N'Gestión del Cambio', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (30, N'Gestión del Rendimiento', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (31, N'Gestión del Tiempo', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (32, N'Habilidad Analítica', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (33, N'Habilidad de Negociación', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (34, N'Iniciativa', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (35, N'Innovación', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (36, N'Innovación en Producto', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (37, N'Liderazgo', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (38, N'Mantenimiento Preventivo', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (39, N'Mejora Continua', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (40, N'Mejora de Procesos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (41, N'Negociación', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (42, N'Optimización de Tiempos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (43, N'Orientación al Cliente', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (44, N'Pensamiento Crítico', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (45, N'Pensamiento Estratégico', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (46, N'Planificación de Producción', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (47, N'Planificación Estratégica', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (48, N'Reducción de Costos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (49, N'Resiliencia', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (50, N'Resolución de Conflictos', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (51, N'Resolución de Problemas', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (52, N'Seguimiento de Indicadores', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (53, N'Seguridad en el Trabajo', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (54, N'Sostenibilidad Ambiental
', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (55, N'Toma de Decisiones
', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (56, N'Trabajo Bajo Presión
', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (57, N'Trabajo Colaborativo
', NULL, 0)
INSERT [dbo].[competencias] ([id_competencia], [nombre_competencia], [descripcion], [peso]) VALUES (58, N'Trabajo en Equipo', NULL, 0)
SET IDENTITY_INSERT [dbo].[competencias] OFF
GO
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1001', N'Central Office', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1002', N'Regional Warehouse', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1003', N'Manufacturing Plant', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1004', N'Research Center', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1005', N'Tech Hub', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1006', N'Logistics Center', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1007', N'Distribution Center', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1008', N'Training Facility', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1009', N'Customer Support Hub', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1010', N'Data Center', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1011', N'Sales', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1012', N'Engineering', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1013', N'Finance', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1014', N'HR', NULL, 0)
INSERT [dbo].[departamentos] ([id_departamento], [nombre_departamento], [id_jefe], [numero_empleados]) VALUES (N'1015', N'Marketing', NULL, 0)
GO
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000001', N'Josue', N'Francisco', N'De Jesus', N'Moreno', N'32276440', CAST(N'1998-06-11' AS Date), N'0501199807685', N'Col Stibys 3 Calle 2 y 3 Ave Casa 428', NULL, N'joshuadejesus777@gmail.com', N'1001', N'1005', NULL, CAST(N'2023-12-01' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000002', N'Emilie', N'Henderson', N'Pren', N'Trunchion', N'32854566', CAST(N'2005-05-24' AS Date), N'0501123456789', N'02066 Dixon Circle', NULL, N'htrunchion0@microsoft.com', N'1005', N'1007', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000003', N'Dory', N'Isacco', N'Ellyatt', N'Megarrell', N'320148969', CAST(N'1999-06-11' AS Date), N'0501188908576', N'6 Coolidge Park', NULL, N'imegarrell1@gmail.com', N'1002', N'1011', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000004', N'Farlie', N'Edd', N'Abendroth', N'Crispe', N'32286440', CAST(N'2000-06-13' AS Date), N'0501200008577', N'078 Pierstorff Parkway', NULL, N'ecrispe2@gmail.com', N'1005', N'1014', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000005', N'Merwin', N'Alberto', N'Serrano', N'Orellana', N'32875625', CAST(N'2000-01-20' AS Date), N'0501199907525', N'Col. Fesitrahn', NULL, N'merwin@gmail.com', N'1003', N'1005', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000006', N'Mario', N'Javier', N'Lopez', N'Funez', N'32568565', CAST(N'2005-12-03' AS Date), N'0501199804525', N'Col. Jardines del Valle', NULL, N'mario@gmail.com', N'1002', N'1011', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000007', N'Mario', N'Javier', N'Lopez', N'Funez', N'32568565', CAST(N'2005-12-03' AS Date), N'0501199804785', N'Col. Jardines del Valle', NULL, N'mariolopez@gmail.com', N'1002', N'1011', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000008', N'sdfdsf', N'dsfdf', N'sdfsd', N'sdfsd', N'32556559', CAST(N'2005-12-03' AS Date), N'05011233215252', N'ewrwerwr', NULL, N'asds@gmail.com', N'1003', N'1006', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000009', N'sdfdsf', N'dsfdf', N'sdfsd', N'sdfsd', N'32556559', CAST(N'2005-12-03' AS Date), N'05011234515252', N'ewrwerwr', NULL, N'asdd@gmail.com', N'1003', N'1006', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000010', N'sdfdsf', N'dsfdf', N'sdfsd', N'sdfsd', N'32556559', CAST(N'2005-12-03' AS Date), N'05011234514552', N'ewrwerwr', NULL, N'asdd@gmail.com', N'1003', N'1006', NULL, CAST(N'2023-12-03' AS Date), NULL, 1)
INSERT [dbo].[empleados] ([id_empleado], [primer_nombre], [segundo_nombre], [primer_apellido], [segundo_apellido], [telefono], [fecha_nacimiento], [numero_identidad], [direccion], [id_pais], [correo], [id_perfil_puesto], [id_departamento], [id_jefe], [fecha_ingreso], [fecha_retiro], [activo]) VALUES (N'1000011', N'Josue', N'Francisco', N'De Jesus', N'Moreno', N'32276440', CAST(N'2005-12-04' AS Date), N'0501123456781', N'Col Stibys 3 Calle 2 y 3 Ave Casa 428', NULL, N'joshua@gmail.com', N'1003', N'1005', NULL, CAST(N'2023-12-04' AS Date), NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[evaluaciones] ON 

INSERT [dbo].[evaluaciones] ([id_evaluacion], [nombre_evaluacion], [tipo], [fecha], [estado]) VALUES (1, N'Evaluacion Competencias 1', N'Competencia', CAST(N'2023-03-12' AS Date), N'Activo')
SET IDENTITY_INSERT [dbo].[evaluaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[evaluaciones_comportamientos] ON 

INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (9, 1, 1, N'¿Cómo se adapta a los cambios repentinos y cómo resuelve problemas en situaciones difíciles?', N'Adaptarse a cambios y resolver problemas de manera eficiente', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (10, 1, 2, N'¿Cómo se adapta y lidera durante cambios organizacionales?', N'Adaptarse y liderar durante cambios organizacionales', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (11, 2, 3, N'¿Cómo interpreta datos de producción para identificar oportunidades de mejora?', N'Interpretar datos para identificar oportunidades de mejora', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (12, 2, 4, N'¿Cómo monitorea indicadores para identificar desviaciones en la producción?', N'Monitorear indicadores para identificar desviaciones', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (13, 3, 5, N'¿Cómo realiza análisis críticos y objetivos para tomar decisiones fundamentadas?', N'Realizar análisis críticos y objetivos', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (14, 4, 6, N'¿Cómo realiza presentaciones efectivas ante audiencias?', N'Realizar presentaciones efectivas ante audiencias', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (15, 5, 7, N'¿Puede comunicarse de manera clara y asertiva para transmitir mensajes importantes?', N'Comunicarse de manera clara y asertiva', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (16, 6, 8, N'¿Puede comunicarse claramente para evitar malentendidos en el trabajo?', N'Comunicarse de manera clara y efectiva', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (17, 7, 9, N'¿Cómo construye relaciones efectivas con colegas y clientes en su trabajo?', N'Construir relaciones efectivas con colegas y clientes', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (18, 8, 10, N'¿Cómo lleva a cabo inspecciones y análisis de calidad para mantener los estándares?', N'Realizar inspecciones y análisis de calidad de manera rigurosa', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (19, 8, 11, N'¿Cómo identifica mejoras para elevar los estándares de calidad en la producción?', N'Identificar mejoras para elevar los estándares de calidad', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (20, 8, 12, N'¿Cómo controla los procesos para mantener la calidad del producto final?', N'Controlar los procesos para mantener la calidad del producto', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (21, 8, 13, N'¿Cómo realiza auditorías internas para garantizar calidad en la producción?', N'Realizar auditorías internas para garantizar calidad', N'Español', N'Competencia')
INSERT [dbo].[evaluaciones_comportamientos] ([id_pregunta], [id_competencia], [id_habilidad], [pregunta], [comportamiento], [lenguaje], [tipo]) VALUES (22, 10, 17, N'¿Cómo supera obstáculos para alcanzar metas establecidas de producción?', N'Superar obstáculos para alcanzar metas establecidas', N'Español', N'Competencia')
SET IDENTITY_INSERT [dbo].[evaluaciones_comportamientos] OFF
GO
SET IDENTITY_INSERT [dbo].[habilidades] ON 

INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (1, N'Resolución de Problemas', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (2, N'Gestión del Cambio', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (3, N'Interpretación de Datos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (4, N'Monitoreo de Indicadores', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (5, N'Análisis Crítico', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (6, N'Efectividad en Presentaciones', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (7, N'Comunicación Clara y Asertiva', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (8, N'Claridad en la Comunicación', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (9, N'Construcción de Relaciones', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (10, N'Inspección y Análisis', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (11, N'Mejora de Procesos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (12, N'Control de Procesos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (13, N'Auditorías Internas', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (14, N'Revisión de Procesos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (15, N'Pensamiento Innovador', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (16, N'Establecimiento de Objetivos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (17, N'Reacción ante Obstáculos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (18, N'Análisis de Resultados', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (19, N'Coaching y Desarrollo', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (20, N'Capacitación y Desarrollo', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (21, N'Empoderamiento', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (22, N'Creación de Redes Profesionales', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (23, N'Colaboración Interdepartamental', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (24, N'Identificación y Desarrollo', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (25, N'Gestión Efectiva de la Presión', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (26, N'Manejo de Equipos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (27, N'Optimización de Rendimiento', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (28, N'Calibración de Equipos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (29, N'Reducción de Tiempos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (30, N'Reducción de Tiempos Muertos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (31, N'Comprensión Empática', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (32, N'Cumplimiento de Metas', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (33, N'Documentación de Procedimientos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (34, N'Cumplimiento de Normativas', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (35, N'Integridad', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (36, N'Adaptación a Cambios', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (37, N'Resolución de Disputas', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (38, N'Desarrollo de Habilidades de Equipo', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (39, N'Control de Almacén', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (40, N'Optimización de Stock', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (41, N'Optimización de Logística', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (42, N'Implementación de Ideas Innovadoras', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (43, N'Impulso de la Innovación', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (44, N'Coordinación de Equipos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (45, N'Desarrollo de Habilidades', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (46, N'Organización de Tareas', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (47, N'Ejecución de Proyectos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (48, N'Coordinación de Tareas', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (49, N'Control de Plazos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (50, N'Optimización de Recursos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (51, N'Gestión Efectiva de Recursos', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (52, N'Adaptabilidad', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (53, N'Capacidad para Dirigir Cambios', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (54, N'Mejora Continua del Rendimiento', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (55, N'Organización', NULL, 0)
INSERT [dbo].[habilidades] ([id_habilidad], [nombre_habilidad], [descripcion], [peso]) VALUES (56, N'Priorización', NULL, 0)
SET IDENTITY_INSERT [dbo].[habilidades] OFF
GO
INSERT [dbo].[perfiles_puestos] ([id_perfil_puesto], [nombre_perfil], [id_departamento], [numero_plazas], [id_requisito], [id_perfil_anterior], [id_perfil_posterior]) VALUES (N'1001', N'IT', N'1005', 10, NULL, NULL, NULL)
INSERT [dbo].[perfiles_puestos] ([id_perfil_puesto], [nombre_perfil], [id_departamento], [numero_plazas], [id_requisito], [id_perfil_anterior], [id_perfil_posterior]) VALUES (N'1002', N'Manager', N'1011', 2, NULL, NULL, NULL)
INSERT [dbo].[perfiles_puestos] ([id_perfil_puesto], [nombre_perfil], [id_departamento], [numero_plazas], [id_requisito], [id_perfil_anterior], [id_perfil_posterior]) VALUES (N'1003', N'Engineer', N'1012', 5, NULL, NULL, NULL)
INSERT [dbo].[perfiles_puestos] ([id_perfil_puesto], [nombre_perfil], [id_departamento], [numero_plazas], [id_requisito], [id_perfil_anterior], [id_perfil_posterior]) VALUES (N'1004', N'Analyst', N'1013', 3, NULL, NULL, NULL)
INSERT [dbo].[perfiles_puestos] ([id_perfil_puesto], [nombre_perfil], [id_departamento], [numero_plazas], [id_requisito], [id_perfil_anterior], [id_perfil_posterior]) VALUES (N'1005', N'Coordinator', N'1014', 2, NULL, NULL, NULL)
INSERT [dbo].[perfiles_puestos] ([id_perfil_puesto], [nombre_perfil], [id_departamento], [numero_plazas], [id_requisito], [id_perfil_anterior], [id_perfil_posterior]) VALUES (N'1006', N'Assistant', N'1015', 7, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[usuarios] ON 

INSERT [dbo].[usuarios] ([id_usuario], [id_empleado], [correo], [contrasena], [sal], [rol]) VALUES (1, N'1000001', N'joshuadejesus777@gmail.com', N'KGqFc6IVvslLSxpRDCJcJHXyTMnbAsYONu/zlQG7QwUObmBwa2KImTHFJtXeqDVamcnYTRNqNKGr5+q/HkyGMA==', N'FWHt5kNoGAU/z5e+6JobQPvj2jFXwpfAnJ78qCMsBmWmqiws3BtNkKQ515X+bJZIuxS+VlNTo4C9dqd8NVZ+AOBJGLr6ACow0265oJlJ+YyngmIW38nFv0ywYYDQEgHfOfLnF9maj+ohcwn58ACtLBPlqxkFjzReguIkWXBa/U4=', N'2')
INSERT [dbo].[usuarios] ([id_usuario], [id_empleado], [correo], [contrasena], [sal], [rol]) VALUES (2, N'1000002', N'htrunchion0@microsoft.com', N'DZM8mUhQ3kBWFYHm7GFt187Q8JTmMit91jQ2UmR1bB2igzQFG2zGDPaXWoj6awxLIaU+a85hbd0sCTccb/RM5Q==', N'XP/2Cm8H1uCZCzYOxaE6nJ3jg8Ye3Z4IKKuekcb6IhHqWmUm8bqLIth8kGZks/y+Q2M8GYDwGcdK2K8yiUwEs6w5bWOsR2XU60rYBm9attVmLCOOWhxcoHvmJb9e+zm7gejLIKqulu2RMDhkv8SYegoNc061ndY9Zc6pBOfHvmY=', N'1')
INSERT [dbo].[usuarios] ([id_usuario], [id_empleado], [correo], [contrasena], [sal], [rol]) VALUES (3, N'1000004', N'ecrispe2@gmail.com', N'N1X9JjjhRyCQcH5DP3XZQZzOfZQgvV2Cxpni7VrO0WR/GlHEILsZL2fG7FfI722TVs7+lpTrRRinC9n0ykhRPw==', N'k6tA9DDl4Bp5ZOgrxDZBDLZeChHKAcD2huOVnPHkU6Z0CcFyCVcodzR2LHqIPPObhTuPO8sMWDe7BG2fmBXixPo/w6xcgV35M9LShm1Ii+ONdmjjb+s3M0a1XvTJpDtFwcngxhZEqNcalCWzSRoha7Nk1iEO3ojLpM5LeNQqZ2Q=', N'1')
SET IDENTITY_INSERT [dbo].[usuarios] OFF
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_departamento])
REFERENCES [dbo].[departamentos] ([id_departamento])
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_departamento])
REFERENCES [dbo].[departamentos] ([id_departamento])
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_jefe])
REFERENCES [dbo].[empleados] ([id_empleado])
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_jefe])
REFERENCES [dbo].[empleados] ([id_empleado])
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_pais])
REFERENCES [dbo].[paises] ([id_pais])
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_pais])
REFERENCES [dbo].[paises] ([id_pais])
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_perfil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([id_perfil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[encuestas]  WITH CHECK ADD FOREIGN KEY([id_competencia])
REFERENCES [dbo].[competencias] ([id_competencia])
GO
ALTER TABLE [dbo].[encuestas]  WITH CHECK ADD FOREIGN KEY([id_competencia])
REFERENCES [dbo].[competencias] ([id_competencia])
GO
ALTER TABLE [dbo].[encuestas]  WITH CHECK ADD FOREIGN KEY([id_habilidad])
REFERENCES [dbo].[habilidades] ([id_habilidad])
GO
ALTER TABLE [dbo].[encuestas]  WITH CHECK ADD FOREIGN KEY([id_habilidad])
REFERENCES [dbo].[habilidades] ([id_habilidad])
GO
ALTER TABLE [dbo].[encuestas]  WITH CHECK ADD FOREIGN KEY([id_pefil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[encuestas]  WITH CHECK ADD FOREIGN KEY([id_pefil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfil_puesto_competencias]  WITH CHECK ADD FOREIGN KEY([id_competencia])
REFERENCES [dbo].[competencias] ([id_competencia])
GO
ALTER TABLE [dbo].[perfil_puesto_competencias]  WITH CHECK ADD FOREIGN KEY([id_competencia])
REFERENCES [dbo].[competencias] ([id_competencia])
GO
ALTER TABLE [dbo].[perfil_puesto_competencias]  WITH CHECK ADD FOREIGN KEY([id_perfil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfil_puesto_competencias]  WITH CHECK ADD FOREIGN KEY([id_perfil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfil_puesto_habilidades]  WITH CHECK ADD FOREIGN KEY([id_habilidad])
REFERENCES [dbo].[habilidades] ([id_habilidad])
GO
ALTER TABLE [dbo].[perfil_puesto_habilidades]  WITH CHECK ADD FOREIGN KEY([id_habilidad])
REFERENCES [dbo].[habilidades] ([id_habilidad])
GO
ALTER TABLE [dbo].[perfil_puesto_habilidades]  WITH CHECK ADD FOREIGN KEY([id_pefil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfil_puesto_habilidades]  WITH CHECK ADD FOREIGN KEY([id_pefil_puesto])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_departamento])
REFERENCES [dbo].[departamentos] ([id_departamento])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_departamento])
REFERENCES [dbo].[departamentos] ([id_departamento])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_perfil_anterior])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_perfil_posterior])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_perfil_anterior])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_perfil_posterior])
REFERENCES [dbo].[perfiles_puestos] ([id_perfil_puesto])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_requisito])
REFERENCES [dbo].[requisitos] ([id_requisito])
GO
ALTER TABLE [dbo].[perfiles_puestos]  WITH CHECK ADD FOREIGN KEY([id_requisito])
REFERENCES [dbo].[requisitos] ([id_requisito])
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD FOREIGN KEY([id_empleado])
REFERENCES [dbo].[empleados] ([id_empleado])
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD FOREIGN KEY([id_empleado])
REFERENCES [dbo].[empleados] ([id_empleado])
GO
/****** Object:  StoredProcedure [dbo].[CrearEmpleado]    Script Date: 06/12/2023 7:50:02 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CrearEmpleado] (
    @primer_nombre varchar(30),
    @segundo_nombre varchar(30),
    @primer_apellido varchar(30),
    @segundo_apellido varchar(30),
    @telefono varchar(12),
	@numero_identidad varchar(15),
	@direccion varchar(100),
	@correo varchar(80),
    @fecha_nacimiento date,
    @id_perfil_puesto varchar(4),
    @id_departamento varchar(4)
)
AS
BEGIN
declare @valorSecuencia numeric;
declare @CodeIdEmp varchar(8);
declare @fecha_Actual date;

set @valorSecuencia= next value for id_empleado_seq;
set @CodeIdEmp ='1'+format(@valorSecuencia,'000000');
set @fecha_actual= GETDATE();   
	INSERT INTO empleados (
        id_empleado,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        telefono,
        fecha_nacimiento,
        numero_identidad,
        direccion,
        correo,
        id_perfil_puesto,
        id_departamento,
		fecha_ingreso,
		fecha_retiro,
		activo
    )
    VALUES (
		@CodeIdEmp,
        @primer_nombre,
        @segundo_nombre,
        @primer_apellido,
        @segundo_apellido,
        @telefono,
        @fecha_nacimiento,
        @numero_identidad,
        @direccion,
        @correo,
        @id_perfil_puesto,
        @id_departamento,
		@fecha_actual,
		null,
		1
    );
END;
GO
USE [master]
GO
ALTER DATABASE [talent_hub] SET  READ_WRITE 
GO
