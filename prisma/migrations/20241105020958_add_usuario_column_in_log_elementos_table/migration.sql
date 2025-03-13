BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[log_elementos] ADD [usuario_id] INT;

-- AddForeignKey
ALTER TABLE [dbo].[log_elementos] ADD CONSTRAINT [log_elementos_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuarios]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
