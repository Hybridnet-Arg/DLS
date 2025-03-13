BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[perforadores] ADD [ubicacion_id] INT;

-- AddForeignKey
ALTER TABLE [dbo].[perforadores] ADD CONSTRAINT [perforadores_ubicacion_id_fkey] FOREIGN KEY ([ubicacion_id]) REFERENCES [dbo].[ubicaciones]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
