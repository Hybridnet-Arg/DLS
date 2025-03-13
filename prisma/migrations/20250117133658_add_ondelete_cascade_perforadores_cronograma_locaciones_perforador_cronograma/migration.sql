BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[locaciones_perforador_cronograma] DROP CONSTRAINT [locaciones_perforador_cronograma_perforador_cronograma_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[perforadores_cronograma] DROP CONSTRAINT [perforadores_cronograma_cronograma_id_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[perforadores_cronograma] ADD CONSTRAINT [perforadores_cronograma_cronograma_id_fkey] FOREIGN KEY ([cronograma_id]) REFERENCES [dbo].[cronogramas]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[locaciones_perforador_cronograma] ADD CONSTRAINT [locaciones_perforador_cronograma_perforador_cronograma_id_fkey] FOREIGN KEY ([perforador_cronograma_id]) REFERENCES [dbo].[perforadores_cronograma]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
