import { provide, inject, ref, computed, InjectionKey } from 'vue'

export function createModal() {
  const isVisible = ref(false)
  const titleId = ref<string>()
  const descriptionId = ref<string>()

  const show = () => (isVisible.value = true)
  const hide = () => (isVisible.value = false)

  const registerTitle = (id: string) => {
    if (titleId.value) {
      throw new Error('You cannot have more than one title per modal.')
    }

    titleId.value = id
  }

  const unregisterTitle = () => (titleId.value = undefined)

  const registerDescription = (id: string) => {
    if (descriptionId.value) {
      throw new Error('You cannot have more than one description per modal.')
    }

    descriptionId.value = id
  }

  const unregisterDescription = () => (descriptionId.value = undefined)

  return {
    isVisible: computed(() => isVisible.value),
    titleId: computed(() => titleId.value),
    descriptionId: computed(() => descriptionId.value),
    show,
    hide,
    registerTitle,
    unregisterTitle,
    registerDescription,
    unregisterDescription
  }
}

export type ModalAPI = ReturnType<typeof createModal>

const modalKey: InjectionKey<ModalAPI> = Symbol('Modal')

export function provideModal() {
  const modal = createModal()
  provide(modalKey, modal)
  return modal
}

export function useModal() {
  const modal = inject(modalKey)
  if (!modal) {
    throw new Error('Modal not provided.')
  }
  return modal
}
