BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[elementos_deposito] ADD [diametro_id] INT,
[marca_id] INT;

-- CreateTable
CREATE TABLE [dbo].[diametros] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pulgadas] DECIMAL(18,1),
    [corte] DECIMAL(18,1),
    [largo_corte] DECIMAL(18,1),
    [creado_el] DATETIME NOT NULL CONSTRAINT [diametros_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [diametros_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [diametros_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_marca_id_fkey] FOREIGN KEY ([marca_id]) REFERENCES [dbo].[marcas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[elementos_deposito] ADD CONSTRAINT [elementos_deposito_diametro_id_fkey] FOREIGN KEY ([diametro_id]) REFERENCES [dbo].[diametros]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
