import { defineComponent, ref, nextTick } from 'vue'
import { render, waitFor, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Modal from '../../../src/components/Modal/Modal.vue'

const renderModal = (component?: ReturnType<typeof defineComponent>) =>
  render(
    defineComponent({
      components: { Modal },
      setup() {
        return { isVisible: ref(true) }
      },
      template: `
        <Modal v-model="isVisible">
          <button>content</button>
        </Modal>
      `,
      ...component
    })
  )

describe('Modal', () => {
  it('should show & hide based on `v-model`', async () => {
    const component = defineComponent({
      setup() {
        const isVisible = ref(false)
        const toggle = () => (isVisible.value = !isVisible.value)

        return {
          isVisible,
          toggle
        }
      },
      template: `
        <button @click="toggle">show</button>
        <Modal v-model="isVisible">
          <button @click="toggle">hide</button>
        </Modal>
      `
    })

    const { queryByText, getByText } = renderModal(component)

    // Not visible by default
    expect(queryByText('hide')).not.toBeInTheDocument()

    // Show modal on click
    const showButton = getByText('show')
    showButton.click()

    await nextTick()

    // Hide button should be visible now, click to hide
    const hideButton = getByText('hide')
    hideButton.click()

    await nextTick()

    // Should be hidden again
    expect(queryByText('hide')).not.toBeInTheDocument()
  })

  it('should render with custom tag', () => {
    const component = defineComponent({
      template: `
        <Modal v-model="isVisible" as="section">
          <button>content</button>
        </Modal>
      `
    })

    const { getByText } = renderModal(component)
    const content = getByText('content')

    expect(content.parentElement?.tagName.toLowerCase()).toBe('section')
  })

  it('should render to body by default', () => {
    const { getByText } = renderModal()
    const content = getByText('content')

    expect(content.parentElement?.parentElement?.tagName.toLowerCase()).toBe(
      'body'
    )
  })

  it('should render to custom teleport', () => {
    const component = defineComponent({
      setup() {
        return { isVisible: ref(true), section: ref() }
      },
      template: `
        <section ref="section"></section>
        <Modal v-model="isVisible" to="section">
          <button>content</button>
        </Modal>
      `
    })

    const { getByText } = renderModal(component)
    const content = getByText('content')

    expect(content.parentElement?.parentElement?.tagName.toLowerCase()).toBe(
      'section'
    )
  })

  it('should warn if no focusable element is found', async () => {
    console.warn = jest.fn()

    const component = defineComponent({
      template: `
        <Modal v-model="isVisible">
          <p>content</p>
        </Modal>`
    })

    const { getByText } = renderModal(component)
    getByText('content')

    await nextTick()

    expect(console.warn).toHaveBeenCalledWith(
      'No focusable element found. You should add one for accessibility reasons.'
    )
  })

  it('should automatically focus button inside modal', async () => {
    const { getByText } = renderModal()
    await waitFor(() => {
      expect(getByText('content')).toHaveFocus()
    })
  })

  it('should focus custom element from `initialFocus` prop', async () => {
    const component = defineComponent({
      setup() {
        return {
          isVisible: ref(true),
          initialFocus: ref()
        }
      },
      template: `
        <Modal v-model="isVisible" :initial-focus="initialFocus">
          <button>first</button>
          <input ref="initialFocus" placeholder="second" />
        </Modal>
      `
    })

    const { getByPlaceholderText } = renderModal(component)
    const input = getByPlaceholderText('second')

    await waitFor(() => {
      expect(input).toHaveFocus()
    })
  })

  it('should trap focus within modal', async () => {
    const component = defineComponent({
      template: `
        <button>outside</button>
        <Modal v-model="isVisible">
          <button>first</button>
          <button>second</button>
        </Modal>
      `
    })

    const { getByText } = renderModal(component)

    // Ensure it automatically focuses first button
    const button1 = getByText('first')
    await waitFor(() => {
      expect(button1).toHaveFocus()
    })

    userEvent.tab()

    // Ensure second button is focused
    const button2 = getByText('second')
    expect(button2).toHaveFocus()

    userEvent.tab()

    // Ensure first button is focused again
    expect(button1).toHaveFocus()
  })

  it('should release focus trap if modal was hidden', async () => {
    const component = defineComponent({
      template: `
        <button>outside</button>
        <Modal v-model="isVisible">
          <button @click="isVisible = false">hide</button>
        </Modal>
      `
    })

    const { getByText } = renderModal(component)

    // Ensure modal is visible
    const hideButton = getByText('hide')
    hideButton.click()

    // Ensure button outside of modal can have focus
    userEvent.tab()
    const outsideButton = getByText('outside')
    expect(outsideButton).toHaveFocus()
  })

  it('should emit events', async () => {
    const component = defineComponent({
      emits: ['show', 'hide'],
      setup() {
        const isVisible = ref(false)
        const toggle = () => (isVisible.value = !isVisible.value)

        return {
          isVisible,
          toggle
        }
      },
      template: `
        <button @click="toggle">show</button>
        <Modal v-model="isVisible" @show="$emit('show')" @hide="$emit('hide')">
          <button @click="toggle">hide</button>
        </Modal>
      `
    })

    const { getByText, emitted } = renderModal(component)
    const showButton = getByText('show')

    // Ensure `show` event was emitted
    showButton.click()
    await nextTick()
    expect(emitted()).toHaveProperty('show')

    const hideButton = getByText('hide')

    // Ensure `hide` event was emitted
    hideButton.click()
    await nextTick()
    expect(emitted()).toHaveProperty('hide')
  })

  it('should hide if user presses Escape key', async () => {
    const component = defineComponent({
      template: `
        <Modal v-model="isVisible">
          <button>content</button>
        </Modal>
      `
    })

    const { getByText, queryByText } = renderModal(component)
    getByText('content')

    await fireEvent.keyDown(window, { key: 'Escape' })
    expect(queryByText('content')).not.toBeInTheDocument()
  })
})
