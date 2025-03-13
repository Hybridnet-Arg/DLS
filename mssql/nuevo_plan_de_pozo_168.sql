
/* Perforador 168 , solución temporal para permitir cargar un nuevo plan de pozo */
BEGIN TRY
    BEGIN TRANSACTION;

    /* solucion temporal asignar la locacion actual del 168 al perforador temporal */
    UPDATE perforador_locaciones
    SET perforador_id=15
    WHERE locacion_id=14;

    /* solucion temporal asignar el plan de pozo del 168 al perforador temporal */
    UPDATE planes_pozo
    SET perforador_id=15
    WHERE perforador_locacion_id=17;

    /* Agregamos locacion LCAV174 al 168 */
    INSERT INTO perforador_locaciones
    (activo, locacion_id, perforador_id, fecha_inicio, fecha_fin, creado_el, actualizado_el)
    VALUES(1, 16, 13, '', '', GETDATE(), GETDATE());

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;
