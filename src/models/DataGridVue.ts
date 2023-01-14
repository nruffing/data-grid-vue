export enum DataType {
  alphanumeric = 0,
  number = 1,
}

export interface Column {
  title?: string,
  dataType: DataType,
  field: Field,
  isKey?: boolean, 
}

export type FieldValueGetter = ((dataItem: any) => string) | undefined

export class Field {
  fieldName: string
  valueGetter?: FieldValueGetter

  constructor(fieldName: string, valueGetter: FieldValueGetter = undefined) {
    this.fieldName = fieldName
    this.valueGetter = valueGetter
  }

  resolveValue(dataItem: any): any {
    if (this.valueGetter) {
      return this.valueGetter(dataItem)
    }

    return dataItem[this.fieldName]    
  }
}

