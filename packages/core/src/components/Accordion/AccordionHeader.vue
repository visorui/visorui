<script setup lang="ts">
import { computed } from 'vue'
import { useAccordion, useAccordionItem } from '../../composables/useAccordion'

const props = withDefaults(
  defineProps<{
    as?: string
  }>(),
  {
    as: 'button'
  }
)

const { activeIndices, expandItem, collapseItem, items } = useAccordion()
const { id: itemId, contentId } = useAccordionItem()
const index = computed(() => items.value.findIndex(({ id }) => id === itemId))
const isExpanded = computed(() => activeIndices.value.has(index.value))
const toggle = () =>
  activeIndices.value.has(index.value)
    ? collapseItem(index.value)
    : expandItem(index.value)
</script>

<template>
  <component
    :is="as"
    type="button"
    :aria-expanded="isExpanded"
    :aria-controls="contentId"
    @click="toggle"
  >
    <slot />
  </component>
</template>
