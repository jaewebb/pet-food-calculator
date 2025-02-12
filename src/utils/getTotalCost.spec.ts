import { describe, expect, it } from 'vitest'

import getTotalCost from './getTotalCost'

describe('total cost calculation', () => {
  it('calculates the correct value', () => {
    expect(getTotalCost(33.6, 34.99, 12)).toStrictEqual('0.09')
  })
})
