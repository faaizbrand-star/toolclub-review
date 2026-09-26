/**
 * Date Parser and Sorter for Toolclubpk Screenshots & Proofs.
 * Ensures the newest/latest date is always placed at the very top,
 * and the oldest date at the very bottom.
 */

export function parseDateStringToTimestamp(dateStr?: string, fallbackIso?: string): number {
  if (dateStr && typeof dateStr === 'string') {
    const trimmed = dateStr.trim();
    if (trimmed) {
      // 1. Check for day-month-year formats e.g. "26/09/2026", "26-09-2026", "26.09.2026"
      const ddmmyyyy = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
      if (ddmmyyyy) {
        const part1 = parseInt(ddmmyyyy[1], 10);
        const part2 = parseInt(ddmmyyyy[2], 10);
        const year = parseInt(ddmmyyyy[3], 10);

        if (part1 > 12) {
          // Definitely DD/MM/YYYY
          const d = new Date(year, part2 - 1, part1);
          if (!isNaN(d.getTime())) return d.getTime();
        } else if (part2 > 12) {
          // MM/DD/YYYY
          const d = new Date(year, part1 - 1, part2);
          if (!isNaN(d.getTime())) return d.getTime();
        } else {
          // Default DD/MM/YYYY
          const d = new Date(year, part2 - 1, part1);
          if (!isNaN(d.getTime())) return d.getTime();
        }
      }

      // 2. Standard native Date parsing (handles "September 26, 2026", "2026-09-26", "Sep 26 2026", etc.)
      const parsed = Date.parse(trimmed);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }
  }

  // 3. Fallback to createdAt or verifiedAt ISO timestamp
  if (fallbackIso && typeof fallbackIso === 'string') {
    const parsedFallback = Date.parse(fallbackIso.trim());
    if (!isNaN(parsedFallback)) {
      return parsedFallback;
    }
  }

  return 0;
}

export function compareByDateDescending<
  T extends { deliveryDate?: string; createdAt?: string; verifiedAt?: string }
>(a: T, b: T): number {
  const timeA = parseDateStringToTimestamp(a.deliveryDate, a.createdAt || a.verifiedAt);
  const timeB = parseDateStringToTimestamp(b.deliveryDate, b.createdAt || b.verifiedAt);

  // If parsed delivery dates differ, sort newest / latest date first
  if (timeB !== timeA) {
    return timeB - timeA;
  }

  // Secondary tie-breaker: createdAt timestamp descending
  const createdA = a.createdAt ? Date.parse(a.createdAt) : 0;
  const createdB = b.createdAt ? Date.parse(b.createdAt) : 0;
  return (isNaN(createdB) ? 0 : createdB) - (isNaN(createdA) ? 0 : createdA);
}

/**
 * Returns today's dynamic date in standard readable format: "Month Day, Year"
 * (e.g. "September 26, 2026")
 */
export function getTodayFormattedDate(): string {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
