# Interface: DataGridVueOptions

## Description

Additional options when initializing the data-grid-vue plugin.

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `dataGridComponentName` | `undefined` \| `string` | Optionally override the default name that the data grid component will be registered as. By default, `dgv-data-grid` will be used. |
| `dragonDropVueOptions` | `undefined` \| `DragonDropVueOptions` | Drag and drop is powered by `dragon-drop-vue` and that plugin's options can be overridden here on [DragonDropVueOptions](https://www.npmjs.com/package/dragon-drop-vue#plugin-options-ie-dragondropvueoptions).<br />The `dragDirectiveName` and `dropDirectiveName` options will be overridden by the `data-grid-vue` plugin to `dgv-drag` and `dgv-drop`. |
