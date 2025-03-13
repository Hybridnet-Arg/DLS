BEGIN TRY

BEGIN TRAN;

  SET IDENTITY_INSERT [dbo].[pozos] ON
  INSERT INTO pozos
  (id, nombre, nombre_clave, descripcion, profundidad, fecha_inicio, fecha_fin, activo, estado_pozo_id, perforador_locacion_id, creado_el, actualizado_el, plan_pozo_id, en_progreso)
  VALUES(86, 'YPF.NQ.LLL- 1699(h)', 'YPF.NQ.LLL- 1699(h)', '', 0, '', '', 1, null, 27, '2025-02-23 19:06:16.787', '2025-02-23 19:06:16.787', 19, 0);
  SET IDENTITY_INSERT [dbo].[pozos] OFF

  SET IDENTITY_INSERT [dbo].[etapas_pozo] ON
  INSERT INTO etapas_pozo
  (id, profundidad_desde, profundidad_hasta, casing, pozo_id, creado_el, actualizado_el, encamisado, tipo_etapa_pozo_id, duracion)
  VALUES(249, 0, 750.00, '12.1/4" - 9.5/8" 36#', 86, '2025-02-23 19:06:16.787', '2025-02-23 19:06:16.787', 0, 1, 1);
  SET IDENTITY_INSERT [dbo].[etapas_pozo] OFF

  SET IDENTITY_INSERT [dbo].[etapas_pozo] ON
  INSERT INTO etapas_pozo
  (id, profundidad_desde, profundidad_hasta, casing, pozo_id, creado_el, actualizado_el, encamisado, tipo_etapa_pozo_id, duracion)
  VALUES(250, 750.00, 2400.00, '8.75" - 7.5/8" 24#', 86, '2025-02-23 19:06:16.787', '2025-02-23 19:06:16.787', 0, 2, 4);
  SET IDENTITY_INSERT [dbo].[etapas_pozo] OFF

  SET IDENTITY_INSERT [dbo].[etapas_pozo] ON
  INSERT INTO etapas_pozo
  (id, profundidad_desde, profundidad_hasta, casing, pozo_id, creado_el, actualizado_el, encamisado, tipo_etapa_pozo_id, duracion)
  VALUES(251, 2400.00, 7600.00, '6,75 - 5" 21,4#', 86, '2025-02-23 19:06:16.787', '2025-02-23 19:06:16.787', 0, 4, 13);
  SET IDENTITY_INSERT [dbo].[etapas_pozo] OFF

  SET IDENTITY_INSERT [dbo].[detalles_estado_diagrama] ON
  INSERT INTO detalles_estado_diagrama
  (id, estado_diagrama_id, pozo_id, etapa_pozo_id, conecta_con_etapa, creado_el, actualizado_el)
  VALUES(249, 19, 86, 249, NULL, '2025-02-23 19:06:16.787', '2025-02-23 19:06:16.787');
  SET IDENTITY_INSERT [dbo].[detalles_estado_diagrama] OFF

  SET IDENTITY_INSERT [dbo].[detalles_estado_diagrama] ON
  INSERT INTO detalles_estado_diagrama
  (id, estado_diagrama_id, pozo_id, etapa_pozo_id, conecta_con_etapa, creado_el, actualizado_el)
  VALUES(250, 19, 86, 250, NULL, '2025-02-23 19:06:16.787', '2025-02-23 19:06:16.787');
  SET IDENTITY_INSERT [dbo].[detalles_estado_diagrama] OFF

  SET IDENTITY_INSERT [dbo].[detalles_estado_diagrama] ON
  INSERT INTO detalles_estado_diagrama
  (id, estado_diagrama_id, pozo_id, etapa_pozo_id, conecta_con_etapa, creado_el, actualizado_el)
  VALUES(251, 19, 86, 251, NULL, '2025-02-23 19:06:16.787', '2025-02-23 19:06:16.787');
  SET IDENTITY_INSERT [dbo].[detalles_estado_diagrama] OFF

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH