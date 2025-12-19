export function isPositiveInteger(value: string, minimum: number = 0) {
  return /^\d+$/.test(value) && Number.parseInt(value) >= minimum;
}

export function isMaxSafeInteger(number: number) {
  return number <= Number.MAX_SAFE_INTEGER;
}

export function isLessThanOrEqualMax(value: string, max: number) {
  return /^\d+$/.test(value) && Number.parseInt(value) <= max;
}
