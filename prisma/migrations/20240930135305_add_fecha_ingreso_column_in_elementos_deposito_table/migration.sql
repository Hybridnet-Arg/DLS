BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[elementos_deposito] ADD [fecha_ingreso] DATETIME;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
