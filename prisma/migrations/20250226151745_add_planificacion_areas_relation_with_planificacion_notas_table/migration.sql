BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[planificacion_notas] ADD CONSTRAINT [planificacion_notas_planificacion_area_id_fkey] FOREIGN KEY ([planificacion_area_id]) REFERENCES [dbo].[planificacion_areas]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
