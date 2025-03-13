import { formatCurrency } from '@/utils/formatters/currency.formatter';

function ItemDesc({ title, value }) {
  return (
    <div>
      <span className="text-xs text-gray-500">{title}</span>
      <div className="py-1 px-4 rounded-lg border border-dark text-center">
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
}

export default function TipoCable({
  pulgadas = 'N/A',
  corte = 0,
  largoCorte = 0,
}) {
  return (
    <div className="grid grid-cols-8 gap-3 items-center mb-5">
      <h2 className="font-medium col-span-1">Propiedades del cable</h2>
      <div className="flex gap-3 col-span-7">
        <ItemDesc title={'Diametro cable (in)'} value={pulgadas} />
        <ItemDesc title={'Corte (ton.mill)'} value={formatCurrency(corte)} />
        <ItemDesc
          title={'Largo corte (m)'}
          value={formatCurrency(largoCorte)}
        />
      </div>
    </div>
  );
}
