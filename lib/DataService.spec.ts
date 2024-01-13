import { expect, test, describe } from 'vitest'
import { ClientSideDataService, StubDataService } from './DataService'
import { SortType } from './Sort'
import { DataType } from './DataGridVue'

interface TestDataItem {
  id: number
  name: string
}

const TestDataItemOne = { id: 1, name: 'Test 1' }
const TestDataItemTwo = { id: 2, name: 'Test 2' }
const TestDataItemThree = { id: 3, name: 'Test 3' }
const TestDataItemFour = { id: 4, name: 'Test 4' }
const TestDataItemFive = { id: 5, name: 'Test 5' }

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

  test('getPageAsync | sorts', async () => {
    const dataService = new ClientSideDataService([...TestDataSet])

    const testCases = [
      {
        sort: { fieldName: 'id', dataType: DataType.number, type: SortType.descending },
        pageNum: 1,
        pageSize: 2,
        expected: [TestDataItemFive, TestDataItemFour],
      },
      {
        sort: { fieldName: 'id', dataType: DataType.number, type: SortType.descending },
        pageNum: 2,
        pageSize: 2,
        expected: [TestDataItemThree, TestDataItemTwo],
      },
      { sort: { fieldName: 'id', dataType: DataType.number, type: SortType.descending }, pageNum: 3, pageSize: 2, expected: [TestDataItemOne] },
    ]

    for (const testCase of testCases) {
      const pageData = await dataService.getPageAsync(testCase.pageNum, testCase.pageSize, [testCase.sort], undefined)
      expect(pageData).toEqual({
        totalItems: TestDataSet.length,
        dataItems: testCase.expected,
      })
    }
  })
})
