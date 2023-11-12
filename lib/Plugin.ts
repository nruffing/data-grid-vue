import type { App } from 'vue'
import { DragonDropVue, type DragonDropVueOptions } from 'dragon-drop-vue'
import DataGridVueComponent from './components/DataGridVue.vue'
import ClickOutsideDirective from './directives/ClickOutside'

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
   * Optionally override the default name of the click-outside directive. By default, `dgv-click-outside` will be used.
   */
  clickOutsideDirectiveName: string | undefined
  /**
   * Drag and drop is powered by `dragon-drop-vue` and that plugin's options can be overridden here on {@link https://www.npmjs.com/package/dragon-drop-vue#plugin-options-ie-dragondropvueoptions | DragonDropVueOptions}.
   * Be
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

    if (dragonOptions.dragDirectiveName === 'drag') {
      dragonOptions.dragDirectiveName = 'dgv-drag'
    }

    if (dragonOptions.dropDirectiveName === 'drop') {
      dragonOptions.dropDirectiveName = 'dgv-drop'
    }

    app.use(DragonDropVue, dragonOptions as DragonDropVueOptions | undefined)

    /*
     * Register directives
     */
    app.directive(options?.clickOutsideDirectiveName ? options.clickOutsideDirectiveName : 'dgv-click-outside', ClickOutsideDirective)

    /*
     * Register components
     */
    app.component(options?.dataGridComponentName ? options.dataGridComponentName : 'dgv-data-grid', DataGridVueComponent)
  },
}
