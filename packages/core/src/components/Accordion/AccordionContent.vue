<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAccordion, useAccordionItem } from '../../composables/useAccordion'
import { useGlobalId } from '../../composables/useGlobalId'

const props = withDefaults(
  defineProps<{
    as?: string
    id?: string
  }>(),
  {
    as: 'div'
  }
)

const { activeIndices, items } = useAccordion()
const { id: itemId, contentId } = useAccordionItem()
const index = computed(() => items.value.findIndex(({ id }) => id === itemId))
const isExpanded = computed(() => activeIndices.value.has(index.value))

watch(
  () => props.id,
  (value) => {
    contentId.value = value || `accordion-content-${useGlobalId()}`
  },
  { immediate: true }
)
</script>

<template>
  <component :is="as" v-if="isExpanded" :id="contentId">
    <slot />
  </component>
</template>
