// https://www.mockaroo.com/

import { FilterOperator } from '../../../lib/Filter'
import { DataType, Field, type Column } from '../../../lib/DataGridVue'

export interface TestDataItem2 {
  id: number
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: number
  dateOfBirth: Date
  created: Date
}

export const TestDataColumns2 = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [
        FilterOperator.greaterThanOrEqualTo,
        FilterOperator.lessThanOrEqualTo,
        FilterOperator.greaterThan,
        FilterOperator.lessThan,
        FilterOperator.equals,
        FilterOperator.notEquals,
      ],
    },
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains, FilterOperator.startsWith, FilterOperator.endsWith, FilterOperator.notEquals, FilterOperator.equals],
    },
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
  },
  {
    field: new Field('email'),
    dataType: DataType.alphanumeric,
    sortable: true,
  },
  {
    field: new Field('phoneNumber', t => formatPhoneNumber(t.phoneNumber)),
    dataType: DataType.number,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.equals],
    },
  },
  {
    field: new Field('dateOfBirth', t => formatDate(t.dateOfBirth)),
    dataType: DataType.date,
    sortable: true,
  },
  {
    field: new Field('created', t => formatDateTime(t.created)),
    dataType: DataType.dateTime,
    sortable: true,
  },
] as Column[]

export function formatPhoneNumber(phone: number | string | undefined): string {
  if (!phone) {
    return ''
  }
  const phoneString = phone.toString()
  if (phoneString.length !== 10) {
    return phoneString
  }
  return `(${phoneString.substring(0, 3)}) ${phoneString.substring(3, 6)}-${phoneString.substring(6)}`
}

function formatDate(date: Date | string | undefined): string {
  if (!date) {
    return ''
  }
  const d = new Date(date)
  const locale = 'en-US'
  return `${d.toLocaleDateString(locale, { month: '2-digit' })}/${d.toLocaleDateString(locale, { day: '2-digit' })}/${d.getFullYear()}`
}

function formatDateTime(dateTime: Date | string | undefined): string {
  if (!dateTime) {
    return ''
  }
  return `${formatDate(dateTime)} ${new Date(dateTime).toLocaleTimeString()}`
}
