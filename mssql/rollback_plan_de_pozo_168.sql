/* 
  Perforador 168
  Aplicar esta query cuando se habilite el boton para finalizar plan de pozo,
  de esta manera la solucion temporal aplicada antes vuelve a su estado original 
  y queda en el historico de planes de pozo del 168
*/
BEGIN TRY
    BEGIN TRANSACTION;

    /* revertir */
    UPDATE perforador_locaciones
    SET perforador_id=13
    WHERE locacion_id=14;

    /* revertir */
    UPDATE planes_pozo
    SET perforador_id=13
    WHERE perforador_locacion_id=17;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
END CATCH;
