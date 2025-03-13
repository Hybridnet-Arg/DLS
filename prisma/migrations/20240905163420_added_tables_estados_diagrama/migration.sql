BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[estados_diagrama] (
    [id] INT NOT NULL IDENTITY(1,1),
    [perforador_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [estados_diagrama_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [estados_diagrama_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [estados_diagrama_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[detalles_estado_diagrama] (
    [id] INT NOT NULL IDENTITY(1,1),
    [estado_diagrama_id] INT NOT NULL,
    [pozo_id] INT NOT NULL,
    [etapa_pozo_id] INT NOT NULL,
    [conecta_con_etapa] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [detalles_estado_diagrama_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [detalles_estado_diagrama_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [detalles_estado_diagrama_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_estados_diagrama_perforador_id] ON [dbo].[estados_diagrama]([perforador_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_estado_diagrama_pozo_id] ON [dbo].[detalles_estado_diagrama]([pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_estado_diagrama_etapa_pozo_id] ON [dbo].[detalles_estado_diagrama]([etapa_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_estado_diagrama_estado_diagrama_id] ON [dbo].[detalles_estado_diagrama]([estado_diagrama_id]);

-- AddForeignKey
ALTER TABLE [dbo].[estados_diagrama] ADD CONSTRAINT [estados_diagrama_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_estado_diagrama] ADD CONSTRAINT [detalles_estado_diagrama_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_estado_diagrama] ADD CONSTRAINT [detalles_estado_diagrama_etapa_pozo_id_fkey] FOREIGN KEY ([etapa_pozo_id]) REFERENCES [dbo].[etapas_pozo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_estado_diagrama] ADD CONSTRAINT [detalles_estado_diagrama_estado_diagrama_id_fkey] FOREIGN KEY ([estado_diagrama_id]) REFERENCES [dbo].[estados_diagrama]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
