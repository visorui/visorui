import { provide, inject, ref, computed, ComputedRef, InjectionKey } from 'vue'

export interface ModalAPI {
  isVisible: ComputedRef<boolean>
  titleId: ComputedRef<string | undefined>
  descriptionId: ComputedRef<string | undefined>
  show(): void
  hide(): void
  registerTitle(id: string): void
  unregisterTitle(): void
  registerDescription(id: string): void
  unregisterDescription(): void
}

const modalKey: InjectionKey<ModalAPI> = Symbol('Modal')

export function createModal(): ModalAPI {
  const isVisible = ref(false)
  const titleId = ref<string>()
  const descriptionId = ref<string>()

  return {
    isVisible: computed(() => isVisible.value),
    titleId: computed(() => titleId.value),
    descriptionId: computed(() => descriptionId.value),
    show() {
      isVisible.value = true
    },
    hide() {
      isVisible.value = false
    },
    registerTitle(id) {
      if (titleId.value) {
        throw new Error('You cannot have more than one title per modal.')
      }

      titleId.value = id
    },
    unregisterTitle() {
      titleId.value = undefined
    },
    registerDescription(id) {
      if (descriptionId.value) {
        throw new Error('You cannot have more than one description per modal.')
      }

      descriptionId.value = id
    },
    unregisterDescription() {
      descriptionId.value = undefined
    }
  }
}

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
