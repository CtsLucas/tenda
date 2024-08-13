export function formatZipCode(zipCode: string): string {
  return zipCode.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})/, '$1-$2');
}
