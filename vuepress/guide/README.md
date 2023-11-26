# Quick Start

## Installation

`data-grid-vue` is available via both <a :href="$dgv.npmUrl" target="_blank">NPM</a> and <a :href="$dgv.yarnUrl" target="_blank">Yarn</a>

<CodeGroup>
  <CodeGroupItem title="NPM" active>

```bash
npm i data-grid-vue
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```bash
yarn add data-grid-vue
```

  </CodeGroupItem>
  <CodeGroupItem title="PNPM">

```bash
pnpm add data-grid-vue
```

  </CodeGroupItem>
</CodeGroup>

## Setup

The data grid component is recommended to be setup via the included Vue.js plugin. This plugin performs some additional setup around registering required directives as well as globally registering the data grid component as `dgv-data-grid`. 

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { DataGridVue } from 'data-grid-vue'

import '../node_modules/data-grid-vue/dist/style.css'

createApp(App).use(DataGridVue).mount('#app')
```

### Styles

Make sure to import the data grid core styles prior to any application-specific styles to be able to override the values of the predefined <a href="/theme" target="_blank">CSS Variables</a>.

The styles and variables can be imported from `../node_modules/data-grid-vue/dist/style.css`.

### Plugin Options

The `DataGridVue` plugin has additional options that can be specified. These options are specified in <a href="/generated/interfaces/DataGridVueOptions.html" target="_blank">DataGridVueOptions</a>. The default values for the options are going to work in almost all scenarios.

```ts
import { DataGridVue, type DataGridVueOptions } from 'data-grid-vue'

import '../node_modules/data-grid-vue/dist/style.css'

const dataGridVueOptions = {
  dataGridComponentName: 'custom-data-grid',
} as DataGridVueOptions

createApp(App).use(DataGridVue, dataGridVueOptions).mount('#app')
```

::: tip Note
The data grid component can also be imported locally to the component that will be using it but it is recommended to use the plugin since it also sets up a click-outside directive and drag and drop directives powered by [dragon-drop-vue](https://www.npmjs.com/package/dragon-drop-vue).

If you are not going to be using the functionality that these directives are used for then importing the data grid component locally will work and automatically import the styles. The component is exported as `DataGridVueGrid`.

The click-outside and focus directives are only used for the add/remove columns menu (i.e. the <a href="/generated/DataGridVueGrid/#showColumnSelection" target="_blank">showColumnSelection</a> is `true`).

The drag and drop directives are only used for column reordering (i.e. the <a href="/generated/DataGridVueGrid/#allowColumnReorder" target="_blank">allowColumnReorder</a> is `true`).
:::

<CodeGroup>
  <CodeGroupItem title="Options API" active>

```ts
import { defineComponent } from 'vue'
import { DataGridVueGrid } from 'data-grid-vue'

export default defineComponent({
  components: {
    DataGridVueGrid,
  }
})
```

  </CodeGroupItem>  
  <CodeGroupItem title="<script setup>">

```ts
import { DataGridVueGrid } from 'data-grid-vue'
```

  </CodeGroupItem>
</CodeGroup>

## Usage

A simple example populating a data grid with static client-side data is shown below. The `columns` and `data` props are the only required props in this scenario but this example also shows the data grid with sorting, filtering, column reorder and the ability to add/remove columns. These configuration options and other features will be further explained in later sections.

!!!include(simple-example.md)!!!

!!!include(columns-note.md)!!!