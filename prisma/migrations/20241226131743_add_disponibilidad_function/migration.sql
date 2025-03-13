CREATE FUNCTION [dbo].[disponibilidad]
(
	@idPieza int,@idDiametro int,@perforador int 
)
RETURNS int
AS
BEGIN
	DECLARE @cantidad INT
	IF @idDiametro IS NULL
    BEGIN
       select @cantidad=count(*) from perforadorPieza
		where perforador=@perforador
		and enUso=0
		and baja=0
		and idPieza=@idPieza
    END
    ELSE
    BEGIN
        select @cantidad=count(*) from perforadorPieza
		where perforador=@perforador
		and enUso=0
		and baja=0
		and idPieza=@idPieza
		and idDiametro=@idDiametro
    END
   
	RETURN @cantidad

END
