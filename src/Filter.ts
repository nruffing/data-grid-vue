import { DataType } from './DataGridVue'

export interface FilterOptions {
  filterable: boolean,
}

export enum FilterOperator {
  equals = 0,
  notEquals = 1,
  contains = 2,
  startsWith = 3,
  endsWith = 4,
  greaterThan = 5,
  lessThan = 6,
  greaterThanOrEqualTo = 7,
  lessThanOrEqualTo = 8,
}

export const ValidOperatorsMap = new Map<DataType, Set<FilterOperator>>([
  [
    DataType.none,
    new Set(),
  ],
  [
    DataType.alphanumeric,
    new Set([
      FilterOperator.equals,
      FilterOperator.notEquals,
      FilterOperator.contains,
      FilterOperator.startsWith,
      FilterOperator.endsWith,
    ]),
  ],
  [
    DataType.number,
    new Set([
      FilterOperator.equals,
      FilterOperator.notEquals,
      FilterOperator.greaterThan,
      FilterOperator.lessThan,
      FilterOperator.greaterThanOrEqualTo,
      FilterOperator.lessThanOrEqualTo,
    ]),
  ],
  [
    DataType.date,
    new Set([
      FilterOperator.equals,
      FilterOperator.notEquals,
      FilterOperator.greaterThan,
      FilterOperator.lessThan,
      FilterOperator.greaterThanOrEqualTo,
      FilterOperator.lessThanOrEqualTo,
    ]),
  ],
  [
    DataType.dateTime,
    new Set([
      FilterOperator.equals,
      FilterOperator.notEquals,
      FilterOperator.greaterThan,
      FilterOperator.lessThan,
      FilterOperator.greaterThanOrEqualTo,
      FilterOperator.lessThanOrEqualTo,
    ]),
  ],
])

export interface FilterCondition {
  fieldName: string,
  operator: FilterOperator,
  dataType: DataType,
  value: any,
}

export interface Filter {
  or: FilterCondition[],
  and: Filter | undefined,
}

export const ClientSideFilter = {
  filter(filter: Filter, dataItems: any[]): any[] {
    if (!dataItems?.length) {
      return []
    }

    if (!filter?.or?.length) {
      return dataItems
    }

    return dataItems.filter(d => {
      return this.evaluateFilter(filter, d)   
    })
  },
  evaluateFilter(filter: Filter, dataItem: any): boolean {
    if (!this.evaluateConditions(filter.or, dataItem)) {
      return false
    }
    return filter.and ? this.evaluateFilter(filter.and, dataItem) : true
  },
  evaluateConditions(conditions: FilterCondition[], dataItem: any): boolean {
    for (const condition of conditions) {
      if (this.evaluateCondition(condition, dataItem)) {
        return true
      }
    }
    return false
  },
  evaluateCondition(condition: FilterCondition, dataItem: any): boolean {
    const value = dataItem[condition.fieldName]

    if (condition.operator === FilterOperator.notEquals) {
      return !this.evaluateCondition({...condition, operator: FilterOperator.equals}, dataItem)
    }

    switch (condition.dataType) {
      case DataType.alphanumeric:
        return this.evaluateAlphanumericCondition(value as string, condition.operator, condition.value as string)
      case DataType.number:
        return this.evaluateNumericCondition(value as number, condition.operator, condition.value as number)
    }

    console.warn(`Unknown data type detected while filtering: ${DataType[condition.dataType]}`)
    return false
  },
  evaluateAlphanumericCondition(value: string | undefined, operator: FilterOperator, conditionValue: string): boolean {
    if (!value) {
      return false
    }
    
    switch (operator) {
      case FilterOperator.equals:
        return value.localeCompare(conditionValue, 'en', { sensitivity: 'base' }) === 0
      case FilterOperator.contains:
        return value.toLowerCase().includes(conditionValue.toLowerCase())
      case FilterOperator.startsWith:
        return value.toLowerCase().startsWith(conditionValue.toLowerCase())
      case FilterOperator.endsWith:
        return value.toLowerCase().endsWith(conditionValue.toLowerCase())
    }

    console.warn(`Filter operator ${FilterOperator[operator]} is not supported for columns with the alphanumeric data type`)
    return false
  },
  evaluateNumericCondition(value: number | undefined, operator: FilterOperator, conditionValue: number): boolean {
    if (!value) {
      return false
    }
    
    switch (operator) {
      case FilterOperator.equals:
        return value === conditionValue
      case FilterOperator.greaterThan:
        return value > conditionValue
      case FilterOperator.greaterThanOrEqualTo:
        return value >= conditionValue
      case FilterOperator.lessThan:
        return value < conditionValue
      case FilterOperator.lessThanOrEqualTo:
        return value <= conditionValue
    }

    console.warn(`Filter operator ${FilterOperator[operator]} is not supported for columns with the numeric data type`)
    return false
  },
}