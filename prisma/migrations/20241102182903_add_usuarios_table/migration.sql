BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[usuarios] (
    [id] INT NOT NULL IDENTITY(1,1),
    [alias] VARCHAR(255) NOT NULL,
    [ultimo_ingreso] DATETIME NOT NULL CONSTRAINT [usuarios_ultimo_ingreso_df] DEFAULT CURRENT_TIMESTAMP,
    [creado_el] DATETIME NOT NULL CONSTRAINT [usuarios_creado_el_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizado_el] DATETIME NOT NULL CONSTRAINT [usuarios_actualizado_el_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [usuarios_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [usuarios_alias_key] UNIQUE NONCLUSTERED ([alias])
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
