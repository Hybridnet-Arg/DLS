BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE locaciones
    SET nombre='GX1GX2',
    nombre_clave='GX1GX2',
    descripcion='GX1GX2'
    WHERE id=4;

    UPDATE locaciones
    SET nombre='WP026',
    nombre_clave='WP026',
    descripcion='WP026'
    WHERE id=1;

    UPDATE locaciones
    SET nombre='LAJE45',
    nombre_clave='LAJE45',
    descripcion='LAJE45'
    WHERE id=7;

    UPDATE locaciones
    SET nombre='LC276',
    nombre_clave='LC276',
    descripcion='LC276'
    WHERE id=6;

    UPDATE locaciones
    SET nombre='BDT07',
    nombre_clave='BDT07',
    descripcion='BDT07'
    WHERE id=14;

    UPDATE locaciones
    SET nombre='LC343',
    nombre_clave='LC343',
    descripcion='LC343'
    WHERE id=9;

    UPDATE locaciones
    SET nombre='WP033',
    nombre_clave='WP033',
    descripcion='WP033'
    WHERE id=12;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;


