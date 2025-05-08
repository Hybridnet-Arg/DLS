BEGIN TRY

BEGIN TRAN;

CREATE TABLE cubitajes (
  id INT IDENTITY(1,1) PRIMARY KEY,
  actualizado_el DATETIME DEFAULT GETDATE(),
  creado_el DATETIME DEFAULT GETDATE()
);

CREATE TABLE cubitaje_items (
  id INT IDENTITY(1,1) PRIMARY KEY,
  cubitaje_id INT NOT NULL,
  ymm FLOAT,
  litros FLOAT,
  actualizado_el DATETIME DEFAULT GETDATE(),
  creado_el DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (cubitaje_id) REFERENCES cubitajes(id)
);

CREATE TABLE tanques_cubitajes (
  id INT IDENTITY(1,1) PRIMARY KEY,
  tanque_id INT NOT NULL UNIQUE,
  cubitaje_id INT NOT NULL,
  actualizado_el DATETIME DEFAULT GETDATE(),
  creado_el DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (tanque_id) REFERENCES tanques(id),
  FOREIGN KEY (cubitaje_id) REFERENCES cubitajes(id)
);

ALTER TABLE wellData
ADD ymm FLOAT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH