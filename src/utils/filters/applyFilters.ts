import type { Filter } from "../..";

export function applyFilters<T>(filters: Filter<T>[], data: T): boolean {
  for (const filter of filters) {
    if (filter && !filter(data)) {
      return false;
    }
  }
  return true;
}
