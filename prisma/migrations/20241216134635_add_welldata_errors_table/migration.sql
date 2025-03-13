BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[wellDataErrors] (
    [idWellData] INT NOT NULL IDENTITY(1,1),
    [fecha] DATETIME CONSTRAINT [DF_wellDataErrors_fecha] DEFAULT CURRENT_TIMESTAMP,
    [hsBomba1] DECIMAL(18,1) NOT NULL,
    [hsBomba2] DECIMAL(18,1) NOT NULL,
    [hsBomba3] DECIMAL(18,1) NOT NULL,
    [lts] DECIMAL(18,1) NOT NULL,
    [perforador] INT,
    [jobId] NCHAR(30),
    [perforadorStr] NCHAR(10),
    [onBomba1] TINYINT,
    [onBomba2] TINYINT,
    [onBomba3] TINYINT,
    CONSTRAINT [PK_wellDataErrors] PRIMARY KEY CLUSTERED ([idWellData])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
