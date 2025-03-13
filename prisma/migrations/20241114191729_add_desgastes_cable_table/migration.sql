BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[desgastes_cable] (
    [id] INT NOT NULL IDENTITY(1,1),
    [elemento_id] INT NOT NULL,
    [componente_id] INT NOT NULL,
    [perforador_id] INT NOT NULL,
    [elemento_deposito_id] INT NOT NULL,
    [bit_weight] DECIMAL(18,1),
    [block_height] DECIMAL(18,1),
    [desgaste] DECIMAL(18,1),
    [creado_el] DATETIME NOT NULL CONSTRAINT [desgastes_cable_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [desgastes_cable_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [desgastes_cable_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_elemento_id_fkey] FOREIGN KEY ([elemento_id]) REFERENCES [dbo].[elementos]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_componente_id_fkey] FOREIGN KEY ([componente_id]) REFERENCES [dbo].[componentes]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_elemento_deposito_id_fkey] FOREIGN KEY ([elemento_deposito_id]) REFERENCES [dbo].[elementos_deposito]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[desgastes_cable] ADD CONSTRAINT [desgastes_cable_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
