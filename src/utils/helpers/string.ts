export function containsSubstring(arr: string[], substring: string): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (substring.includes(arr[i])) {
      return true;
    }
  }
  return false;
}
