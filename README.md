# data-grid-vue

Customizable native Vue3 data grid with very limited dependencies.

[NPM](https://www.npmjs.com/package/data-grid-vue)

## Current Features

* Cell render templates
* Supply arrow function to get column's value
* Supply custom data service to provide custom implementation of data retrieval, paging, sorting, and filtering
* Built-in data services for client-side and server-side data retrieval, sorting, filtering and paging
* Server-side data service
  * If using the default data contracts (i.e. PageDataRequest and PageData) just a valid POST url is required to be configured
  * Optional hooks for modifying/replacing the Request and converting the returned data to a PageData object
  * (WIP) If using an ASP.NET Core API with EF Core or any other ORM leveraging IQueryable [this library](https://github.com/nruffing/data-grid-vue-dotnet) can be used to automatically apply the PageDataRequest to an IQueryable.
* Sorting
  * Single and multiple column sorting
  * Enabled per column
* Filtering
  * Enabled per column
  * Default filter input and header cell template
  * Multiple operators
  * Can be overridden with an externally supplied filter
* Full height option which forces the footer to the bottom of the grids parent and will scroll only the grid rows
* Column widths can be specified with px, % or *
  * By default columns without a width specified will take up an equal share of the remaining space
  * The relative * unit can be used to specify a column to take a relational share of the remaining space
* Selectable page size with configurable available page sizes

## Example

```vue
<DataGridVue
  :server-side-options="{
    postRoute: 'https://localhost:7179/DataGridVue',
    beforeRequest: onBeforeRequest,
  }"
  :columns="testDataColumns2"
  :sort-options="{
    sortable: true,
    multiColumn: false,
  }"
  :full-height="true"
>
  <template v-slot:filter-phoneNumber="{ column, initialFilterCondition, onFilterUpdated }">
    <div class="custom-filter">
      <input type="tel" :value="formatPhoneNumber(initialFilterCondition?.value)" @input="onPhoneNumberFilterInput($event, onFilterUpdated)"></input>
    </div>
  </template>
</DataGridVue>
```

## Release Notes
 * v0.0.1-alpha
   * initial release
 * v0.0.2-alpha
   * properly specify location of types in package
 * v0.0.3-alpha
   * fix css variable names
   * use rems
 * v0.0.4-alpha
   * add support for externally specifying a filter
 * v0.0.5-alpha
   * fix external filter
 * v0.1.0-alpha
   * add full height option which forces the footer to the bottom of the grids parent and will scroll only the grid rows
   * add thead and tbody elements
   * add ability to specify column widths with px, % and *
   * add page size selection with customizable page size options
 * v0.1.1-alpha
   * remove console.log
 * v0.1.3-alpha
   * fix import types export
________________________________________

## Build Package

```sh
npm run build
```
________________________________________

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
