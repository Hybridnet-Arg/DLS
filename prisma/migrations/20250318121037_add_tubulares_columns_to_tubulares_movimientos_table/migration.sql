BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[tubulares_movimientos] ADD [tubulares_rango_id] INT,
[tubulares_tipo_barra_id] INT,
[tubulares_tipo_conexion_id] INT;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubulares_rango_id_fkey] FOREIGN KEY ([tubulares_rango_id]) REFERENCES [dbo].[tubulares_rangos]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubulares_tipo_barra_id_fkey] FOREIGN KEY ([tubulares_tipo_barra_id]) REFERENCES [dbo].[tubulares_tipos_barra]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubulares_tipo_conexion_id_fkey] FOREIGN KEY ([tubulares_tipo_conexion_id]) REFERENCES [dbo].[tubulares_tipos_conexion]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
