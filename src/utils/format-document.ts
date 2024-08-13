/**
 * Formats a Brazilian CPF document number.
 *
 * The function takes a string representing a CPF (Cadastro de Pessoas Físicas)
 * document number and formats it according to the standard CPF pattern:
 * "XXX.XXX.XXX-XX".
 *
 * The function removes all non-numeric characters and then inserts periods and
 * a hyphen at the appropriate positions to format the CPF correctly.
 *
 * @param document - A string representing the CPF document number to be formatted.
 * @returns A formatted CPF string in the pattern "XXX.XXX.XXX-XX".
 */
export function formatDocument(document: string): string {
  return document
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');
}

/**
 * Checks if a CPF (Cadastro de Pessoas Físicas) is valid.
 *
 * A CPF is considered valid if:
 * - It contains 11 numeric digits.
 * - It does not consist of all identical digits (e.g., "111.111.111-11").
 * - The verification digits (the last two digits) are valid according to the CPF validation algorithm.
 *
 * @param document - A string representing the CPF to be validated. It can include non-numeric characters like dots and hyphens.
 * @returns `true` if the CPF is valid; otherwise, `false`.
 */
export function isValidDocument(document: string): boolean {
  if (typeof document !== 'string') {
    return false;
  }

  document = document.replace(/[^\d]+/g, '');

  if (document.length !== 11 || !!document.match(/(\d)\1{10}/)) {
    return false;
  }

  const documentDigits = document.split('').map((el) => +el);

  const calculateRest = (count: number): number => {
    return (
      ((documentDigits
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10
    );
  };

  return (
    calculateRest(10) === documentDigits[9] &&
    calculateRest(11) === documentDigits[10]
  );
}
