import type { App, Plugin } from 'vue'
import { DragonDropVue, type DragonDropVueOptions } from 'dragon-drop-vue'
import DataGridVueComponent from './components/DataGridVue.vue'

export interface DataGridVueOptions {
  dragonDropVueOptions: DragonDropVueOptions | undefined
}

export const DataGridVue = {
  install: (app: App, options: DataGridVueOptions) => {
    /*
     * Register DragonDropVue
     */
    const dragonOptions = options?.dragonDropVueOptions ?? ({} as DragonDropVueOptions)
    app.use(DragonDropVue, dragonOptions)

    /*
     * Register components
     */
    app.component('dgv-data-grid', DataGridVueComponent)
  },
} as Plugin<DataGridVueOptions>
