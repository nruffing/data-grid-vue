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
    dataType: DataType.number
  },
  {
    field: new Field('firstName'),
  },
  {
    field: new Field('lastName'),
  },
  {
    field: new Field('email'),
  },
  {
    field: new Field('gender'),
  },
  {
    field: new Field('ipAddress'),
  },
] as Column[]
