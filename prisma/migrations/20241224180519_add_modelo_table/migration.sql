BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[perforadorPieza] ADD [idModelo] INT;

-- CreateTable
CREATE TABLE [dbo].[modelo] (
    [idModelo] INT NOT NULL IDENTITY(1,1),
    [modelo] NCHAR(50) NOT NULL,
    [idMarca] INT NOT NULL,
    CONSTRAINT [PK_modelo] PRIMARY KEY CLUSTERED ([idModelo])
);

-- AddForeignKey
ALTER TABLE [dbo].[modelo] ADD CONSTRAINT [modelo_idMarca_fkey] FOREIGN KEY ([idMarca]) REFERENCES [dbo].[marca]([idMarca]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[perforadorPieza] ADD CONSTRAINT [FK_perforadorPieza_Modelo] FOREIGN KEY ([idModelo]) REFERENCES [dbo].[modelo]([idModelo]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH


IF OBJECT_ID('dbo.disponibilidad', 'FN') IS NOT NULL
BEGIN
    DROP FUNCTION dbo.disponibilidad;
END
