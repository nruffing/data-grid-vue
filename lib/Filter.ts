import { DataType } from './DataGridVue'

/**
 * @group Filter
 * @description Supported filter operators
 */
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

/**
 * @group Filter
 * @description Map of which {@link FilterOperator}s are valid for each {@link DataType}.
 * | Data Type | Valid Operators |
 * | --- | --- |
 * | none | |
 * | alphanumeric | equals, notEquals, contains, startsWith, endsWith |
 * | number | equals, notEquals, greaterThan, lessThan, greaterThanOrEqualTo, lessThanOrEqualTo |
 * | date | equals, notEquals, greaterThan, lessThan, greaterThanOrEqualTo, lessThanOrEqualTo |
 * | dateTime | equals, notEquals, greaterThan, lessThan, greaterThanOrEqualTo, lessThanOrEqualTo |
 */
export const ValidOperatorsMap = new Map<DataType, Set<FilterOperator>>([
  [DataType.none, new Set()],
  [
    DataType.alphanumeric,
    new Set([FilterOperator.equals, FilterOperator.notEquals, FilterOperator.contains, FilterOperator.startsWith, FilterOperator.endsWith]),
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

/**
 * @group Filter
 * @description Model definition for the current state of a column filter.
 */
export interface FilterCondition {
  /** The name of the field being filtered by. */
  fieldName: string
  /** The {@link FilterOperator} being applies. */
  operator: FilterOperator
  /** The {@link DataType} of the column being filtered. */
  dataType: DataType
  /** The current filter value. */
  value: string | undefined
}

/**
 * @group Filter
 * @description Model definition for the aggregated filter currently being applied to the entire data grid.
 */
export interface Filter {
  /** Collection of {@link FilterCondition}s that will be or-ed together. */
  or: FilterCondition[]
  /** Optional {@link Filter} to and with the current one. */
  and: Filter | undefined
}

/**
 * @ignore
 */
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
      return !this.evaluateCondition({ ...condition, operator: FilterOperator.equals }, dataItem)
    }

    switch (condition.dataType) {
      case DataType.alphanumeric:
        return this.evaluateAlphanumericCondition(value as string, condition.operator, condition.value as string)
      case DataType.number:
        return this.evaluateNumericCondition(value as number, condition.operator, parseFloat(condition.value ?? ''))
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
