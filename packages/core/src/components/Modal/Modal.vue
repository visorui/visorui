<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { createFocusTrap } from 'focus-trap'
import type { FocusTrap, Options } from 'focus-trap'
import { provideModal } from '../../composables/useModal'

const props = withDefaults(
  defineProps<{
    as?: string
    to?: string
    modelValue?: boolean
    initialFocus?: Options['initialFocus']
  }>(),
  {
    as: 'div',
    to: 'body'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
}>()

const { isVisible, show, hide, titleId, descriptionId } = provideModal()
const modalElement = ref()
let trap: undefined | FocusTrap

watch(
  modalElement,
  (el) => {
    if (el) {
      try {
        trap = createFocusTrap(
          modalElement.value,
          props.initialFocus
            ? {
                initialFocus: props.initialFocus
              }
            : {}
        )
        trap.activate()
      } catch (e) {
        console.warn(
          'No focusable element found. You should add one for accessibility reasons.'
        )
      }
    } else {
      trap?.deactivate()
    }
  },
  { flush: 'post' }
)

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (!oldValue && value) {
      show()
      emit('show')
    } else if (oldValue && !value) {
      hide()
      emit('hide')
    }
  },
  { immediate: true }
)

watch(
  isVisible,
  (value) => {
    emit('update:modelValue', value)
  },
  { immediate: true }
)

const escapeEventListener = (e: KeyboardEvent) => {
  if (e.key !== 'Escape' || !isVisible.value) return
  e.stopPropagation()
  e.preventDefault()
  hide()
}

onMounted(() => {
  window.addEventListener('keydown', escapeEventListener)
})

onUnmounted(() => {
  trap?.deactivate()
  window.removeEventListener('keydown', escapeEventListener)
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <teleport :to="to">
    <component
      :is="as"
      v-if="isVisible"
      ref="modalElement"
      v-bind="$attrs"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
    >
      <slot />
    </component>
  </teleport>
</template>
