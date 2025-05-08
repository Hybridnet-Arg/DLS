BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[tubulares_documentos] DROP CONSTRAINT [tubulares_documentos_tubulares_movimiento_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] DROP CONSTRAINT [tubulares_movimientos_perforador_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] DROP CONSTRAINT [tubulares_movimientos_tubular_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_conexiones] DROP CONSTRAINT [tubulares_movimientos_conexiones_tubulares_movimiento_origen_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_prestamos] DROP CONSTRAINT [tubulares_movimientos_prestamos_tubular_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[tubulares] ALTER COLUMN [perforador_locacion_id] INT NULL;
ALTER TABLE [dbo].[tubulares] ADD [perforador_id] INT,
[plan_pozo_id] INT;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares] ADD CONSTRAINT [tubulares_plan_pozo_id_fkey] FOREIGN KEY ([plan_pozo_id]) REFERENCES [dbo].[planes_pozo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares] ADD CONSTRAINT [tubulares_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_tubular_id_fkey] FOREIGN KEY ([tubular_id]) REFERENCES [dbo].[tubulares]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos] ADD CONSTRAINT [tubulares_movimientos_perforador_id_fkey] FOREIGN KEY ([perforador_id]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_prestamos] ADD CONSTRAINT [tubulares_movimientos_prestamos_tubular_id_fkey] FOREIGN KEY ([tubular_id]) REFERENCES [dbo].[tubulares]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_movimientos_conexiones] ADD CONSTRAINT [tubulares_movimientos_conexiones_tubulares_movimiento_origen_id_fkey] FOREIGN KEY ([tubulares_movimiento_origen_id]) REFERENCES [dbo].[tubulares_movimientos]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tubulares_documentos] ADD CONSTRAINT [tubulares_documentos_tubulares_movimiento_id_fkey] FOREIGN KEY ([tubulares_movimiento_id]) REFERENCES [dbo].[tubulares_movimientos]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
