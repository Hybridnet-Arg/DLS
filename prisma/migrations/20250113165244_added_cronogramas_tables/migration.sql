BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[estados_cronograma] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [estados_cronograma_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [estados_cronograma_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [estados_cronograma_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[cronogramas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [fecha_inicio] DATETIME2 NOT NULL,
    [fecha_fin] DATETIME2 NOT NULL,
    [usuario_id] INT NOT NULL,
    [ubicacion_id] INT NOT NULL,
    [estado_cronograma_id] INT NOT NULL,
    [eliminado] BIT NOT NULL CONSTRAINT [cronogramas_eliminado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [cronogramas_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [cronogramas_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cronogramas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[perforadores_cronograma] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cronograma_id] INT NOT NULL,
    [perforador_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [perforadores_cronograma_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [perforadores_cronograma_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [perforadores_cronograma_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[locaciones_perforador_cronograma] (
    [id] INT NOT NULL IDENTITY(1,1),
    [fecha_inicio] DATETIME2 NOT NULL,
    [fecha_fin] DATETIME2 NOT NULL,
    [locacion_id] INT NOT NULL,
    [perforador_cronograma_id] INT NOT NULL,
    [cantidad_pozos] INT NOT NULL,
    [deshabilitado] BIT NOT NULL CONSTRAINT [locaciones_perforador_cronograma_deshabilitado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [locaciones_perforador_cronograma_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [locaciones_perforador_cronograma_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [locaciones_perforador_cronograma_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_estados_cronograma_nombre] ON [dbo].[estados_cronograma]([nombre]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_cronogramas_nombre] ON [dbo].[cronogramas]([nombre]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_cronogramas_estado_cronograma_id] ON [dbo].[cronogramas]([estado_cronograma_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_cronogramas_ubicacion_id_eliminado] ON [dbo].[cronogramas]([ubicacion_id], [eliminado]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_perforadores_cronograma_perforador_id_cronograma_id] ON [dbo].[perforadores_cronograma]([cronograma_id], [perforador_id]);

-- AddForeignKey
ALTER TABLE [dbo].[cronogramas] ADD CONSTRAINT [cronogramas_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuarios]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[cronogramas] ADD CONSTRAINT [cronogramas_ubicacion_id_fkey] FOREIGN KEY ([ubicacion_id]) REFERENCES [dbo].[ubicaciones]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[cronogramas] ADD CONSTRAINT [cronogramas_estado_cronograma_id_fkey] FOREIGN KEY ([estado_cronograma_id]) REFERENCES [dbo].[estados_cronograma]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[perforadores_cronograma] ADD CONSTRAINT [perforadores_cronograma_cronograma_id_fkey] FOREIGN KEY ([cronograma_id]) REFERENCES [dbo].[cronogramas]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[perforadores_cronograma] ADD CONSTRAINT [perforadores_cronograma_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[locaciones_perforador_cronograma] ADD CONSTRAINT [locaciones_perforador_cronograma_perforador_cronograma_id_fkey] FOREIGN KEY ([perforador_cronograma_id]) REFERENCES [dbo].[perforadores_cronograma]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[locaciones_perforador_cronograma] ADD CONSTRAINT [locaciones_perforador_cronograma_locacion_id_fkey] FOREIGN KEY ([locacion_id]) REFERENCES [dbo].[locaciones]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
