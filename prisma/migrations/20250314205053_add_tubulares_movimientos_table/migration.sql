BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tubulares_destinos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_destinos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_destinos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_destinos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares] (
    [id] INT NOT NULL IDENTITY(1,1),
    [activo] BIT NOT NULL CONSTRAINT [tubulares_activo_df] DEFAULT 1,
    [perforador_locacion_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_movimientos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [estado] NVARCHAR(1000) NOT NULL,
    [fecha] DATETIME2 NOT NULL,
    [cantidad] INT,
    [usuario_id] INT NOT NULL,
    [tubular_id] INT NOT NULL,
    [perforador_id] INT NOT NULL,
    [tubulares_taller_id] INT,
    [tubulares_destino_id] INT NOT NULL,
    [tubulares_estado_barra_id] INT,
    [perforador_locacion_id] INT,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_movimientos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_movimientos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_movimientos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_talleres] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_talleres_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_talleres_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_talleres_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tubulares_documentos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tipo] NVARCHAR(1000) NOT NULL,
    [fecha] DATETIME2 NOT NULL,
    [referencia] NVARCHAR(1000) NOT NULL,
    [tubulares_movimiento_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_documentos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_documentos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_documentos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[tubulares] ADD CONSTRAINT [tubulares_perforador_locacion_id_fkey] FOREIGN KEY ([perforador_locacion_id]) REFERENCES [dbo].[perforador_locaciones]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubular_id_fkey] FOREIGN KEY ([tubular_id]) REFERENCES [dbo].[tubulares]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuarios]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubulares_taller_id_fkey] FOREIGN KEY ([tubulares_taller_id]) REFERENCES [dbo].[tubulares_talleres]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubulares_destino_id_fkey] FOREIGN KEY ([tubulares_destino_id]) REFERENCES [dbo].[tubulares_destinos]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubulares_estado_barra_id_fkey] FOREIGN KEY ([tubulares_estado_barra_id]) REFERENCES [dbo].[tubulares_estados_barra]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_perforador_locacion_id_fkey] FOREIGN KEY ([perforador_locacion_id]) REFERENCES [dbo].[perforador_locaciones]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_documentos] ADD CONSTRAINT [tubulares_documentos_tubulares_movimiento_id_fkey] FOREIGN KEY ([tubulares_movimiento_id]) REFERENCES [dbo].[tubulares_movimientos]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
