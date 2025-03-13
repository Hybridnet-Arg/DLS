BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[planificacion_areas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [deshabilitado] BIT NOT NULL CONSTRAINT [planificacion_areas_deshabilitado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [planificacion_areas_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [planificacion_areas_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [planificacion_areas_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [planificacion_areas_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[planificacion_actividades] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [planificacion_area_id] INT NOT NULL,
    [deshabilitado] BIT NOT NULL CONSTRAINT [planificacion_actividades_deshabilitado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [planificacion_actividades_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [planificacion_actividades_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [planificacion_actividades_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [planificacion_actividades_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateTable
CREATE TABLE [dbo].[planificaciones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [planificacion_actividad_id] INT NOT NULL,
    [tarea_forecast_id] INT NOT NULL,
    [eliminado] BIT NOT NULL CONSTRAINT [planificaciones_eliminado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [planificaciones_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [planificaciones_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [planificaciones_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[planificacion_actividades] ADD CONSTRAINT [planificacion_actividades_planificacion_area_id_fkey] FOREIGN KEY ([planificacion_area_id]) REFERENCES [dbo].[planificacion_areas]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[planificaciones] ADD CONSTRAINT [planificaciones_planificacion_actividad_id_fkey] FOREIGN KEY ([planificacion_actividad_id]) REFERENCES [dbo].[planificacion_actividades]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[planificaciones] ADD CONSTRAINT [planificaciones_tarea_forecast_id_fkey] FOREIGN KEY ([tarea_forecast_id]) REFERENCES [dbo].[tareas_forecast]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
