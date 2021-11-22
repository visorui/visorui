<script setup lang="ts">
import { computed, watch, toRefs } from 'vue'
import { provideAccordion } from '../../composables/useAccordion'

const props = withDefaults(
  defineProps<{
    as?: string
    modelValue?: number[]
    multiple?: boolean
  }>(),
  {
    as: 'div',
    multiple: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
}>()

const refProps = toRefs(props)
const { activeIndices, expandItem } = provideAccordion({
  multiple: refProps.multiple
})

const sortedIndices = computed(() => [...activeIndices.value].sort().join())

watch(
  () => props.modelValue,
  (indices) => {
    if (indices && indices.sort().join() !== sortedIndices.value) {
      for (const index of indices) {
        expandItem(index)
      }
    }
  },
  { deep: true, immediate: true }
)

watch(
  sortedIndices,
  () => {
    emit('update:modelValue', [...activeIndices.value])
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <component :is="as">
    <slot />
  </component>
</template>
