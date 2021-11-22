<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import {
  useAccordion,
  provideAccordionItem
} from '../../composables/useAccordion'

const props = withDefaults(
  defineProps<{
    as?: string
  }>(),
  {
    as: 'div'
  }
)

const { registerItem, unregisterItem, activeIndices, items, collapseItem } =
  useAccordion()
const item = registerItem()
const index = computed(() => items.value.findIndex(({ id }) => id === item.id))
const isExpanded = computed(() => activeIndices.value.has(index.value))
const collapse = () => collapseItem(index.value)

provideAccordionItem(item)

onUnmounted(() => unregisterItem(index.value))
</script>

<template>
  <component :is="as">
    <slot :is-expanded="isExpanded" :collapse="collapse" />
  </component>
</template>
