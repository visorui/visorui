import { provide, inject, ref, computed, ComputedRef, InjectionKey } from 'vue'

export interface ModalAPI {
  isVisible: ComputedRef<boolean>
  titleId: ComputedRef<string | undefined>
  show(): void
  hide(): void
  registerTitle(id: string): void
  unregisterTitle(): void
}

const modalKey: InjectionKey<ModalAPI> = Symbol('Modal')

export function createModal(): ModalAPI {
  const isVisible = ref(false)
  const titleId = ref<string>()

  return {
    isVisible: computed(() => isVisible.value),
    titleId: computed(() => titleId.value),
    show() {
      isVisible.value = true
    },
    hide() {
      isVisible.value = false
    },
    registerTitle(id) {
      titleId.value = id
    },
    unregisterTitle() {
      titleId.value = undefined
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
