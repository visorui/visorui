<script setup lang="ts">
import { ref } from 'vue'
import {
  Modal,
  ModalOverlay,
  ModalTitle,
  ModalDescription
} from '@visorui/core'

const isVisible = ref(false)
const openModal = () => (isVisible.value = true)
</script>

<template>
  <Modal
    class="fixed inset-0 z-20 flex items-center justify-center"
    v-model="isVisible"
  >
    <transition name="fade" appear>
      <ModalOverlay
        class="fixed inset-0 bg-black bg-opacity-50"
        v-if="isVisible"
      />
    </transition>
    <transition name="slide" appear>
      <div class="bg-white relative z-10 rounded-xl p-20 max-w-md w-full">
        <ModalTitle>Hello!</ModalTitle>
        <ModalDescription>Modal description</ModalDescription>
        <form>
          <input type="text" class="border-2" />
        </form>
      </div>
    </transition>
  </Modal>
  <p>
    <button @click="openModal">Open Modal</button>
  </p>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10%);
}
</style>
