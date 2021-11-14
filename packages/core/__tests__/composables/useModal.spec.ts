import { createModal } from '../../src/composables/useModal'

describe('createModal', () => {
  it('should switch `isVisible` between `true`/`false` if calling `show`/`hide`', () => {
    const { isVisible, show, hide } = createModal()

    // Ensure it's `false` by default
    expect(isVisible.value).toBe(false)

    show()
    expect(isVisible.value).toBe(true)
    hide()
    expect(isVisible.value).toBe(false)
  })

  it('should set `titleId` to value given to `registerTitle`', () => {
    const { registerTitle, titleId } = createModal()
    registerTitle('test')
    expect(titleId.value).toBe('test')
  })

  it('should throw error if `titleId` is already set', () => {
    const { registerTitle } = createModal()
    registerTitle('test')
    expect(() => registerTitle('foo')).toThrowError(
      'You cannot have more than one title per modal.'
    )
  })

  it('should unregister title if `unregisterTitle` is called', () => {
    const { registerTitle, titleId, unregisterTitle } = createModal()
    registerTitle('test')
    expect(titleId.value).toBe('test')
    unregisterTitle()
    expect(titleId.value).toBeUndefined()
  })

  it('should set `descriptionId` to value given to `registerDescription`', () => {
    const { registerDescription, descriptionId } = createModal()
    registerDescription('test')
    expect(descriptionId.value).toBe('test')
  })

  it('should throw error if `descriptionId` is already set', () => {
    const { registerDescription } = createModal()
    registerDescription('test')
    expect(() => registerDescription('foo')).toThrowError(
      'You cannot have more than one description per modal.'
    )
  })

  it('should unregister description if `unregisterDescription` is called', () => {
    const { registerDescription, descriptionId, unregisterDescription } =
      createModal()
    registerDescription('test')
    expect(descriptionId.value).toBe('test')
    unregisterDescription()
    expect(descriptionId.value).toBeUndefined()
  })
})
