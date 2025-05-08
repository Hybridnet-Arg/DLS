BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tubulares_movimientos_conexiones] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tubulares_movimiento_origen_id] INT NOT NULL,
    [tubulares_movimiento_destino_id] INT NOT NULL,
    [creado_el] DATETIME NOT NULL CONSTRAINT [tubulares_movimientos_conexiones_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [tubulares_movimientos_conexiones_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tubulares_movimientos_conexiones_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tubulares_movimientos_conexiones_tubulares_movimiento_origen_id_tubulares_movimiento_destino_id_key] UNIQUE NONCLUSTERED ([tubulares_movimiento_origen_id],[tubulares_movimiento_destino_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [tubulares_movimientos_conexiones_tubulares_movimiento_origen_id_idx] ON [dbo].[tubulares_movimientos_conexiones]([tubulares_movimiento_origen_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [tubulares_movimientos_conexiones_tubulares_movimiento_destino_id_idx] ON [dbo].[tubulares_movimientos_conexiones]([tubulares_movimiento_destino_id]);

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_conexiones] ADD CONSTRAINT [tubulares_movimientos_conexiones_tubulares_movimiento_origen_id_fkey] FOREIGN KEY ([tubulares_movimiento_origen_id]) REFERENCES [dbo].[tubulares_movimientos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_conexiones] ADD CONSTRAINT [tubulares_movimientos_conexiones_tubulares_movimiento_destino_id_fkey] FOREIGN KEY ([tubulares_movimiento_destino_id]) REFERENCES [dbo].[tubulares_movimientos]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
