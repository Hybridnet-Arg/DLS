import clsx from 'clsx';
import { useField } from 'formik';
import InputField from '@/components/ui/inputs/Input';
import {
  CASINGS_OPTIONS,
  FASE_AISLACION,
  FASE_GUIA,
  FASE_INTERMEDIA,
  FASE_INTERMEDIA_SECUNDARIA,
} from '@/constants';

export default function EtapaPozoInput({
  namePrefix,
  nextNamePrefix,
  numeroEtapa,
  etapas_pozo = [],
}) {
  const [profundidadDesdeField, profundidadDesdeMeta] = useField(
    `${namePrefix}.profundidad_desde`
  );
  const [profundidadHastaField, profundidadHastaMeta] = useField(
    `${namePrefix}.profundidad_hasta`
  );
  const [casingField, casingMeta] = useField(`${namePrefix}.casing`);
  const [duracionField, duracionMeta] = useField(`${namePrefix}.duracion`);

  const [nextProfundidadDesdeField] = useField(
    nextNamePrefix ? `${nextNamePrefix}.profundidad_desde` : ''
  );

  const handleDuracionChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 60)) {
      duracionField.onChange(e);
    }
  };
  return (
    <div
      className={clsx(
        'px-3 py-4 flex flex-col rounded-lg mb-6 shadow-lg w-60',
        {
          'bg-[white]': !numeroEtapa,
          'bg-[#85736A]': numeroEtapa === FASE_GUIA,
          'bg-[#6A5144]': numeroEtapa === FASE_INTERMEDIA,
          'bg-[#28170E]':
            etapas_pozo.length === FASE_INTERMEDIA_SECUNDARIA &&
            numeroEtapa === FASE_INTERMEDIA_SECUNDARIA,
          'bg-[#6A5145]':
            etapas_pozo.length > FASE_INTERMEDIA_SECUNDARIA &&
            numeroEtapa === FASE_INTERMEDIA_SECUNDARIA,
          'bg-[#28171E]': numeroEtapa === FASE_AISLACION,
        }
      )}
    >
      <div className="flex flex-row gap-6 mb-2">
        <div className="flex gap-2">
          <InputField
            type="number"
            id={`${namePrefix}.profundidad_desde`}
            label="Prof. desde"
            labelStyles="text-xs font-medium text-white"
            inputStyles="h-7 p-2 text-xs"
            // error={profundidadDesdeMeta.touched && profundidadDesdeMeta.error}
            // errorStyles="text-xs text-red-300"
            {...profundidadDesdeField}
          />
          <InputField
            {...profundidadHastaField}
            type="number"
            id={`${namePrefix}.profundidad_hasta`}
            label="Prof. hasta"
            labelStyles="text-xs font-medium text-white"
            inputStyles="h-7 p-2 text-xs"
            // error={profundidadHastaMeta.touched && profundidadHastaMeta.error}
            // errorStyles="text-xs text-red-300"
            onChange={(event) => {
              profundidadHastaField.onChange(event);
              if (nextNamePrefix) {
                nextProfundidadDesdeField.onChange({
                  target: {
                    name: `${nextNamePrefix}.profundidad_desde`,
                    value: event.target.value,
                  },
                });
              }
            }}
          />
        </div>
        <InputField
          {...duracionField}
          type="number"
          id={`${namePrefix}.duracion`}
          label="Duración"
          labelStyles="text-xs font-medium text-white"
          inputStyles="h-7 p-2 text-xs"
          min={0}
          max={60}
          // error={duracionMeta.touched && duracionMeta.error}
          // errorStyles="text-xs text-red-300"
          onChange={handleDuracionChange}
        />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        {profundidadDesdeMeta.touched && profundidadDesdeMeta.error && (
          <span className="text-xs text-red-300">
            {profundidadDesdeMeta.error}
          </span>
        )}
        {profundidadHastaMeta.touched && profundidadHastaMeta.error && (
          <span className="text-xs text-red-300">
            {profundidadHastaMeta.error}
          </span>
        )}
        {duracionMeta.touched && duracionMeta.error && (
          <span className="text-xs text-red-300">{duracionMeta.error}</span>
        )}
      </div>

      <InputField
        id={`${namePrefix}.casing`}
        type="select"
        label="Diametros Casing"
        labelStyles="text-xs font-medium text-white"
        inputStyles="p-2 text-xs"
        options={CASINGS_OPTIONS}
        error={casingMeta.touched && casingMeta.error}
        errorStyles="text-xs text-red-300"
        {...casingField}
      />
    </div>
  );
}
