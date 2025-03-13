BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[planificacion_notas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tarea_forecast_id] INT NOT NULL,
    [nota] TEXT NOT NULL,
    [eliminado] BIT NOT NULL CONSTRAINT [planificacion_notas_eliminado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [planificacion_notas_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [planificacion_notas_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [planificacion_notas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[planificacion_notas] ADD CONSTRAINT [planificacion_notas_tarea_forecast_id_fkey] FOREIGN KEY ([tarea_forecast_id]) REFERENCES [dbo].[tareas_forecast]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
