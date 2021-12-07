<script setup lang="ts">
import { ref } from 'vue'
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent
} from '@visorui/core'

const items = 3
const activeIndex = ref([0])
</script>

<template>
  <Accordion v-model="activeIndex" multiple class="max-w-xl mx-auto mt-10">
    <AccordionItem
      v-for="i in items"
      :key="i"
      v-slot="{ isExpanded }"
      class="mb-4"
    >
      <AccordionHeader
        class="
          flex
          bg-green-400
          text-white
          px-5
          py-3
          w-full
          rounded-lg
          justify-between
          font-medium
          transition-colors
          hover:bg-green-500
        "
      >
        Item {{ i }}
        <div>
          <span v-if="!isExpanded">+</span>
          <span v-if="isExpanded">-</span>
        </div>
      </AccordionHeader>
      <AccordionContent class="px-5 py-3">Content {{ i }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
