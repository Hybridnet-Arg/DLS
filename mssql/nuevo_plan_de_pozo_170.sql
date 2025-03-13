/* Perforador 170 , solución temporal para permitir cargar un nuevo plan de pozo */
BEGIN TRY
    BEGIN TRANSACTION;

    /* solucion temporal crear perforador temporal */
    SET IDENTITY_INSERT [dbo].[perforadores] ON
    INSERT INTO [dbo].[perforadores]
    (id, nombre, nombre_clave, numero, descripcion, estado, deshabilitado, creado_el, actualizado_el)
    VALUES(15, 'TEMPORAL', 'TEMPORAL', 1000, '', 'Operativo', 0, GETDATE(), GETDATE());
    SET IDENTITY_INSERT [dbo].[perforadores] OFF 

    /* solucion temporal asignar la locacion actual del 170 al perforador temporal */
    UPDATE perforador_locaciones
    SET perforador_id=15
    WHERE locacion_id=8;

    /* solucion temporal asignar el plan de pozo del 170 al perforador temporal */
    UPDATE planes_pozo
    SET perforador_id=15
    WHERE perforador_locacion_id=11;

    /* Agregamos locacion WP05 al 170 */
    INSERT INTO perforador_locaciones
    (activo, locacion_id, perforador_id, fecha_inicio, fecha_fin, creado_el, actualizado_el)
    VALUES(1, 15, 5, '', '', GETDATE(), GETDATE());

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;
