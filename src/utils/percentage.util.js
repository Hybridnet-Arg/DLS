/**
 * Calculates the percentage of a value relative to a total.
 *
 * @param {number} value - The value to calculate the percentage for.
 * @param {number} total - The total amount relative to which the percentage is calculated.
 * @returns {number} - The percentage of the value relative to the total.
 * @throws {Error} - Throws an error if the total is zero.
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) throw new Error('Total cannot be zero.');
  return (value / total) * 100;
};
