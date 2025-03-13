BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[perforador_locaciones] ALTER COLUMN [fecha_inicio] DATE NULL;
ALTER TABLE [dbo].[perforador_locaciones] ALTER COLUMN [fecha_fin] DATE NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
