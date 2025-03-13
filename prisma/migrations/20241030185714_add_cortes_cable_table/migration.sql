BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[diametros] ADD [largo_cable] DECIMAL(18,1);

-- CreateTable
CREATE TABLE [dbo].[cortes_cable] (
    [id] INT NOT NULL IDENTITY(1,1),
    [metros_corte] DECIMAL(18,1),
    [fecha_corte] DATETIME2,
    [remanente] DECIMAL(18,1),
    [elemento_deposito_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [cortes_cable_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [cortes_cable_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [cortes_cable_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[cortes_cable] ADD CONSTRAINT [cortes_cable_elemento_deposito_id_fkey] FOREIGN KEY ([elemento_deposito_id]) REFERENCES [dbo].[elementos_deposito]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
