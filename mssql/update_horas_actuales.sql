BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE elementos_deposito
    SET horas_actuales = 0
    WHERE elemento_componente_id IN (1, 2, 3, 4)
    AND en_uso = 1
    AND baja = 0
    AND horas_actuales IS NULL;
    
    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;


