<script setup lang="ts">
import { useModal } from '../../composables/useModal'

withDefaults(
  defineProps<{
    as?: string
  }>(),
  {
    as: 'div'
  }
)

const { hide } = useModal()
const onClick = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  hide()
}
</script>

<template>
  <component :is="as" aria-hidden="true" @click="onClick" />
</template>
