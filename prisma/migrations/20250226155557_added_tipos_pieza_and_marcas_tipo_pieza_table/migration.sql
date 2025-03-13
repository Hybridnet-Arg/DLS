BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[pieza] ADD [idTipoPieza] INT NULL;

-- CreateTable
CREATE TABLE [dbo].[tiposPieza] (
    [idTipoPieza] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [tiposPieza_pkey] PRIMARY KEY CLUSTERED ([idTipoPieza])
);

-- CreateTable
CREATE TABLE [dbo].[marcasTipoPieza] (
    [id] INT NOT NULL IDENTITY(1,1),
    [idMarca] INT NOT NULL,
    [idTipoPieza] INT NOT NULL,
    CONSTRAINT [marcasTipoPieza_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [marcasTipoPieza_idMarca_idTipoPieza_key] UNIQUE NONCLUSTERED ([idMarca],[idTipoPieza])
);

-- AddForeignKey
ALTER TABLE [dbo].[pieza] ADD CONSTRAINT [pieza_idTipoPieza_fkey] FOREIGN KEY ([idTipoPieza]) REFERENCES [dbo].[tiposPieza]([idTipoPieza]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[marcasTipoPieza] ADD CONSTRAINT [marcasTipoPieza_idMarca_fkey] FOREIGN KEY ([idMarca]) REFERENCES [dbo].[marca]([idMarca]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[marcasTipoPieza] ADD CONSTRAINT [marcasTipoPieza_idTipoPieza_fkey] FOREIGN KEY ([idTipoPieza]) REFERENCES [dbo].[tiposPieza]([idTipoPieza]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
