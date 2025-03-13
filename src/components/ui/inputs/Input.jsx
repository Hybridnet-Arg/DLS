import clsx from 'clsx';
import { Field } from 'formik';

const SelectField = ({
  id,
  name,
  label,
  options = [],
  error = null,
  className = 'flex-1',
  labelStyles = '',
  inputStyles = '',
  errorStyles = '',
  ...props
}) => (
  <div className={className}>
    {label && (
      <label
        htmlFor={id}
        className={clsx('block mb-2', labelStyles || 'font-medium text-sm')}
      >
        {label}
      </label>
    )}
    <Field
      as="select"
      id={id}
      name={name}
      className={clsx(
        'p-2 border border-gray-300 rounded w-full',
        inputStyles,
        {
          'cursor-not-allowed': props.disabled,
          'cursor-pointer': !props.disabled,
        }
      )}
      {...props}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </Field>
    {error && (
      <p className={`ml-1 text-sm text-red-500 ${errorStyles}`}>{error}</p>
    )}
  </div>
);

const InputField = ({
  id,
  name,
  label,
  labelStyles = '',
  type = 'text',
  className = 'flex-1',
  inputStyles = '',
  errorStyles = '',
  fieldClassName = 'p-1 border border-gray-300 rounded w-full',
  error,
  ...props
}) => {
  if (type === 'select') {
    return (
      <SelectField
        className={className}
        inputStyles={inputStyles}
        id={id}
        name={name}
        label={label}
        labelStyles={labelStyles}
        error={error}
        errorStyles={errorStyles}
        {...props}
      />
    );
  }

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className={clsx('block mb-2', labelStyles || 'font-medium text-sm')}
        >
          {label}
        </label>
      )}
      <Field
        type={type}
        id={id}
        name={name}
        className={clsx(fieldClassName, inputStyles, {
          'cursor-pointer':
            (type === 'date' && !props?.disabled) ||
            (type === 'time' && !props?.disabled),
          'cursor-not-allowed': props.disabled,
        })}
        {...props}
      />
      {error && (
        <p className={`ml-1 text-sm text-red-500 ${errorStyles}`}>{error}</p>
      )}
    </div>
  );
};

export default InputField;
