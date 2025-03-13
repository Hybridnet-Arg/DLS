/* 
  Perforador 170
  Aplicar esta query cuando se habilite el boton para finalizar plan de pozo,
  de esta manera la solucion temporal aplicada antes vuelve a su estado original 
  y queda en el historico de planes de pozo del 170
*/
BEGIN TRY
    BEGIN TRANSACTION;

    /* revertir */
    UPDATE perforador_locaciones
    SET perforador_id=5
    WHERE locacion_id=8;

    /* revertir */
    UPDATE planes_pozo
    SET perforador_id=5
    WHERE perforador_locacion_id=11;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;
