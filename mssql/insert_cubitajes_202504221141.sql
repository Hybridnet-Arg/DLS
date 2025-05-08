BEGIN TRY

BEGIN TRAN;

SET IDENTITY_INSERT cubitajes ON;

INSERT INTO cubitajes (id, actualizado_el, creado_el)
VALUES (1, GETDATE(), GETDATE());

SET IDENTITY_INSERT cubitajes OFF;

INSERT INTO tanques_cubitajes (tanque_id, cubitaje_id, actualizado_el, creado_el)
VALUES 
  (1, 1, GETDATE(), GETDATE()),
  (2, 1, GETDATE(), GETDATE()),
  (3, 1, GETDATE(), GETDATE()),
  (4, 1, GETDATE(), GETDATE()),
  (5, 1, GETDATE(), GETDATE()),
  (6, 1, GETDATE(), GETDATE()),
  (7, 1, GETDATE(), GETDATE()),
  (8, 1, GETDATE(), GETDATE()),
  (9, 1, GETDATE(), GETDATE()),
  (10, 1, GETDATE(), GETDATE()),
  (11, 1, GETDATE(), GETDATE());


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH