import type { App } from 'vue'
import { DragonDropVue, type DragonDropVueOptions } from 'dragon-drop-vue'
import DataGridVueComponent from './components/DataGridVue.vue'
import ClickOutsideDirective from './directives/ClickOutside'
import FocusDirective from './directives/Focus'

/**
 * @group Plugin
 * @description Additional options when initializing the data-grid-vue plugin.
 */
export interface DataGridVueOptions {
  /**
   * Optionally override the default name that the data grid component will be registered as. By default, `dgv-data-grid` will be used.
   */
  dataGridComponentName: string | undefined
  /**
   * Drag and drop is powered by `dragon-drop-vue` and that plugin's options can be overridden here on {@link https://www.npmjs.com/package/dragon-drop-vue#plugin-options-ie-dragondropvueoptions | DragonDropVueOptions}.
   * The `dragDirectiveName` and `dropDirectiveName` options will be overridden by the `data-grid-vue` plugin to `dgv-drag` and `dgv-drop`.
   */
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
    } as DragonDropVueOptions

    app.use(DragonDropVue, dragonOptions as DragonDropVueOptions | undefined)

    /*
     * Register directives
     */
    app.directive('dgv-click-outside', ClickOutsideDirective)
    app.directive('dgv-focus', FocusDirective)

    /*
     * Register components
     */
    app.component(options?.dataGridComponentName ? options.dataGridComponentName : 'dgv-data-grid', DataGridVueComponent)
  },
}
