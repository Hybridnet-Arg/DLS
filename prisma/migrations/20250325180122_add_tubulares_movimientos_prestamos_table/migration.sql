BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[tubulares] ADD [cantidad_inicial] INT;

-- CreateTable
CREATE TABLE [dbo].[tubulares_movimientos_prestamos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cantidad] INT NOT NULL,
    [tubular_id] INT NOT NULL,
    [tubulares_movimiento_origen_id] INT NOT NULL,
    [tubulares_movimiento_destino_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_movimientos_prestamos_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_movimientos_prestamos_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_movimientos_prestamos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_prestamos] ADD CONSTRAINT [tubulares_movimientos_prestamos_tubular_id_fkey] FOREIGN KEY ([tubular_id]) REFERENCES [dbo].[tubulares]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_prestamos] ADD CONSTRAINT [tubulares_movimientos_prestamos_tubulares_movimiento_origen_id_fkey] FOREIGN KEY ([tubulares_movimiento_origen_id]) REFERENCES [dbo].[tubulares_movimientos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_prestamos] ADD CONSTRAINT [tubulares_movimientos_prestamos_tubulares_movimiento_destino_id_fkey] FOREIGN KEY ([tubulares_movimiento_destino_id]) REFERENCES [dbo].[tubulares_movimientos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
