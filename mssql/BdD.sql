USE [master]
GO
/****** Object:  Database [perforador]    Script Date: 31/7/2024 15:30:01 ******/
CREATE DATABASE [perforador]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'perforador', FILENAME = N'C:\Users\Default\Desktop\perforador.mdf' , SIZE = 6758400KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'perforador_log', FILENAME = N'C:\Users\Default\Desktop\perforador_log.ldf' , SIZE = 15170112KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [perforador] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [perforador].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [perforador] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [perforador] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [perforador] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [perforador] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [perforador] SET ARITHABORT OFF 
GO
ALTER DATABASE [perforador] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [perforador] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [perforador] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [perforador] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [perforador] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [perforador] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [perforador] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [perforador] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [perforador] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [perforador] SET  DISABLE_BROKER 
GO
ALTER DATABASE [perforador] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [perforador] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [perforador] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [perforador] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [perforador] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [perforador] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [perforador] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [perforador] SET RECOVERY FULL 
GO
ALTER DATABASE [perforador] SET  MULTI_USER 
GO
ALTER DATABASE [perforador] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [perforador] SET DB_CHAINING OFF 
GO
ALTER DATABASE [perforador] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [perforador] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [perforador] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [perforador] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [perforador] SET QUERY_STORE = OFF
GO
USE [perforador]
GO
/****** Object:  User [testgasoil]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [testgasoil] FOR LOGIN [testgasoil] WITH DEFAULT_SCHEMA=[gasoil]
GO
/****** Object:  User [prueba]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [prueba] FOR LOGIN [prueba] WITH DEFAULT_SCHEMA=[165]
GO
/****** Object:  User [perforador]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [perforador] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [LAM\SCHB-DLS4170-Visualizacion]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\SCHB-DLS4170-Visualizacion] FOR LOGIN [LAM\SCHB-DLS4170-Visualizacion] WITH DEFAULT_SCHEMA=[170]
GO
/****** Object:  User [LAM\SCHB-DLS4170-Operacion]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\SCHB-DLS4170-Operacion] FOR LOGIN [LAM\SCHB-DLS4170-Operacion] WITH DEFAULT_SCHEMA=[170]
GO
/****** Object:  User [LAM\SCHB-DLS4168-Visualizacion]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\SCHB-DLS4168-Visualizacion] FOR LOGIN [LAM\SCHB-DLS4168-Visualizacion] WITH DEFAULT_SCHEMA=[168]
GO
/****** Object:  User [LAM\SCHB-DLS4168-Operacion]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\SCHB-DLS4168-Operacion] FOR LOGIN [LAM\SCHB-DLS4168-Operacion] WITH DEFAULT_SCHEMA=[168]
GO
/****** Object:  User [LAM\SCHB-DLS4165-Visualizacion]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\SCHB-DLS4165-Visualizacion] FOR LOGIN [LAM\SCHB-DLS4165-Visualizacion]
GO
/****** Object:  User [LAM\SCHB-DLS4165-Operacion]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\SCHB-DLS4165-Operacion] FOR LOGIN [LAM\SCHB-DLS4165-Operacion]
GO
/****** Object:  User [LAM\dms.svc]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\dms.svc] FOR LOGIN [LAM\dms.svc] WITH DEFAULT_SCHEMA=[db_owner]
GO
/****** Object:  User [LAM\consumogasoil]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [LAM\consumogasoil] FOR LOGIN [LAM\consumogasoil] WITH DEFAULT_SCHEMA=[gasoil]
GO
/****** Object:  User [dmaguire]    Script Date: 31/7/2024 15:30:01 ******/
CREATE USER [dmaguire] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dmaguire]
GO
/****** Object:  DatabaseRole [read165]    Script Date: 31/7/2024 15:30:02 ******/
CREATE ROLE [read165]
GO
ALTER ROLE [db_owner] ADD MEMBER [perforador]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [perforador]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [perforador]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [perforador]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [perforador]
GO
ALTER ROLE [db_datareader] ADD MEMBER [perforador]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [perforador]
GO
ALTER ROLE [db_denydatareader] ADD MEMBER [perforador]
GO
ALTER ROLE [db_denydatawriter] ADD MEMBER [perforador]
GO
ALTER ROLE [read165] ADD MEMBER [LAM\SCHB-DLS4165-Visualizacion]
GO
ALTER ROLE [read165] ADD MEMBER [LAM\SCHB-DLS4165-Operacion]
GO
ALTER ROLE [db_owner] ADD MEMBER [LAM\dms.svc]
GO
ALTER ROLE [db_datareader] ADD MEMBER [LAM\consumogasoil]
GO
ALTER ROLE [db_owner] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_datareader] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_denydatareader] ADD MEMBER [dmaguire]
GO
ALTER ROLE [db_denydatawriter] ADD MEMBER [dmaguire]
GO
/****** Object:  Schema [001]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [001]
GO
/****** Object:  Schema [156]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [156]
GO
/****** Object:  Schema [157]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [157]
GO
/****** Object:  Schema [160]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [160]
GO
/****** Object:  Schema [163]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [163]
GO
/****** Object:  Schema [165]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [165]
GO
/****** Object:  Schema [167]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [167]
GO
/****** Object:  Schema [168]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [168]
GO
/****** Object:  Schema [170]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [170]
GO
/****** Object:  Schema [dmaguire]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [dmaguire]
GO
/****** Object:  Schema [gasoil]    Script Date: 31/7/2024 15:30:02 ******/
CREATE SCHEMA [gasoil]
GO
/****** Object:  UserDefinedFunction [dbo].[disponibilidad]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[disponibilidad]
(
	@idPieza int,@idDiametro int,@perforador int 
)
RETURNS int
AS
BEGIN
	DECLARE @cantidad INT
	IF @idDiametro IS NULL
    BEGIN
       select @cantidad=count(*) from perforadorPieza
		where perforador=@perforador
		and enUso=0
		and baja=0
		and idPieza=@idPieza
    END
    ELSE
    BEGIN
        select @cantidad=count(*) from perforadorPieza
		where perforador=@perforador
		and enUso=0
		and baja=0
		and idPieza=@idPieza
		and idDiametro=@idDiametro
    END
   
	RETURN @cantidad

END
GO
/****** Object:  Table [dbo].[perforadorPieza]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perforadorPieza](
	[idPerforadorPieza] [int] IDENTITY(1,1) NOT NULL,
	[perforador] [varchar](50) NOT NULL,
	[idPieza] [int] NOT NULL,
	[hs] [numeric](18, 1) NOT NULL,
	[hsInst] [numeric](18, 1) NOT NULL,
	[serie] [varchar](50) NULL,
	[enUso] [tinyint] NOT NULL,
	[baja] [tinyint] NOT NULL,
	[motivo] [varchar](50) NULL,
	[bomba] [int] NOT NULL,
	[cuerpo] [int] NOT NULL,
	[modulo] [nvarchar](50) NULL,
	[idMarca] [int] NULL,
	[idDiametro] [int] NULL,
 CONSTRAINT [PK_perforadorPieza] PRIMARY KEY CLUSTERED 
(
	[idPerforadorPieza] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[log](
	[idLog] [int] IDENTITY(1,1) NOT NULL,
	[idPerforadorPieza] [int] NOT NULL,
	[movimiento] [varchar](50) NOT NULL,
	[detalle] [varchar](50) NULL,
	[fecha] [datetime] NULL,
	[bomba] [int] NULL,
	[cuerpo] [int] NULL,
	[modulo] [varchar](50) NULL,
	[hs] [numeric](18, 1) NULL,
	[usuario] [varchar](50) NULL,
	[perforador] [varchar](50) NULL,
 CONSTRAINT [PK_log] PRIMARY KEY CLUSTERED 
(
	[idLog] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pieza]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pieza](
	[idPieza] [int] IDENTITY(18,1) NOT NULL,
	[tipo] [varchar](25) NULL,
	[codigo] [varchar](25) NULL,
	[hsMin] [int] NOT NULL,
	[hsMax] [int] NOT NULL,
	[serie] [tinyint] NOT NULL,
	[nroPieza] [int] NOT NULL,
	[diametro] [tinyint] NOT NULL,
 CONSTRAINT [PK_pieza] PRIMARY KEY CLUSTERED 
(
	[idPieza] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[diametro]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[diametro](
	[idDiametro] [int] IDENTITY(1,1) NOT NULL,
	[diametro] [varchar](10) NOT NULL,
 CONSTRAINT [PK_diametro] PRIMARY KEY CLUSTERED 
(
	[idDiametro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [165].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [165].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=165)

GO
/****** Object:  Table [dbo].[piezaPerforador]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[piezaPerforador](
	[idPiezaPerforador] [int] IDENTITY(1,1) NOT NULL,
	[idPieza] [int] NOT NULL,
	[perforador] [varchar](50) NOT NULL,
	[stock] [int] NOT NULL,
	[reposicion] [int] NOT NULL,
 CONSTRAINT [PK_piezaPerforador] PRIMARY KEY CLUSTERED 
(
	[idPiezaPerforador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[piezaDiametro]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[piezaDiametro](
	[idPiezaDiametro] [int] IDENTITY(1,1) NOT NULL,
	[idPieza] [int] NOT NULL,
	[idDiametro] [int] NOT NULL,
 CONSTRAINT [PK_piezaDiametro] PRIMARY KEY CLUSTERED 
(
	[idPiezaDiametro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [165].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [165].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 165)
ORDER BY p.nroPieza
GO
/****** Object:  View [170].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [170].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 170)
ORDER BY p.nroPieza
GO
/****** Object:  View [170].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [170].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=170)

GO
/****** Object:  View [168].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [168].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 168)
ORDER BY p.nroPieza
GO
/****** Object:  View [168].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [168].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=168)

GO
/****** Object:  View [167].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [167].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=167)

GO
/****** Object:  View [167].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [167].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 167)
ORDER BY p.nroPieza
GO
/****** Object:  View [163].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [163].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 163)
ORDER BY p.nroPieza
GO
/****** Object:  View [163].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [163].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=163)

GO
/****** Object:  View [160].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [160].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 160)
ORDER BY p.nroPieza
GO
/****** Object:  View [160].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [160].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=160)

GO
/****** Object:  View [157].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [157].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 157)
ORDER BY p.nroPieza
GO
/****** Object:  View [157].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [157].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=157)

GO
/****** Object:  View [156].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [156].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 156)
ORDER BY p.nroPieza
GO
/****** Object:  View [156].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [156].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=156)

GO
/****** Object:  View [001].[log]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [001].[log]
AS
select l.fecha,l.bomba,l.cuerpo,l.modulo,p.nroPieza,p.tipo,d.diametro,l.hs,l.movimiento,l.detalle,l.usuario,pp.serie
from  dbo.log as l
inner JOIN dbo.perforadorPieza AS pp ON l.idPerforadorPieza=pp.idPerforadorPieza
inner JOIN dbo.pieza p ON pp.idPieza=p.idPieza
left JOIN dbo.diametro d ON pp.idDiametro=d.idDiametro
WHERE (pp.perforador=001)

GO
/****** Object:  View [001].[stock]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [001].[stock]
AS
SELECT        TOP (100) PERCENT p.nroPieza, p.tipo, d.diametro, pp.stock, dbo.disponibilidad(pp.idPieza, pd.idDiametro, pp.perforador) AS disp
FROM            dbo.piezaPerforador AS pp INNER JOIN
                         dbo.pieza AS p ON pp.idPieza = p.idPieza LEFT OUTER JOIN
                         dbo.piezaDiametro AS pd ON pp.idPieza = pd.idPieza LEFT OUTER JOIN
                         dbo.diametro AS d ON pd.idDiametro = d.idDiametro
WHERE        (pp.perforador = 001)
ORDER BY p.nroPieza
GO
/****** Object:  Table [dbo].[wellData]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wellData](
	[idWellData] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NULL,
	[hsBomba1] [numeric](18, 1) NOT NULL,
	[hsBomba2] [numeric](18, 1) NOT NULL,
	[hsBomba3] [numeric](18, 1) NOT NULL,
	[lts] [numeric](18, 1) NOT NULL,
	[perforador] [int] NULL,
	[jobId] [nchar](30) NULL,
	[perforadorStr] [nchar](10) NULL,
	[onBomba1] [tinyint] NULL,
	[onBomba2] [tinyint] NULL,
	[onBomba3] [tinyint] NULL,
 CONSTRAINT [PK_wellData] PRIMARY KEY CLUSTERED 
(
	[idWellData] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [gasoil].[perforadores]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [gasoil].[perforadores]
AS
SELECT fecha, perforadorStr,lts
  FROM [perforador].[dbo].[wellData]
GO
/****** Object:  Table [dbo].[item]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[item](
	[inv_item] [varchar](12) NOT NULL,
	[descr] [varchar](50) NOT NULL,
	[idPieza] [int] NOT NULL,
	[idDiametro] [int] NULL,
 CONSTRAINT [PK_item] PRIMARY KEY CLUSTERED 
(
	[inv_item] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[logPieza]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[logPieza](
	[idLogPieza] [int] IDENTITY(1,1) NOT NULL,
	[idPerforadorPieza] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[hs] [numeric](18, 1) NOT NULL,
	[hsInst] [numeric](18, 1) NOT NULL,
 CONSTRAINT [PK_logPieza] PRIMARY KEY CLUSTERED 
(
	[idLogPieza] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[marca]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[marca](
	[idMarca] [int] IDENTITY(1,1) NOT NULL,
	[marca] [nchar](50) NOT NULL,
 CONSTRAINT [PK_marca] PRIMARY KEY CLUSTERED 
(
	[idMarca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[perforador]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perforador](
	[perforador] [varchar](50) NOT NULL,
	[tipoBomba] [nchar](10) NOT NULL,
	[factu] [datetime] NOT NULL,
 CONSTRAINT [PK_perforador] PRIMARY KEY CLUSTERED 
(
	[perforador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[perforadorPiezaBackUp]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[perforadorPiezaBackUp](
	[idPerforadorPieza] [int] NOT NULL,
	[perforador] [varchar](50) NOT NULL,
	[idPieza] [int] NOT NULL,
	[hs] [numeric](18, 1) NOT NULL,
	[hsInst] [numeric](18, 1) NOT NULL,
	[serie] [varchar](50) NULL,
	[enUso] [tinyint] NOT NULL,
	[baja] [tinyint] NOT NULL,
	[motivo] [varchar](50) NULL,
	[bomba] [int] NOT NULL,
	[cuerpo] [int] NOT NULL,
	[modulo] [nvarchar](50) NULL,
	[idMarca] [int] NULL,
	[idDiametro] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pnq]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pnq](
	[idPnq] [int] IDENTITY(1,1) NOT NULL,
	[unidadNegocio] [varchar](10) NOT NULL,
	[distributionType] [varchar](12) NOT NULL,
	[inv_item1] [varchar](12) NOT NULL,
	[inv_item2] [varchar](12) NULL,
	[inv_item3] [varchar](12) NULL,
	[inv_item4] [varchar](12) NULL,
	[cantidad] [int] NOT NULL,
	[estado] [nchar](10) NOT NULL,
	[fecha] [datetime] NOT NULL,
 CONSTRAINT [PK_pnq] PRIMARY KEY CLUSTERED 
(
	[idPnq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vfBomba]    Script Date: 31/7/2024 15:30:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vfBomba](
	[idVfBomba] [int] NOT NULL,
	[vf1] [int] NOT NULL,
	[vf2] [int] NOT NULL,
 CONSTRAINT [PK_vfBomba] PRIMARY KEY CLUSTERED 
(
	[idVfBomba] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[log] ADD  CONSTRAINT [DF_log_fecha]  DEFAULT (getdate()) FOR [fecha]
GO
ALTER TABLE [dbo].[log] ADD  CONSTRAINT [DF_log_modulo]  DEFAULT ('') FOR [modulo]
GO
ALTER TABLE [dbo].[logPieza] ADD  CONSTRAINT [DF_logPieza_fecha]  DEFAULT (getdate()) FOR [fecha]
GO
ALTER TABLE [dbo].[perforadorPieza] ADD  CONSTRAINT [DF_perforadorPieza_baja]  DEFAULT ((0)) FOR [baja]
GO
ALTER TABLE [dbo].[perforadorPieza] ADD  CONSTRAINT [DF_perforadorPieza_bomba]  DEFAULT ((1)) FOR [bomba]
GO
ALTER TABLE [dbo].[perforadorPieza] ADD  CONSTRAINT [DF_perforadorPieza_cuerpo]  DEFAULT ((1)) FOR [cuerpo]
GO
ALTER TABLE [dbo].[perforadorPieza] ADD  CONSTRAINT [DF_perforadorPieza_modulo]  DEFAULT ((0)) FOR [modulo]
GO
ALTER TABLE [dbo].[pieza] ADD  CONSTRAINT [DF_pieza_serie]  DEFAULT ((0)) FOR [serie]
GO
ALTER TABLE [dbo].[pieza] ADD  CONSTRAINT [DF_pieza_nroPieza]  DEFAULT ((1)) FOR [nroPieza]
GO
ALTER TABLE [dbo].[pieza] ADD  CONSTRAINT [DF_pieza_diametro]  DEFAULT ((0)) FOR [diametro]
GO
ALTER TABLE [dbo].[piezaPerforador] ADD  CONSTRAINT [DF_piezaPerforador_stock]  DEFAULT ((5)) FOR [stock]
GO
ALTER TABLE [dbo].[piezaPerforador] ADD  CONSTRAINT [DF_piezaPerforador_reposicion]  DEFAULT ((5)) FOR [reposicion]
GO
ALTER TABLE [dbo].[pnq] ADD  CONSTRAINT [DF_pnq_fecha]  DEFAULT (getdate()) FOR [fecha]
GO
ALTER TABLE [dbo].[wellData] ADD  CONSTRAINT [DF_wellData_fecha]  DEFAULT (getdate()) FOR [fecha]
GO
ALTER TABLE [dbo].[item]  WITH CHECK ADD  CONSTRAINT [FK_item_diametro] FOREIGN KEY([idDiametro])
REFERENCES [dbo].[diametro] ([idDiametro])
GO
ALTER TABLE [dbo].[item] CHECK CONSTRAINT [FK_item_diametro]
GO
ALTER TABLE [dbo].[item]  WITH CHECK ADD  CONSTRAINT [FK_item_Pieza] FOREIGN KEY([idPieza])
REFERENCES [dbo].[pieza] ([idPieza])
GO
ALTER TABLE [dbo].[item] CHECK CONSTRAINT [FK_item_Pieza]
GO
ALTER TABLE [dbo].[log]  WITH CHECK ADD  CONSTRAINT [FK_log_piezaPerforador] FOREIGN KEY([idPerforadorPieza])
REFERENCES [dbo].[perforadorPieza] ([idPerforadorPieza])
GO
ALTER TABLE [dbo].[log] CHECK CONSTRAINT [FK_log_piezaPerforador]
GO
ALTER TABLE [dbo].[perforadorPieza]  WITH CHECK ADD  CONSTRAINT [FK_perforadorPieza_diametro] FOREIGN KEY([idDiametro])
REFERENCES [dbo].[diametro] ([idDiametro])
GO
ALTER TABLE [dbo].[perforadorPieza] CHECK CONSTRAINT [FK_perforadorPieza_diametro]
GO
ALTER TABLE [dbo].[perforadorPieza]  WITH CHECK ADD  CONSTRAINT [FK_perforadorPieza_Marca] FOREIGN KEY([idMarca])
REFERENCES [dbo].[marca] ([idMarca])
GO
ALTER TABLE [dbo].[perforadorPieza] CHECK CONSTRAINT [FK_perforadorPieza_Marca]
GO
ALTER TABLE [dbo].[perforadorPieza]  WITH CHECK ADD  CONSTRAINT [FK_perforadorPieza_Pieza] FOREIGN KEY([idPieza])
REFERENCES [dbo].[pieza] ([idPieza])
GO
ALTER TABLE [dbo].[perforadorPieza] CHECK CONSTRAINT [FK_perforadorPieza_Pieza]
GO
ALTER TABLE [dbo].[piezaDiametro]  WITH CHECK ADD  CONSTRAINT [FK_piezaDiametro_Diametro] FOREIGN KEY([idDiametro])
REFERENCES [dbo].[diametro] ([idDiametro])
GO
ALTER TABLE [dbo].[piezaDiametro] CHECK CONSTRAINT [FK_piezaDiametro_Diametro]
GO
ALTER TABLE [dbo].[piezaDiametro]  WITH CHECK ADD  CONSTRAINT [FK_piezaDiametro_pieza] FOREIGN KEY([idPieza])
REFERENCES [dbo].[pieza] ([idPieza])
GO
ALTER TABLE [dbo].[piezaDiametro] CHECK CONSTRAINT [FK_piezaDiametro_pieza]
GO
ALTER TABLE [dbo].[piezaPerforador]  WITH CHECK ADD  CONSTRAINT [FK_piezaPerforador_pieza] FOREIGN KEY([idPieza])
REFERENCES [dbo].[pieza] ([idPieza])
GO
ALTER TABLE [dbo].[piezaPerforador] CHECK CONSTRAINT [FK_piezaPerforador_pieza]
GO
ALTER TABLE [dbo].[pnq]  WITH CHECK ADD  CONSTRAINT [FK_pnq_item1] FOREIGN KEY([inv_item1])
REFERENCES [dbo].[item] ([inv_item])
GO
ALTER TABLE [dbo].[pnq] CHECK CONSTRAINT [FK_pnq_item1]
GO
ALTER TABLE [dbo].[pnq]  WITH CHECK ADD  CONSTRAINT [FK_pnq_item2] FOREIGN KEY([inv_item2])
REFERENCES [dbo].[item] ([inv_item])
GO
ALTER TABLE [dbo].[pnq] CHECK CONSTRAINT [FK_pnq_item2]
GO
ALTER TABLE [dbo].[pnq]  WITH CHECK ADD  CONSTRAINT [FK_pnq_item3] FOREIGN KEY([inv_item3])
REFERENCES [dbo].[item] ([inv_item])
GO
ALTER TABLE [dbo].[pnq] CHECK CONSTRAINT [FK_pnq_item3]
GO
ALTER TABLE [dbo].[pnq]  WITH CHECK ADD  CONSTRAINT [FK_pnq_item4] FOREIGN KEY([inv_item4])
REFERENCES [dbo].[item] ([inv_item])
GO
ALTER TABLE [dbo].[pnq] CHECK CONSTRAINT [FK_pnq_item4]
GO
USE [master]
GO
ALTER DATABASE [perforador] SET  READ_WRITE 
GO
