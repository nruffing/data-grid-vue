import { type Directive, type DirectiveBinding, type VNode } from 'vue'

const clickEventPropName = 'dgv-window-click-event-handler'

const clickListenerFactory = (el: HTMLElement, binding: DirectiveBinding<ClickOutsideOptions>) => {
  const elRect = el.getBoundingClientRect()

  return (ev: MouseEvent) => {
    const target = ev.target as HTMLElement
    if (ev.x > elRect.right || ev.x < elRect.left || ev.y < elRect.top || ev.y > elRect.bottom) {
      if (binding.value.ignoreSelectors && target.matches(binding.value.ignoreSelectors)) {
        return
      }
      binding.value.handler()
    }
  }
}

export default {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<ClickOutsideOptions>,
    vnode: VNode<any, HTMLElement>,
    prevVNode: VNode<any, HTMLElement> | null,
  ) {
    const listener = clickListenerFactory(el, binding)
    setTimeout(() => {
      ;(window as any)[clickEventPropName] = listener
      window.addEventListener('mousedown', listener)
    }, 300)
  },
  beforeUnmount(
    el: HTMLElement,
    binding: DirectiveBinding<ClickOutsideOptions>,
    vnode: VNode<any, HTMLElement>,
    prevVNode: VNode<any, HTMLElement> | null,
  ) {
    const listener = (window as any)[clickEventPropName] as (ev: MouseEvent) => void
    if (listener) {
      ;(window as any)[clickEventPropName] = undefined
      window.removeEventListener('mousedown', listener)
    }
  },
} as Directive<HTMLElement, ClickOutsideOptions>

export interface ClickOutsideOptions {
  handler: () => void
  ignoreSelectors: string | undefined
}
