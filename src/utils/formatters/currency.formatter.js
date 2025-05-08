const DEFAULT_CURRENCY_OPTIONS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

/**
 * Formats a price in the specified currency according to the provided options.
 *
 * @param {number} price - The price to format.
 * @param {string} [locale='es-AR'] - The locale code for numeric formatting.
 * @param {Intl.NumberFormatOptions} [options=DEFAULT_CURRENCY_OPTIONS] - Additional options for currency formatting.
 * @returns {string} The formatted price as a string.
 */
export const formatCurrency = (
  price,
  locale = 'de-DE',
  options = DEFAULT_CURRENCY_OPTIONS,
  noDecimals = false
) => {
  if (!price) return 0;

  const formatOptions = {
    ...options,
    minimumFractionDigits: noDecimals
      ? 0
      : (options.minimumFractionDigits ?? 2),
    maximumFractionDigits: noDecimals
      ? 0
      : (options.maximumFractionDigits ?? 2),
  };

  return new Intl.NumberFormat(locale, formatOptions).format(price);
};

export const formatNumber = ({
  value,
  locale = 'es-AR',
  useCurrency = false,
  currency = 'ARS',
  showDecimals = false,
}) => {
  if (value == null) return '0';

  const options = {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  };

  if (useCurrency) {
    options.style = 'currency';
    options.currency = currency;
  }

  return new Intl.NumberFormat(locale, options).format(value);
};
