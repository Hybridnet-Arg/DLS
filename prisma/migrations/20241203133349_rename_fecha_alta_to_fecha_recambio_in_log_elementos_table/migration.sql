BEGIN TRY

BEGIN TRAN;

-- Rename Column
EXEC sp_rename 'dbo.log_elementos.fecha_alta', 'fecha_recambio', 'COLUMN';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW;

END CATCH
