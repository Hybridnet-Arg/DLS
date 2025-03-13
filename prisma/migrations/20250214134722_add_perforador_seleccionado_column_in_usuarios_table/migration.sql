BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[usuarios] ADD [perforador_seleccionado] INT;

-- AddForeignKey
ALTER TABLE [dbo].[usuarios] ADD CONSTRAINT [usuarios_perforador_seleccionado_fkey] FOREIGN KEY ([perforador_seleccionado]) REFERENCES [dbo].[perforadores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
