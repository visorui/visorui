import { useGlobalId } from '../../src/composables/useGlobalId'

describe('useGlobalId', () => {
  it('increments correctly', () => {
    for (const id of [1, 2, 3]) {
      expect(useGlobalId()).toBe(id)
    }
  })
})
