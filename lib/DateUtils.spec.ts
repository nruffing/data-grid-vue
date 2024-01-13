import { expect, test, describe } from 'vitest'
import { justADatePlease, parseDate, getMinDate } from './DateUtils'

describe('justADatePlease', () => {
  test('undefined', () => {
    expect(justADatePlease(undefined)).toEqual(getMinDate())
  })

  test('null', () => {
    expect(justADatePlease(null)).toEqual(getMinDate())
  })

  test('date', () => {
    const date = new Date(2021, 0, 1, 1, 2, 3, 4)
    expect(justADatePlease(date)).toEqual(new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0)))
  })

  test('date with offset rollover on day', () => {
    const date = new Date(2021, 0, 1, 22, 2, 3, 4)
    const expectedDate = date.getTimezoneOffset() > 120 ? 2 : 1
    expect(justADatePlease(date)).toEqual(new Date(Date.UTC(2021, 0, expectedDate, 0, 0, 0, 0)))
  })
})

describe('parseDate', () => {
  test('undefined', () => {
    expect(parseDate(undefined)).toEqual(getMinDate())
  })

  test('null', () => {
    expect(parseDate(null)).toEqual(getMinDate())
  })

  test('empty', () => {
    expect(parseDate('')).toEqual(getMinDate())
  })

  test('date', () => {
    const dateString = '2021-01-01T06:02:03.004-05:00'
    const date = parseDate(dateString)
    expect(date).toEqual(new Date(Date.UTC(2021, 0, 1, 11, 2, 3, 4)))
  })

  test('justADate', () => {
    const dateString = '2021-01-01T06:02:03.004-05:00'
    const date = parseDate(dateString, true)
    expect(date).toEqual(new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0)))
  })
})
