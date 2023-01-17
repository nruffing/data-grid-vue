// https://www.mockaroo.com/

import { DataType, Field, type Column } from '../models/DataGridVue'

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
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('email'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('gender'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('ipAddress'),
    dataType: DataType.alphanumeric,
  },
] as Column[]
