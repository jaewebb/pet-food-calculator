import { describe, expect, it } from 'vitest'

import getTotalCost from './getTotalCost'

describe('total cost calculation', () => {
  it('calculates the correct value for wet food', () => {
    expect(getTotalCost(33.6, 34.99, 12)).toStrictEqual('0.09')
  })

  it('calculates the correct value for dry food', () => {
    expect(getTotalCost(3628.74, 57.99)).toStrictEqual('0.02')
  })

  it('avoids divide by zero', () => {
    expect(getTotalCost(33.6, 34.99, 0)).toStrictEqual('0')
  })
})
