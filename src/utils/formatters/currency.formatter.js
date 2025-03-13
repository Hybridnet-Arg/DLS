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
  options = DEFAULT_CURRENCY_OPTIONS
) => {
  if (!price) return 0;
  return new Intl.NumberFormat(locale, options).format(price);
};
