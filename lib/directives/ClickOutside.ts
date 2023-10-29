import { type Directive, type DirectiveBinding, type VNode } from 'vue'

const clickEventPropName = 'dgv-window-click-event-handler'

const clickListenerFactory = (el: HTMLElement, binding: DirectiveBinding<() => void>) => {
  const elRect = el.getBoundingClientRect()

  return (ev: MouseEvent) => {
    if (ev.pageX > elRect.right || ev.pageX < elRect.left || ev.pageY < elRect.top || ev.pageY > elRect.bottom) {
      binding.value()
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<() => void>, vnode: VNode<any, HTMLElement>, prevVNode: VNode<any, HTMLElement> | null) {
    const listener = clickListenerFactory(el, binding)
    setTimeout(() => {
      ;(window as any)[clickEventPropName] = listener
      window.addEventListener('mousedown', listener)
    }, 300)
  },
  beforeUnmount(el: HTMLElement, binding: DirectiveBinding<() => void>, vnode: VNode<any, HTMLElement>, prevVNode: VNode<any, HTMLElement> | null) {
    const listener = (window as any)[clickEventPropName] as (ev: MouseEvent) => void
    if (listener) {
      ;(window as any)[clickEventPropName] = undefined
      window.removeEventListener('mousedown', listener)
    }
  },
} as Directive<HTMLElement, () => void>
