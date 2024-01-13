/**
 * Return a new JS date with a time of 00:00:00.000+00:00 on 1970-01-01.
 * @returns A new JS date with a time of 00:00:00.000+00:00 on 1970-01-01.
 */
export const getMinDate = () => new Date(0)

/**
 * Converts a date to a date with a time of 00:00:00.000.
 * The year, month, and day will be adjusted to UTC.
 * If the date is undefined or null, a minimum date of 1970-01-01T00:00:00.000Z will be returned.
 * @param date The date to convert.
 * @returns A new date with a time of 00:00:00.000.
 */
export function justADatePlease(date: Date | undefined | null): Date {
  if (!date) {
    return getMinDate()
  }
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0))
}

/**
 * Parses a date string into a JS date.
 * @param value The date string to parse.
 * @param justADate If true, the time will be set to 00:00:00.000 and the year, month, and day will be adjusted to UTC.
 * @returns A new date, undefined if the value was undefined, or null if the value was an empty string.
 */
export function parseDate(value: string | undefined | null, justADate: boolean = false): Date {
  if (!value) {
    return getMinDate()
  }

  let resolvedValue = value
  if (!/(\d\d:\d\d)|Z$/.test(value)) {
    /**
     * If the value does not contain a time, assume it is a date and append a time of 00:00:00.000Z.
     */
    resolvedValue = `${value}T00:00:00.000Z`
  }

  let result = new Date(resolvedValue) as Date | undefined | null
  if (justADate) {
    result = justADatePlease(result)
  }
  return result as Date
}
