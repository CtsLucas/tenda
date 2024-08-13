/**
 * Creates a promise that resolves after a specified delay in milliseconds.
 *
 * @function delay
 * @param {number} [ms=1000] - The delay time in milliseconds before the promise resolves.
 *                             The default value is 1000ms (1 second).
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
