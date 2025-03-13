import InputField from '@/components/ui/inputs/Input';

const CANTIDAD_FASES_POZO = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

export function PozosInputs({
  cantidadPozos,
  values,
  errors,
  handleChange = () => {},
  handleBlur = () => {},
}) {
  return (
    <div className="flex gap-4 mb-4">
      <InputField
        id="pozo1"
        name="pozo1"
        type="select"
        label="Pozo 1"
        disabled={cantidadPozos < 1}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo1}
        error={errors?.pozo1}
      />
      <InputField
        id="pozo2"
        name="pozo2"
        type="select"
        label="Pozo 2"
        disabled={cantidadPozos < 2}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo2}
        error={errors?.pozo2}
      />
      <InputField
        id="pozo3"
        name="pozo3"
        type="select"
        label="Pozo 3"
        disabled={cantidadPozos < 3}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo3}
        error={errors?.pozo3}
      />
      <InputField
        id="pozo4"
        name="pozo4"
        type="select"
        label="Pozo 4"
        disabled={cantidadPozos < 4}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo4}
        error={errors?.pozo4}
      />
      <InputField
        id="pozo5"
        name="pozo5"
        type="select"
        label="Pozo 5"
        disabled={cantidadPozos < 5}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo5}
        error={errors?.pozo5}
      />
      <InputField
        id="pozo6"
        name="pozo6"
        type="select"
        label="Pozo 6"
        disabled={cantidadPozos < 6}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo6}
        error={errors?.pozo6}
      />
      <InputField
        id="pozo7"
        name="pozo7"
        type="select"
        label="Pozo 7"
        disabled={cantidadPozos < 7}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo7}
        error={errors?.pozo7}
      />
      <InputField
        id="pozo8"
        name="pozo8"
        type="select"
        label="Pozo 8"
        disabled={cantidadPozos < 8}
        inputStyles="bg-dark text-yellow-400 rounded-lg"
        options={CANTIDAD_FASES_POZO}
        labelStyles="text-sm font-light"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pozo8}
        error={errors?.pozo8}
      />
    </div>
  );
}

export function FechaInputPlanPozo({
  inputDateName = '',
  inputTimeName = '',
  values,
  errors,
  handleChange = () => {},
  handleBlur = () => {},
}) {
  return (
    <div className="flex gap-4">
      <InputField
        id={inputDateName}
        name={inputDateName}
        type="date"
        className="w-28"
        label="Fecha"
        labelStyles="font-light text-sm"
        inputStyles="text-[13px] py-2"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values?.[inputDateName]}
        error={errors?.[inputDateName]}
      />
      <InputField
        id={inputTimeName}
        name={inputTimeName}
        type="time"
        className="w-28"
        label="Hora"
        labelStyles="font-light text-sm"
        inputStyles="text-[13px] py-2"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values?.[inputTimeName]}
        error={errors?.[inputTimeName]}
      />
    </div>
  );
}
