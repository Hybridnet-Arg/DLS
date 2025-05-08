BEGIN TRY

BEGIN TRAN;

-- DLS4167
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (1, 77000, 10000, 20000, 1, 1, 1);
-- DLS4165
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (2, 77000, 10000, 20000, 1, 1, 1);
-- DLS4166
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (3, 77000, 10000, 20000, 1, 1, 1);
-- DLS4163
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (4, 77000, 10000, 20000, 1, 1, 1);
-- DLS4170
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (5, 77000, 10000, 20000, 1, 1, 1);
-- DLS4169
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (6, 77000, 10000, 20000, 1, 1, 1);
-- DLS4173
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (9, 77000, 10000, 20000, 1, 1, 1);
-- PAE001
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (12, 77000, 10000, 20000, 1, 1, 1);
-- DLS4168
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (13, 77000, 10000, 20000, 1, 1, 1);
-- PAE4174
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso, usuario_id) VALUES (14, 77000, 10000, 20000, 1, 1, 1);
-- DLS4171
INSERT INTO tanques (perforador_id, capacidad, nivel_critico, nivel_alerta, habilitado, en_uso,  usuario_id) VALUES (16, 77000, 10000, 20000, 1, 1, 1);

update perforadores set nombre = 'DLS4174', descripcion = 'DLS4174' where id = 14;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH