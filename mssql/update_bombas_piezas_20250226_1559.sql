BEGIN TRY

BEGIN TRAN;

  UPDATE pieza
  SET idTipoPieza=1
  WHERE idPieza IN (1, 22, 29);

  UPDATE pieza
  SET idTipoPieza=2
  WHERE idPieza IN (5, 30);

  UPDATE pieza
  SET idTipoPieza=3
  WHERE idPieza IN (13,19,31);

  UPDATE pieza
  SET idTipoPieza=4
  WHERE idPieza IN (15,17,33);

  UPDATE pieza
  SET idTipoPieza=5
  WHERE idPieza IN (16,20,32);

  UPDATE pieza
  SET idTipoPieza=6
  WHERE idPieza IN (18);

  UPDATE pieza
  SET idTipoPieza=7
  WHERE idPieza IN (21,27);

  UPDATE pieza
  SET idTipoPieza=8
  WHERE idPieza IN (23);

  UPDATE pieza
  SET idTipoPieza=9
  WHERE idPieza IN (24);

  UPDATE pieza
  SET idTipoPieza=10
  WHERE idPieza IN (25);

  UPDATE pieza
  SET idTipoPieza=11
  WHERE idPieza IN (26);

  UPDATE pieza
  SET idTipoPieza=12
  WHERE idPieza IN (28);

  UPDATE pieza
  SET idTipoPieza=13
  WHERE idPieza IN (34);

  COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH