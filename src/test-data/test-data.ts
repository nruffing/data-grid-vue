// https://www.mockaroo.com/

import { DataType, Field, type Column } from '../DataGridVue'

export interface TestDataItem {
  id: number,
  firstName: string,
  lastName: string,
  email?: string,
  gender?: string,
  ipAddress?: string
}

export const TestDataColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    sortable: true,
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    sortable: true,
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: true,
  },
  {
    field: new Field('email'),
    dataType: DataType.alphanumeric,
    sortable: true,
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
    sortable: false,
  },
] as Column[]
