import { nextTick, type Directive, type DirectiveBinding, type VNode } from 'vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<FocusOptions>, vnode: VNode<any, HTMLElement>, prevVNode: VNode<any, HTMLElement> | null) {
    if (binding.value.onMount) {
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
  onMount?: boolean
}
