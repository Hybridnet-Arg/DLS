BEGIN TRY

BEGIN TRAN;

CREATE TABLE tanques (
    id             INT IDENTITY(1,1) PRIMARY KEY,
    perforador_id  INT NOT NULL,
    capacidad      INT NULL,
    nivel_critico  INT NULL,
    nivel_alerta   INT NULL,
    habilitado     BIT NOT NULL DEFAULT 1,
    en_uso         BIT NOT NULL DEFAULT 1,
    usuario_id     INT NULL,
    fecha_activacion DATETIME NULL,
    fecha_desactivacion DATETIME NULL,
    actualizado_el DATETIME NOT NULL DEFAULT GETDATE(),
    creado_el      DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_tanques_perforadores FOREIGN KEY (perforador_id) REFERENCES perforadores(id),
    CONSTRAINT FK_tanques_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH