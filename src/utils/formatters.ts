export function formatCurrency(amount: number, currency: string = 'BDT'): string {
  if (amount >= 10000000) {
    return `${currency} ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `${currency} ${(amount / 100000).toFixed(2)} Lac`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}
