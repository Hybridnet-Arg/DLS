export function calcularPorcentaje(
  value = 0,
  max = 0,
  signo = '%',
  allowMax = false
) {
  if (!max) return !signo ? 0 : '0%';
  const porcentajeRaw = (value / max) * 100;
  const porcentaje = porcentajeRaw >= 100 && !allowMax ? 100 : porcentajeRaw;

  if (!signo) return porcentaje;
  return `${porcentaje}%`;
}
