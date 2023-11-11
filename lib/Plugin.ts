import type { App } from 'vue'
import { DragonDropVue, type DragonDropVueOptions } from 'dragon-drop-vue'
import DataGridVueComponent from './components/DataGridVue.vue'
import ClickOutsideDirective from './directives/ClickOutside'

/**
 * @group Plugin
 */
export interface DataGridVueOptions {
  dragonDropVueOptions: DragonDropVueOptions | undefined
}

/**
 * @group Plugin
 */
export const DataGridVue = {
  install: (app: App, options: DataGridVueOptions | undefined = undefined) => {
    /*
     * Register DragonDropVue
     */
    const dragonOptions = {
      ...(options?.dragonDropVueOptions ?? ({} as DragonDropVueOptions)),
      dragDirectiveName: 'dgv-drag',
      dropDirectiveName: 'dgv-drop',
    } as DragonDropVueOptions | undefined

    app.use(DragonDropVue, dragonOptions)

    /*
     * Register directives
     */
    app.directive('dgv-click-outside', ClickOutsideDirective)

    /*
     * Register components
     */
    app.component('dgv-data-grid', DataGridVueComponent)
  },
}
