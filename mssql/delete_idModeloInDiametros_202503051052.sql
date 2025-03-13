BEGIN TRANSACTION;

-- 1️⃣ Eliminar la clave foránea si existe
DECLARE @constraint_name NVARCHAR(200);

SELECT @constraint_name = name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('dbo.diametro') AND referenced_object_id = OBJECT_ID('dbo.modelo');

IF @constraint_name IS NOT NULL
BEGIN
    EXEC ('ALTER TABLE dbo.diametro DROP CONSTRAINT ' + @constraint_name);
END

-- 2️⃣ Eliminar la columna idModelo de la tabla diametro si existe
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'diametro' AND COLUMN_NAME = 'idModelo')
BEGIN
    ALTER TABLE dbo.diametro DROP COLUMN idModelo;
END

COMMIT TRANSACTION;
