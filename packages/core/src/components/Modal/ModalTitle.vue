<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useModal } from '../../composables/useModal'
import { useGlobalId } from '../../composables/useGlobalId'

const props = withDefaults(
  defineProps<{
    as?: string
    id?: string
  }>(),
  {
    as: 'h2'
  }
)

const { registerTitle, unregisterTitle, titleId } = useModal()

watch(
  () => props.id,
  () => {
    registerTitle(props.id ? props.id : `modal-title-${useGlobalId()}`)
  },
  { immediate: true }
)

onUnmounted(() => {
  unregisterTitle()
})
</script>

<template>
  <component :is="as" :id="titleId">
    <slot />
  </component>
</template>
