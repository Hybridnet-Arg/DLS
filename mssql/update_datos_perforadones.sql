
BEGIN TRY

BEGIN TRAN;

UPDATE perforadores
SET nombre_clave='170'
WHERE id=5;

UPDATE perforadores
SET nombre='PAE170', nombre_clave='17000'
WHERE id=11;

UPDATE perforadores
SET nombre='PAE001',nombre_clave='1'
WHERE id=12;


UPDATE perforadores
SET nombre='DLS4166'
WHERE id=3;

UPDATE perforadores
SET nombre='DLS4163'
WHERE id=4;

UPDATE perforadores
SET nombre='PAE163', nombre_clave = '16333'
WHERE id=7;

UPDATE perforadores
SET nombre='DLS4169'
WHERE id=6;

UPDATE perforadores
SET nombre='DLS4167'
WHERE id=1;

UPDATE perforadores
SET nombre='DLS4168'
WHERE id=13;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

