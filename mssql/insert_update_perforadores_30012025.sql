BEGIN TRY
    BEGIN TRANSACTION;

    SET IDENTITY_INSERT [dbo].[perforadores] ON
    INSERT INTO perforadores
    (id, nombre, nombre_clave, numero, descripcion, estado, deshabilitado, creado_el, actualizado_el, ubicacion_id)
    VALUES(16, 'DLS4171', '171', 171, '', 'Operativo', 0, getdate(), getdate(), 2);
    SET IDENTITY_INSERT [dbo].[perforadores] OFF

    UPDATE perforadores
    SET actualizado_el=getdate(), ubicacion_id=2
    WHERE nombre_clave='173';

    UPDATE perforadores
    SET actualizado_el=getdate(), ubicacion_id=2
    WHERE nombre_clave='174';

    UPDATE perforadores
    SET actualizado_el=getdate(), deshabilitado=1
    WHERE nombre_clave='160';

    UPDATE perforadores
    SET actualizado_el = GETDATE(), 
        ubicacion_id = 2
    WHERE nombre_clave IN ('160', '171', '173', '174');

    UPDATE perforadores
    SET actualizado_el = GETDATE(), 
        ubicacion_id = 1
    WHERE nombre_clave IN ('167', '165', '166', '163', '170', '169', '156', '1', '168');
    
    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;


