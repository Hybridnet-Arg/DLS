/*
  Warnings:

  - A unique constraint covering the columns `[tarea_forecast_id]` on the table `planificacion_notas` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[planificacion_notas] ADD CONSTRAINT [planificacion_notas_tarea_forecast_id_key] UNIQUE NONCLUSTERED ([tarea_forecast_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
