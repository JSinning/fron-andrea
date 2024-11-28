export default function convertToDecimal(dato: number) {
  return new Intl.NumberFormat('en-GB', {
    currency: 'EUR',
    style: 'currency',
  })
    .format(dato)
    .replace(/[€]/g, '');
}
