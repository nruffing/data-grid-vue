// https://www.mockaroo.com/

import { FilterOperator } from '../../../lib/Filter'
import { DataType, Field, type Column } from '../../../lib/DataGridVue'

export interface TestDataItem {
  id: number
  firstName: string
  lastName: string
  email?: string
  gender?: string
  ipAddress?: string
}

export const TestDataColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.greaterThanOrEqualTo],
    },
    width: '80px',
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains],
    },
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    width: '2*',
  },
  {
    field: new Field('email'),
    dataType: DataType.alphanumeric,
    sortable: true,
    width: '25%',
  },
  {
    field: new Field('gender'),
    dataType: DataType.alphanumeric,
    sortable: true,
  },
  {
    field: new Field('ipAddress'),
    dataType: DataType.alphanumeric,
    sortable: true,
  },
  {
    field: new Field('actions'),
    title: '',
  },
] as Column[]
