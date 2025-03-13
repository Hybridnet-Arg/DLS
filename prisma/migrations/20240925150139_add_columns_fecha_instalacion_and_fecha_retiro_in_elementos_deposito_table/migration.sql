BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[elementos_deposito] ADD [fecha_instalacion] DATETIME,
[fecha_retiro] DATETIME;

-- AlterTable
ALTER TABLE [dbo].[tipos_elemento] ADD [horas_desde] INT,
[horas_hasta] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
