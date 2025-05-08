import usePerforadoresStore from '@/store/perforadores.store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import { PERFORADORES_POR_PROVINCIA } from '@/constants';

export default function SelectorPozos({
  pozos = [],
  hole = {},
  handleSelectHole = () => {},
}) {
  const { perforadorSeleccionado } = usePerforadoresStore();

  return (
    <div className="flex justify-end">
      <Select
        disabled={pozos?.length === 0}
        value={hole?.id}
        onValueChange={(e) => handleSelectHole(e)}
      >
        <SelectTrigger className="w-full py-3 px-4 text-md border rounded-lg shadow-md bg-[#25303B] text-yellow-400 text-right focus:outline-none focus:ring-1 focus:ring-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="mb-0 pb-0 text-xs">
              {PERFORADORES_POR_PROVINCIA.NQN.includes(
                perforadorSeleccionado?.idPerforador
              )
                ? 'NEUQUÉN'
                : 'COMODORO RIVADAVIA'}
            </SelectLabel>
            <SelectLabel className="mt-0 pt-0 tracking-[0.1rem]">
              {perforadorSeleccionado?.nombre}
            </SelectLabel>
            {pozos?.length > 0 &&
              pozos?.map((pozo) => (
                <SelectItem
                  className="hover:font-medium group"
                  key={pozo?.id}
                  value={pozo?.id}
                  icon={
                    <div className="p-3.5 bg-[#27B433] rounded-full me-2 group-hover:bg-[#1F8A2D]"></div>
                  }
                >
                  {pozo?.nombre}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
