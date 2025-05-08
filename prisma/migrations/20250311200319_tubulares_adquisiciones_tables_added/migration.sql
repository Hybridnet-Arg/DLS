/*
  Warnings:

  - You are about to drop the column `idModelo` on the `diametro` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tubulares_rangos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_rangos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_rangos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_rangos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_proveedores] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_proveedores_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_proveedores_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_proveedores_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_tipos_barra] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_tipos_barra_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_tipos_barra_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_tipos_barra_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_tipos_conexion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_tipos_conexion_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_tipos_conexion_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_tipos_conexion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_estados_barra] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_estados_barra_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_estados_barra_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_estados_barra_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_adquisiciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cantidad] INT NOT NULL,
    [numero_remito] NVARCHAR(1000),
    [numero_reporte] NVARCHAR(1000),
    [enlace_documento] NVARCHAR(1000),
    [perforador_id] INT NOT NULL,
    [tubulares_rango_id] INT NOT NULL,
    [tubulares_proveedor_id] INT NOT NULL,
    [tubulares_tipo_barra_id] INT NOT NULL,
    [tubulares_tipo_conexion_id] INT NOT NULL,
    [tubulares_estados_barra_id] INT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_adquisiciones_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_adquisiciones_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_adquisiciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD CONSTRAINT [tubulares_adquisiciones_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD CONSTRAINT [tubulares_adquisiciones_tubulares_rango_id_fkey] FOREIGN KEY ([tubulares_rango_id]) REFERENCES [dbo].[tubulares_rangos]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD CONSTRAINT [tubulares_adquisiciones_tubulares_proveedor_id_fkey] FOREIGN KEY ([tubulares_proveedor_id]) REFERENCES [dbo].[tubulares_proveedores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD CONSTRAINT [tubulares_adquisiciones_tubulares_tipo_barra_id_fkey] FOREIGN KEY ([tubulares_tipo_barra_id]) REFERENCES [dbo].[tubulares_tipos_barra]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD CONSTRAINT [tubulares_adquisiciones_tubulares_tipo_conexion_id_fkey] FOREIGN KEY ([tubulares_tipo_conexion_id]) REFERENCES [dbo].[tubulares_tipos_conexion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_adquisiciones] ADD CONSTRAINT [tubulares_adquisiciones_tubulares_estados_barra_id_fkey] FOREIGN KEY ([tubulares_estados_barra_id]) REFERENCES [dbo].[tubulares_estados_barra]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
