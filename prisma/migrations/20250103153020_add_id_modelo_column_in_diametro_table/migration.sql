BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[diametro] ADD [idModelo] INT;

-- AddForeignKey
ALTER TABLE [dbo].[diametro] ADD CONSTRAINT [diametro_idModelo_fkey] FOREIGN KEY ([idModelo]) REFERENCES [dbo].[modelo]([idModelo]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
