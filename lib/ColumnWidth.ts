import type { Column } from './DataGridVue'
import { asPxSize, getElementWidth, isPercentageSize, isPxSize } from './Html'

export function isRelativeSize(width?: string): boolean {
  return /^\d+\*$/.test(width?.trim() ?? '')
}

export function calculateColumnWidths(columns: Column[], table: HTMLElement): string[] {
  var map = new Map<string, string>()
  var width = getElementWidth(table)
  let trackedWidth = 0

  // first set columns set with absolute px and % to know how much width is remaining
  var remainingColumns = [] as Column[]
  for (const column of columns) {
    if (column.hidden) {
      continue
    }

    if (!column.width) {
      remainingColumns.push(column)
      continue
    }

    if (isPxSize(column.width)) {
      trackedWidth += Number.parseFloat(column.width)
      map.set(column.field.fieldName, column.width)
      continue
    }

    if (isPercentageSize(column.width)) {
      const calculated = (Number.parseFloat(column.width) / 100) * width
      trackedWidth += calculated
      map.set(column.field.fieldName, asPxSize(calculated))
      continue
    }

    remainingColumns.push(column)
  }

  // determine how many "weighted columns" we have based on relative widths set (e.g. 2*)
  let weightedColumnNum = 0
  for (const column of remainingColumns) {
    if (isRelativeSize(column.width)) {
      weightedColumnNum += Number.parseInt(column.width ?? '')
    } else {
      weightedColumnNum++
    }
  }

  // set remaining columns to fill remaining space with weighted equal width
  var equalWidth = (width - trackedWidth) / weightedColumnNum
  for (const column of remainingColumns) {
    const weight = isRelativeSize(column.width) ? Number.parseInt(column.width ?? '') : 1
    map.set(column.field.fieldName, asPxSize(equalWidth * weight))
  }

  const widths = [] as string[]
  for (const column of columns) {
    if (!column.hidden) {
      widths.push(map.get(column.field.fieldName) ?? '')
    }
  }
  return widths
}
