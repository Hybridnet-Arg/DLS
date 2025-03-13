BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[avances_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pozo_id] INT NOT NULL,
    [nivel_trepano] INT NOT NULL CONSTRAINT [avances_pozo_nivel_trepano_df] DEFAULT 0,
    [velocidad] DECIMAL(10,2),
    [curva_de_avance] DECIMAL(10,2),
    [creado_el] DATETIME NOT NULL CONSTRAINT [avances_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [avances_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [avances_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[detalles_avance_pozo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [avance_pozo_id] INT NOT NULL,
    [etapa_pozo_id] INT NOT NULL,
    [metros_acumulados] DECIMAL(10,2),
    [porcentaje_alcanzado] DECIMAL(10,2),
    [creado_el] DATETIME NOT NULL CONSTRAINT [detalles_avance_pozo_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [detalles_avance_pozo_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [detalles_avance_pozo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_avances_pozo_pozo_id] ON [dbo].[avances_pozo]([pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_avance_pozo_etapa_pozo] ON [dbo].[detalles_avance_pozo]([etapa_pozo_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_detalles_avance_pozo_avance_pozo_id] ON [dbo].[detalles_avance_pozo]([avance_pozo_id]);

-- AddForeignKey
ALTER TABLE [dbo].[avances_pozo] ADD CONSTRAINT [avances_pozo_pozo_id_fkey] FOREIGN KEY ([pozo_id]) REFERENCES [dbo].[pozos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_avance_pozo] ADD CONSTRAINT [detalles_avance_pozo_etapa_pozo_id_fkey] FOREIGN KEY ([etapa_pozo_id]) REFERENCES [dbo].[etapas_pozo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[detalles_avance_pozo] ADD CONSTRAINT [detalles_avance_pozo_avance_pozo_id_fkey] FOREIGN KEY ([avance_pozo_id]) REFERENCES [dbo].[avances_pozo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
