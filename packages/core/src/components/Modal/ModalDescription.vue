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
    as: 'p'
  }
)

const { registerDescription, unregisterDescription, descriptionId } = useModal()

watch(
  () => props.id,
  () => {
    registerDescription(
      props.id ? props.id : `modal-description-${useGlobalId()}`
    )
  },
  { immediate: true }
)

onUnmounted(() => {
  unregisterDescription()
})
</script>

<template>
  <component :id="descriptionId" :is="as">
    <slot />
  </component>
</template>
