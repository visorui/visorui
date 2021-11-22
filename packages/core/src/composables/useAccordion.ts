import { provide, inject, InjectionKey, ref, Ref, UnwrapRef } from 'vue'

export function createAccordionItem(id: number) {
  const contentId = ref('')

  return {
    id,
    contentId
  }
}

export interface AccordionOptions {
  multiple: Ref<boolean>
}

export type AccordionItemAPI = ReturnType<typeof createAccordionItem>

export function createAccordion(options: AccordionOptions) {
  let itemId = 0
  const activeIndices = ref<Set<number>>(new Set())
  const items = ref<AccordionItemAPI[]>([])

  const registerItem = () => {
    const item = createAccordionItem(++itemId)
    items.value.push(item as unknown as UnwrapRef<typeof item>)
    return item
  }

  const unregisterItem = (index: number) => activeIndices.value.delete(index)

  const expandItem = (index: number) => {
    if (!options.multiple.value) {
      activeIndices.value.clear()
    }

    activeIndices.value.add(index)
  }

  const collapseItem = (index: number) => activeIndices.value.delete(index)

  return {
    activeIndices,
    items,
    registerItem,
    unregisterItem,
    expandItem,
    collapseItem
  }
}

export type AccordionAPI = ReturnType<typeof createAccordion>

const accordionKey: InjectionKey<AccordionAPI> = Symbol('Accordion')

export function provideAccordion(options: AccordionOptions) {
  const accordion = createAccordion(options)
  provide(accordionKey, accordion)
  return accordion
}

export function useAccordion() {
  const accordion = inject(accordionKey)

  if (!accordion) {
    throw new Error('Accordion not provided.')
  }

  return accordion
}

const accordionItemKey: InjectionKey<AccordionItemAPI> =
  Symbol('Accordion Item')

export function provideAccordionItem(item: AccordionItemAPI) {
  provide(accordionItemKey, item)
}

export function useAccordionItem() {
  const item = inject(accordionItemKey)

  if (!item) {
    throw new Error('Accordion Item not provided.')
  }

  return item
}
