import { expect, test, describe } from 'vitest'
import { ClientSideDataService, StubDataService } from './DataService'
import { SortType } from './Sort'
import { DataType } from './DataGridVue'
import { FilterOperator } from './Filter'

interface TestDataItem {
  id: number
  name: string
  date: string
}

const TestDataItemOne = { id: 1, name: 'Test 1', date: '2024-01-13T12:33:00.000Z' }
const TestDataItemTwo = { id: 2, name: 'Test 2', date: '2024-01-12T12:32:00.000Z' }
const TestDataItemThree = { id: 2, name: 'Test 3', date: '2024-01-11T12:31:00.000Z' }
const TestDataItemFour = { id: 4, name: 'Test 4', date: '2024-01-10T12:30:00.000Z' }
const TestDataItemFive = { id: 5, name: 'Test 5', date: '2024-01-10T12:29:00.000Z' }

const TestDataSet = [TestDataItemThree, TestDataItemTwo, TestDataItemFour, TestDataItemFive, TestDataItemOne] as TestDataItem[]

describe('StubDataService', () => {
  test('getPageAsync', async () => {
    const pageData = await StubDataService.getPageAsync(1, 10, [], undefined)
    expect(pageData).toEqual({
      totalItems: 0,
      dataItems: [],
    })
  })
})

describe('ClientSideDataService', () => {
  test('getPageAsync | pages', async () => {
    const dataService = new ClientSideDataService([...TestDataSet])
    const pageDataOne = await dataService.getPageAsync(1, 2, [], undefined)
    const pageDataTwo = await dataService.getPageAsync(2, 1, [], undefined)
    const pageDataThree = await dataService.getPageAsync(2, 3, [], undefined)
    expect(pageDataOne).toEqual({
      totalItems: TestDataSet.length,
      dataItems: [TestDataItemThree, TestDataItemTwo],
    })
    expect(pageDataTwo).toEqual({
      totalItems: TestDataSet.length,
      dataItems: [TestDataItemTwo],
    })
    expect(pageDataThree).toEqual({
      totalItems: TestDataSet.length,
      dataItems: [TestDataItemFive, TestDataItemOne],
    })
  })

  test('getPageAsync | filters', async () => {
    const dataService = new ClientSideDataService([...TestDataSet])

    const testCases = [
      {
        filter: { or: [{ fieldName: 'id', dataType: DataType.number, operator: FilterOperator.equals, value: '3' }], and: undefined },
        pageNum: 1,
        pageSize: 2,
        expectedTotalItems: 0,
        expected: [],
      },
      {
        filter: { or: [{ fieldName: 'id', dataType: DataType.number, operator: FilterOperator.equals, value: '4' }], and: undefined },
        pageNum: 1,
        pageSize: 2,
        expectedTotalItems: 1,
        expected: [TestDataItemFour],
      },
      {
        filter: { or: [{ fieldName: 'date', dataType: DataType.date, operator: FilterOperator.lessThan, value: '2024-01-11' }], and: undefined },
        pageNum: 1,
        pageSize: 2,
        expectedTotalItems: 2,
        expected: [TestDataItemFour, TestDataItemFive],
      },
      {
        filter: { or: [{ fieldName: 'date', dataType: DataType.date, operator: FilterOperator.equals, value: '2024-01-11' }], and: undefined },
        pageNum: 1,
        pageSize: 2,
        expectedTotalItems: 1,
        expected: [TestDataItemThree],
      },
      {
        filter: { or: [{ fieldName: 'date', dataType: DataType.dateTime, operator: FilterOperator.equals, value: '2024-01-11' }], and: undefined },
        pageNum: 1,
        pageSize: 2,
        expectedTotalItems: 0,
        expected: [],
      },
      {
        filter: {
          or: [{ fieldName: 'date', dataType: DataType.dateTime, operator: FilterOperator.equals, value: '2024-01-10T12:30:00.000Z' }],
          and: undefined,
        },
        pageNum: 1,
        pageSize: 2,
        expectedTotalItems: 1,
        expected: [TestDataItemFour],
      },
      {
        filter: {
          or: [{ fieldName: 'date', dataType: DataType.dateTime, operator: FilterOperator.equals, value: '2024-01-10T14:30:00.000+02:00' }],
          and: undefined,
        },
        pageNum: 1,
        pageSize: 2,
        expectedTotalItems: 1,
        expected: [TestDataItemFour],
      },
    ]

    for (const testCase of testCases) {
      const pageData = await dataService.getPageAsync(testCase.pageNum, testCase.pageSize, [], testCase.filter)
      expect(pageData, JSON.stringify(testCase)).toEqual({
        totalItems: testCase.expectedTotalItems,
        dataItems: testCase.expected,
      })
    }
  })

  test('getPageAsync | sorts', async () => {
    const dataService = new ClientSideDataService([...TestDataSet])

    const testCases = [
      {
        sort: [{ fieldName: 'id', dataType: DataType.number, type: SortType.descending }],
        pageNum: 1,
        pageSize: 2,
        expected: [TestDataItemFive, TestDataItemFour],
      },
      {
        sort: [{ fieldName: 'id', dataType: DataType.number, type: SortType.descending }],
        pageNum: 2,
        pageSize: 2,
        expected: [TestDataItemThree, TestDataItemTwo],
      },
      { sort: [{ fieldName: 'id', dataType: DataType.number, type: SortType.descending }], pageNum: 3, pageSize: 2, expected: [TestDataItemOne] },
      { sort: [], pageNum: 3, pageSize: 1, expected: [TestDataItemFour] },
      {
        sort: [
          { fieldName: 'id', dataType: DataType.number, type: SortType.ascending },
          { fieldName: 'name', dataType: DataType.alphanumeric, type: SortType.descending },
        ],
        pageNum: 1,
        pageSize: 3,
        expected: [TestDataItemOne, TestDataItemThree, TestDataItemTwo],
      },
      {
        sort: [{ fieldName: 'date', dataType: DataType.date, type: SortType.ascending }],
        pageNum: 2,
        pageSize: 2,
        expected: [TestDataItemThree, TestDataItemTwo],
      },
      {
        sort: [{ fieldName: 'date', dataType: DataType.date, type: SortType.ascending }],
        pageNum: 1,
        pageSize: 2,
        expected: [TestDataItemFour, TestDataItemFive],
      },
      {
        sort: [{ fieldName: 'date', dataType: DataType.dateTime, type: SortType.ascending }],
        pageNum: 1,
        pageSize: 2,
        expected: [TestDataItemFive, TestDataItemFour],
      },
    ]

    for (const testCase of testCases) {
      const pageData = await dataService.getPageAsync(testCase.pageNum, testCase.pageSize, testCase.sort, undefined)
      expect(pageData, JSON.stringify(testCase)).toEqual({
        totalItems: TestDataSet.length,
        dataItems: testCase.expected,
      })
    }
  })

  test('getPageAsync | filters and sorts', async () => {
    const dataService = new ClientSideDataService([...TestDataSet])

    const filter = { or: [{ fieldName: 'id', dataType: DataType.number, operator: FilterOperator.greaterThan, value: '2' }], and: undefined }
    const sort = [
      { fieldName: 'date', dataType: DataType.dateTime, type: SortType.ascending },
      { fieldName: 'name', dataType: DataType.alphanumeric, type: SortType.descending },
    ]

    const pageData = await dataService.getPageAsync(1, 4, sort, filter)

    console.log(JSON.stringify(pageData, null, 2))

    expect(pageData).toEqual({
      totalItems: 2,
      dataItems: [TestDataItemFive, TestDataItemFour],
    })
  })
})
