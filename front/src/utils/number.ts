const formatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2
});

export function formatDecimal(value: number) {
  return formatter.format(value);
}
