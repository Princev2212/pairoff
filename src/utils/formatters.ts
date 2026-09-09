/**
 * Format numbers with comma separators
 */
export function formatNumber(val: number): string {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return Math.round(val).toLocaleString('en-US');
}

/**
 * Format calories with suffix
 */
export function formatCalories(val: number): string {
  return `${formatNumber(val)} kcal`;
}

/**
 * Format macro grams with 1 decimal or round
 */
export function formatGrams(val: number, precision: number = 0): string {
  if (val === undefined || val === null || isNaN(val)) return '0 g';
  return `${precision === 0 ? Math.round(val) : Number(val.toFixed(precision))} g`;
}

/**
 * Format weight in kg
 */
export function formatKg(val: number): string {
  if (val === undefined || val === null || isNaN(val)) return '0.0 kg';
  return `${Number(val.toFixed(1))} kg`;
}

/**
 * Format signed weight change (e.g. +2.4 kg or -0.5 kg)
 */
export function formatSignedKg(val: number): string {
  if (val === undefined || val === null || isNaN(val)) return '0.0 kg';
  const prefix = val > 0 ? '+' : '';
  return `${prefix}${Number(val.toFixed(1))} kg`;
}

/**
 * Format date nicely (e.g. "Today, Oct 24" or "Wed, Oct 24")
 */
export function formatDatePretty(dateStr: string): string {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0];

  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';

  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Returns dynamic contextual greeting based on local hour
 */
export function getGreetingTime(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
