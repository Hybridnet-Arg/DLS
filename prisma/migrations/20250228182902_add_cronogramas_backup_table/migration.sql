BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[marcasTipoPieza] DROP CONSTRAINT [marcasTipoPieza_idMarca_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[marcasTipoPieza] DROP CONSTRAINT [marcasTipoPieza_idTipoPieza_fkey];

-- CreateTable
CREATE TABLE [dbo].[cronogramas_backup] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [fecha_inicio] DATETIME2 NOT NULL,
    [fecha_fin] DATETIME2 NOT NULL,
    [usuario_id] INT NOT NULL,
    [ubicacion_id] INT NOT NULL,
    [estado_cronograma_id] INT NOT NULL,
    [cronograma_id] INT NOT NULL,
    [perforadores_cronograma] NVARCHAR(max) NOT NULL,
    [locaciones_perforador_cronograma] NVARCHAR(max) NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [cronogramas_backup_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [cronogramas_backup_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cronogramas_backup_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[marcasTipoPieza] ADD CONSTRAINT [marcasTipoPieza_idMarca_fkey] FOREIGN KEY ([idMarca]) REFERENCES [dbo].[marca]([idMarca]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[marcasTipoPieza] ADD CONSTRAINT [marcasTipoPieza_idTipoPieza_fkey] FOREIGN KEY ([idTipoPieza]) REFERENCES [dbo].[tiposPieza]([idTipoPieza]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[cronogramas_backup] ADD CONSTRAINT [cronogramas_backup_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuarios]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[cronogramas_backup] ADD CONSTRAINT [cronogramas_backup_ubicacion_id_fkey] FOREIGN KEY ([ubicacion_id]) REFERENCES [dbo].[ubicaciones]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[cronogramas_backup] ADD CONSTRAINT [cronogramas_backup_estado_cronograma_id_fkey] FOREIGN KEY ([estado_cronograma_id]) REFERENCES [dbo].[estados_cronograma]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[cronogramas_backup] ADD CONSTRAINT [cronogramas_backup_cronograma_id_fkey] FOREIGN KEY ([cronograma_id]) REFERENCES [dbo].[cronogramas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
