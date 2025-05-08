
BEGIN TRY

BEGIN TRAN;

  -- 1. Verificar si la columna idDiametro ya existe en la tabla modelo
  IF NOT EXISTS (
      SELECT 1 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'modelo' 
      AND COLUMN_NAME = 'idDiametro'
  )
  BEGIN
      -- 2. Agregar la columna idDiametro (permitiendo valores nulos)
      ALTER TABLE modelo ADD idDiametro INT NULL;
  END

  -- 3. Verificar si la clave foránea ya existe antes de agregarla
  IF NOT EXISTS (
      SELECT 1 
      FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
      JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu 
      ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
      WHERE tc.TABLE_NAME = 'modelo' 
      AND kcu.COLUMN_NAME = 'idDiametro'
  )
  BEGIN
      -- 4. Agregar la clave foránea opcional (ON DELETE SET NULL en caso de eliminación del diámetro)
      ALTER TABLE modelo 
      ADD CONSTRAINT FK_modelo_diametro 
      FOREIGN KEY (idDiametro) 
      REFERENCES diametro(idDiametro) 
      ON DELETE SET NULL;
  END


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH