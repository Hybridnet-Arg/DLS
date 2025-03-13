-- PAE001
BEGIN TRY
    BEGIN TRANSACTION;

    DELETE FROM avances_pozo
    WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 12
    );


    DELETE FROM detalles_estado_diagrama
    WHERE etapa_pozo_id IN (
        SELECT id FROM etapas_pozo
        WHERE pozo_id IN (
            SELECT id FROM pozos
            WHERE plan_pozo_id = 12
        )
    );


    DELETE FROM estados_diagrama
    WHERE plan_pozo_id = 12;


    DELETE FROM etapas_pozo
     WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 12
    );

    DELETE FROM pozos
    WHERE plan_pozo_id = 12;

    DELETE FROM planes_pozo
    WHERE id = 12;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;


-- DLS4166
BEGIN TRY
    BEGIN TRANSACTION;

    DELETE FROM avances_pozo
    WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 6
    );


    DELETE FROM detalles_estado_diagrama
    WHERE etapa_pozo_id IN (
        SELECT id FROM etapas_pozo
        WHERE pozo_id IN (
            SELECT id FROM pozos
            WHERE plan_pozo_id = 6
        )
    );


    DELETE FROM estados_diagrama
    WHERE plan_pozo_id = 6;


    DELETE FROM etapas_pozo
     WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 6
    );

    DELETE FROM pozos
    WHERE plan_pozo_id = 6;

    DELETE FROM planes_pozo
    WHERE id = 6;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;


-- 169
BEGIN TRY
    BEGIN TRANSACTION;

    DELETE FROM avances_pozo
    WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 5
    );


    DELETE FROM detalles_estado_diagrama
    WHERE etapa_pozo_id IN (
        SELECT id FROM etapas_pozo
        WHERE pozo_id IN (
            SELECT id FROM pozos
            WHERE plan_pozo_id = 5
        )
    );


    DELETE FROM estados_diagrama
    WHERE plan_pozo_id = 5;


    DELETE FROM etapas_pozo
     WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 5
    );

    DELETE FROM pozos
    WHERE plan_pozo_id = 5;

    DELETE FROM planes_pozo
    WHERE id = 5;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;

-- 167
BEGIN TRY
    BEGIN TRANSACTION;

    DELETE FROM avances_pozo
    WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 7
    );


    DELETE FROM detalles_estado_diagrama
    WHERE etapa_pozo_id IN (
        SELECT id FROM etapas_pozo
        WHERE pozo_id IN (
            SELECT id FROM pozos
            WHERE plan_pozo_id = 7
        )
    );


    DELETE FROM estados_diagrama
    WHERE plan_pozo_id = 7;


    DELETE FROM etapas_pozo
     WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 7
    );

    DELETE FROM pozos
    WHERE plan_pozo_id = 7;

    DELETE FROM planes_pozo
    WHERE id = 7;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;


-- 165
BEGIN TRY
    BEGIN TRANSACTION;

    DELETE FROM avances_pozo
    WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 3
    );


    DELETE FROM detalles_estado_diagrama
    WHERE etapa_pozo_id IN (
        SELECT id FROM etapas_pozo
        WHERE pozo_id IN (
            SELECT id FROM pozos
            WHERE plan_pozo_id = 3
        )
    );


    DELETE FROM estados_diagrama
    WHERE plan_pozo_id = 3;


    DELETE FROM etapas_pozo
     WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 3
    );

    DELETE FROM pozos
    WHERE plan_pozo_id = 3;

    DELETE FROM planes_pozo
    WHERE id = 3;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;

-- 163
BEGIN TRY
    BEGIN TRANSACTION;

    DELETE FROM avances_pozo
    WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 4
    );


    DELETE FROM detalles_estado_diagrama
    WHERE etapa_pozo_id IN (
        SELECT id FROM etapas_pozo
        WHERE pozo_id IN (
            SELECT id FROM pozos
            WHERE plan_pozo_id = 4
        )
    );


    DELETE FROM estados_diagrama
    WHERE plan_pozo_id = 4;


    DELETE FROM etapas_pozo
     WHERE pozo_id IN (
        SELECT id FROM pozos
        WHERE plan_pozo_id = 4
    );

    DELETE FROM pozos
    WHERE plan_pozo_id = 4;

    DELETE FROM planes_pozo
    WHERE id = 4;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;