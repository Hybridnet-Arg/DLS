BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[perforador_locaciones] ALTER COLUMN [fecha_inicio] DATETIME NULL;
ALTER TABLE [dbo].[perforador_locaciones] ALTER COLUMN [fecha_fin] DATETIME NULL;

-- AlterTable
ALTER TABLE [dbo].[planes_pozo] ALTER COLUMN [fecha_fin] DATETIME NULL;
ALTER TABLE [dbo].[planes_pozo] ALTER COLUMN [fecha_inicio] DATETIME NULL;

-- AlterTable
ALTER TABLE [dbo].[pozos] ALTER COLUMN [fecha_inicio] DATETIME NULL;
ALTER TABLE [dbo].[pozos] ALTER COLUMN [fecha_fin] DATETIME NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
