BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[planificacion_actividades] DROP CONSTRAINT [planificacion_actividades_nombre_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
