<script setup lang="ts">
import { ref } from 'vue'
import { Modal, ModalOverlay, ModalTitle } from '@visorui/core'

const isVisible = ref(false)
const openModal = () => (isVisible.value = true)
</script>

<template>
  <Modal
    class="fixed inset-0 z-20 flex items-center justify-center"
    v-model="isVisible"
  >
    <ModalOverlay class="fixed inset-0 bg-black bg-opacity-50" />
    <div class="bg-white relative z-10 rounded-xl p-20 max-w-md w-full">
      <ModalTitle>Hello</ModalTitle>
      <form>
        <input type="text" class="border-2" />
      </form>
    </div>
  </Modal>
  <p>
    <button @click="openModal">Open Modal</button>
  </p>
</template>
