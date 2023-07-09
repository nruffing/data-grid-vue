import type { Column } from "./DataGridVue";
import { getElementWidth } from "./Html";

export function calculateColumnWidths(columns: Column[], table: HTMLElement): Map<string, string> {
  var map = new Map<string, string>()
  var width = getElementWidth(table)
  
  var equalWidth = width / columns.length
  for (const column of columns) {
    map.set(column.field.fieldName, `${equalWidth}px`)
  } 

  return map
}