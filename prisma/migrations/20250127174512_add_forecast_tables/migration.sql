BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[perforadores_forecast] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cronograma_id] INT NOT NULL,
    [perforador_id] INT NOT NULL,
    [fecha_inicio] DATETIME2 NOT NULL,
    [fecha_fin] DATETIME2 NOT NULL,
    [eliminado] BIT NOT NULL CONSTRAINT [perforadores_forecast_eliminado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [perforadores_forecast_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [perforadores_forecast_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [perforadores_forecast_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tipos_tarea_forecast] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [nombre_clave] VARCHAR(255) NOT NULL,
    [color] VARCHAR(255) NOT NULL,
    [tipo] CHAR NOT NULL,
    [eliminado] BIT NOT NULL CONSTRAINT [tipos_tarea_forecast_eliminado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tipos_tarea_forecast_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tipos_tarea_forecast_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tipos_tarea_forecast_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tareas_forecast] (
    [id] INT NOT NULL IDENTITY(1,1),
    [perforador_forecast_id] INT NOT NULL,
    [tipo_tarea_forecast_id] INT NOT NULL,
    [locacion_perforador_cronograma_id] INT,
    [numero_pozo] INT,
    [fecha] DATETIME2 NOT NULL,
    [eliminado] BIT NOT NULL CONSTRAINT [tareas_forecast_eliminado_df] DEFAULT 0,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tareas_forecast_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tareas_forecast_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tareas_forecast_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[perforadores_forecast] ADD CONSTRAINT [perforadores_forecast_cronograma_id_fkey] FOREIGN KEY ([cronograma_id]) REFERENCES [dbo].[cronogramas]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[perforadores_forecast] ADD CONSTRAINT [perforadores_forecast_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tareas_forecast] ADD CONSTRAINT [tareas_forecast_tipo_tarea_forecast_id_fkey] FOREIGN KEY ([tipo_tarea_forecast_id]) REFERENCES [dbo].[tipos_tarea_forecast]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tareas_forecast] ADD CONSTRAINT [tareas_forecast_perforador_forecast_id_fkey] FOREIGN KEY ([perforador_forecast_id]) REFERENCES [dbo].[perforadores_forecast]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tareas_forecast] ADD CONSTRAINT [tareas_forecast_locacion_perforador_cronograma_id_fkey] FOREIGN KEY ([locacion_perforador_cronograma_id]) REFERENCES [dbo].[locaciones_perforador_cronograma]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
