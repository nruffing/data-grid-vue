import { nextTick, type Directive, type DirectiveBinding, type VNode } from 'vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<FocusOptions>, vnode: VNode<any, HTMLElement>, prevVNode: VNode<any, HTMLElement> | null) {
    if (binding.value.focusOnMount) {
      nextTick(() => {
        el.focus()
      })
    }

    el.addEventListener('focus', () => {
      if (binding.value.onFocus) {
        binding.value.onFocus()
      }
    })
  },
  updated(el: HTMLElement, binding: DirectiveBinding<FocusOptions>, vnode: VNode<any, HTMLElement>, prevVNode: VNode<any, HTMLElement> | null) {
    if (binding.value.focusOnUpdate) {
      nextTick(() => {
        el.focus()
      })
    }
  },
} as Directive<HTMLElement, FocusOptions>

export interface FocusOptions {
  /**
   * When true, the element will be focused when the element is mounted.
   */
  focusOnMount?: boolean
  /**
   * When true, the element will be focused when the element is updated.
   */
  focusOnUpdate?: boolean
  /**
   * Event handler that is called when the element is focused.
   */
  onFocus?: () => void
}
