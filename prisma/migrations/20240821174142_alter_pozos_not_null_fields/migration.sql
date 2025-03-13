BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[pozos] DROP CONSTRAINT [pozos_estado_pozo_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[pozos] DROP CONSTRAINT [pozos_perforador_locacion_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[pozos] ALTER COLUMN [fecha_inicio] DATE NULL;
ALTER TABLE [dbo].[pozos] ALTER COLUMN [fecha_fin] DATE NULL;
ALTER TABLE [dbo].[pozos] ALTER COLUMN [estado_pozo_id] INT NULL;
ALTER TABLE [dbo].[pozos] ALTER COLUMN [perforador_locacion_id] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_estado_pozo_id_fkey] FOREIGN KEY ([estado_pozo_id]) REFERENCES [dbo].[estados_pozo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pozos] ADD CONSTRAINT [pozos_perforador_locacion_id_fkey] FOREIGN KEY ([perforador_locacion_id]) REFERENCES [dbo].[perforador_locaciones]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
