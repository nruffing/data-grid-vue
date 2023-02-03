import { DataType } from './DataGridVue'

export interface FilterOptions {
  filterable: boolean,
}

export enum FilterOperator {
  equals = 0,
  contains = 1,
  greaterThan = 2,
  lessThan = 3,
  greaterThanOrEqualTo = 4,
  lessThanOrEqualTo = 5,
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
      FilterOperator.contains,
    ]),
  ],
  [
    DataType.number,
    new Set([
      FilterOperator.equals,
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