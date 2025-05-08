
BEGIN TRY

BEGIN TRAN;

-- 1. Agregar la columna idTipoPieza permitiendo valores NULL
ALTER TABLE modelo 
ADD idTipoPieza INT NULL;

-- 2. Crear la clave foránea para relacionar modelo con tiposPieza
ALTER TABLE modelo 
ADD CONSTRAINT FK_modelo_tiposPieza 
FOREIGN KEY (idTipoPieza) REFERENCES tiposPieza(idTipoPieza);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH