/**
 * Formats a ZIP code to the standard 'XXXXX-XXX' format.
 *
 * @param {string} zipCode - The ZIP code to be formatted, which may contain non-numeric characters.
 * @returns {string} - The formatted ZIP code in the 'XXXXX-XXX' format.
 *                     Returns the original ZIP code if it cannot be formatted.
 */
export function formatZipCode(zipCode: string): string {
  return zipCode.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})/, '$1-$2');
}

/**
 * Validates a ZIP code, ensuring it contains exactly 8 digits and does not have all identical digits.
 *
 * @param {string} zipCode - The ZIP code to be validated, which may contain non-numeric characters.
 * @returns {boolean} - Returns `true` if the ZIP code is valid, and `false` otherwise.
 *
 */
export function isValidZipCode(zipCode: string): boolean {
  if (typeof zipCode !== 'string') {
    return false;
  }

  zipCode = zipCode.replace(/[^\d]+/g, '');

  if (zipCode.length !== 8 || /^(\d)\1{7}$/.test(zipCode)) {
    return false;
  }

  return true;
}
