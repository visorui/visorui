import { createRouter, createWebHistory } from 'vue-router'
import Overview from './routes/Overview.vue'
import Modal from './routes/Modal.vue'
import Accordion from './routes/Accordion.vue'

export const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      component: Overview
    },
    {
      path: '/modal',
      component: Modal
    },
    {
      path: '/accordion',
      component: Accordion
    }
  ]
})
