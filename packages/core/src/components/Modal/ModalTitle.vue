<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useModal } from '../../composables/useModal'

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
    registerTitle(props.id ? props.id : `modal-title`)
  },
  { immediate: true }
)

onUnmounted(() => {
  unregisterTitle()
})
</script>

<template>
  <component :id="titleId" :is="as">
    <slot />
  </component>
</template>
