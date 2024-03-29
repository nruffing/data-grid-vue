<p align="center">
  <img src="./vuepress/.vuepress/public/favicon.svg" width="100" style="margin: 15px 0;" />
</p>

<h1 align="center">Data Grid Vue</h1>

<p align="center">
  <a href="https://github.com/sponsors/nruffing">
    <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/nruffing?logo=github&color=%23ffa600">
  </a>
</p>
<br />

Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control. Features include [numerous slots](https://datagridvue.com/generated/DataGridVueGrid/#slots), paging, sorting, filtering, [CSS variables](https://datagridvue.com/theme), client and server-data retrieval, client and server-side grid-state storage (i.e. local storage, session storage, etc.), dynamic column widths, selectable page size, drag-and-drop column reorder powered by [dragon-drop-vue](https://github.com/nruffing/dragon-drop-vue), and ability for user to add/remove columns.

<p align="center">
  <a href="https://github.com/nruffing/data-grid-vue/actions/workflows/ci_cd.yml">
    <img src="https://github.com/nruffing/data-grid-vue/actions/workflows/ci_cd.yml/badge.svg" />
  </a>
  <a href="https://github.com/nruffing/data-grid-vue/actions/workflows/docs_ci_cd.yml">
    <img src="https://github.com/nruffing/data-grid-vue/actions/workflows/docs_ci_cd.yml/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/data-grid-vue" target="_blank" aria-label="npm">
    <img alt="npm" src="https://img.shields.io/npm/v/data-grid-vue?logo=npm" />
  </a>
  <a href="https://github.com/nruffing/data-grid-vue/blob/main/LICENSE" aria-label="MIT License">
    <img alt="GitHub" src="https://img.shields.io/github/license/nruffing/data-grid-vue" />
  </a>
</p>

<hr />
<p align="center">
  :point_right: <a href="https://datagridvue.com/guide" target="_blank">Quick Start</a> :point_left:
</p>

<br />
<div class="example-image-container">
  <img src="./vuepress/.vuepress/public/example2.png" />
</div>

<br />

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="dataItems"
  :sort-options="{
    sortable: true,
    multiColumn: false,
  }"
  :allow-column-reorder="true"
  :show-column-selection="true"
>
</dgv-data-grid>
```

<hr />

## Features

* Leverages a flat html structure and CSS grid to allow full layout control. This allows versatility in the parent layout (e.g. a full page page, half page, etc.).
* [CSS variables](https://datagridvue.com/theme) for quick theming
* Cell render templates
* Supply arrow function to get column's value
* Supply custom data service to provide custom implementation of data retrieval, paging, sorting, and filtering
* Built-in data services for client-side and server-side data retrieval, sorting, filtering and paging
* Server-side data service
  * If using the default data contracts (i.e. PageDataRequest and PageData) just a valid POST url is required to be configured
  * Optional hooks for modifying/replacing the Request and converting the returned data to a PageData object
  * If using an ASP.NET Core API with EF Core or any other ORM leveraging IQueryable [this library](https://github.com/nruffing/data-grid-vue-dotnet) can be used to automatically apply the PageDataRequest to an IQueryable.
  * Specify user and grid identifier that will be sent with page data requests.
* Sorting
  * Single and multiple column sorting
  * Enabled per column
* Filtering
  * Enabled per column
  * Default filter input and header cell template
  * Multiple operators
  * Filter inputs are displayed in each column and the filter row can be shown/hidden by the user with a toggle above the grid
  * Can be overridden with an externally supplied filter. This is useful to be able to implement a global search across multiple/all columns.
* Column widths can be specified with px, % or *
  * By default columns without a width specified will take up an equal share of the remaining space
  * The relative * unit can be used to specify a column to take a relational share of the remaining space
  * Column widths automatically regenerate when the window/page size changes
* Selectable page size with configurable available page sizes
* Optional drag and drop column reorder
* Optionally allow users to add/remove columns with column selection menu
* Built-in support for storing grid state in local storage, session storage or server-side with HTTP support similar to using the server-side data service
  * Supply custom storage service to provide custom implementation of storing a user's grid state
  * Saved grid state includes page size, which columns are displayed, current sort, current filters, current external filter, and column order
  * Local and session storage are specified as a prop per grid instance so consumer can have multiple grids with their own state
* [Numerous slots](https://datagridvue.com/generated/DataGridVueGrid/#slots) to provide custom render templates including:
  * Entire options header (i.e. Show Filter Options, Clear Filters, etc.)
  * Individual options in the options header
  * Add/Remove columns popup content
  * Filter inputs per column
  * Header cell per column
  * Data cell per column
  * Entire footer
  * Individual footer sections
  * Loader
* Accessibility
  * Specific labels for screen readers with additional context leveraging `aria-label` attributes where necessary to supply information about the current state of the grid.
  * Keyboard navigation
    * Header cells, header options, filter row cells, add/remove column menu, grid's scrollable content body, and page navigation in the footer can be keyboard navigated using the tab key.
    * Header options can be invoked with the space or enter key.
    * Columns can be sorted with the space or enter key when the header cell is focused.
    * Columns can be reordered with the left and right arrow keys when the header cell is focused.
    * Header options can be invoked with the space key when focused.
    * Add/remove column menu is focused when it opens and can be navigated via keyboard using the tab key.

<hr />
<p align="center">
  :heart: <a href="https://github.com/sponsors/nruffing" target="_blank">Sponsor</a> :heart:
  <span>|</span>
  :point_right: <a href="https://datagridvue.com/guide" target="_blank">Quick Start</a> :point_left:
  <br /><br />
  :beetle: <a href="https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=bug&projects=&template=bug_report.md&title=%5Bbug%5D">Report Bug</a>
  <span>|</span>
  :sparkle: <a href="https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=enhancement&projects=&template=feature_request.md&title=%5Bfeature%5D">Feature Request</a>
  <span>|</span>
  :books: <a href="https://datagridvue.com" target="_blank">Documentation</a>
  <span>|</span>
  :question: <a href="https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=support&projects=&template=support-request.md&title=%5Bsupport%5D">Questions</a>
  <span>|</span>
  :scroll: <a href="https://datagridvue.com/changelog" target="_blank">Changelog</a>
  <br/><br/>
  :package: <a href="https://www.npmjs.com/package/data-grid-vue" target="_blank">NPM</a>
  <span>|</span>
  :package: <a href="https://yarnpkg.com/package?name=data-grid-vue" target="_blank">Yarn</a>
</p>
<hr />

# Data Grid Vue

## Release Notes

### v3.3.1
  - Rev development dependencies. This addresses the security vulnerabilities reported in package [`ip`](https://github.com/nruffing/data-grid-vue/security/dependabot/12).
  - Update [`dragon-drop-vue`](http://dragondropvue.com) dependency to v2.1.1.
  - Update [`native-event-vue`](http://nativeeventvue.com) dependency to v1.4.1.
  - Resolve breaking changes in vuepress v2 RC.
  - Leverage new heading sidebar option in vuepress's default theme.

### v3.3.0
  - Add `date` and `dateTime` filtering support to `ClientSideDataService`.
  - Improved `date` and `dateTime` support for sorting and filtering in `ClientSideDataService` ensuring all computations are done on UTC dates and falsey values are converted to the JS minimum date of `1970-01-01 00:00:00.000+00:00`.
  - Fix for sorting being able to override the filter.

### v3.2.0
  - [#9](https://github.com/nruffing/data-grid-vue/issues/9): Add package export so styles can be loaded via `data-grid-vue/style`.
  - Fix bug in `ClientSideDataService` where paging through a sorted grid could cause data to not stay sorted.
  - Update [`dragon-drop-vue`](https://www.npmjs.com/package/dragon-drop-vue) dependency to v2.1.0 to leverage ability to debounce the `dragover` event.
  - Replace [`debounce`](https://www.npmjs.com/package/debounce) with new [`native-event-vue`](https://www.npmjs.com/package/native-event-vue) package to leverage the lightweight vue-friendly native event handling with debounce.
  - Update development dependencies.

### v3.1.0
  - Update [`dragon-drop-vue`](https://www.npmjs.com/package/dragon-drop-vue) dependency to v1.1.0
  - update development dependencies

### v3.0.1
  - bugfix: click outside directive used for closing the add/remove columns popup is incorrectly using page position instead of viewport position
  - bugfix: header title and aria label incorrectly informs user that a column can be sorted when sort is turned on for the grid but not that specific column
  - bugfix: focus is placed back on whichever column header was focused last when performing another update like filtering
  - accessibility: scrollable region must have keyboard access for `dgv-data-grid-body`
  - accessibility: `aria-label` attribute cannot be used on a span with no valid `role` attribute for `dgv-filter-operator` and `options-header`.
  - docs: fix critical accessibility errors reported by axe


### v3.0.0
 > [!CAUTION]
  node v18 is now the minimum supported version. This was previously v14. v18 is the [current oldest lts version of node](https://nodejs.org/en/about/previous-releases).
   
 > [!CAUTION]
  `data-grid-vue` now requires a minimum `vue` version of `3.3.0`. It is also recommended to upgrade to at least version `5.0.2` of `vite`. [Vite v5 migration guide](https://vitejs.dev/guide/migration)
   
 > [!CAUTION]
  The `column-selection-popup` slot `hiddenUpdated` prop has been renamed to `onHiddenUpdated` to be consistent with similar method names.
   
 > [!CAUTION]
  Methods that return a `Promise` have been renamed to be suffixed with `Async` to make it clear that they return a `Promise`.
    `loadPageData` -> `loadPageDataAsync` | `onPageSizeChanged` -> `onPageSizeChangedAsync` | `DataService.getPage` -> `DataService.getPageAsync` | `StorageService.getGridState` -> `StorageService.getGridStateAsync` | `StorageService.setGridState` -> `StorageService.setGridStateAsync`
   
 > [!TIP]
  New footer slots
    `footer` - entire footer | `footer-page-size-select` - footer page size select | `footer-additional-content` - additional content between page size select and total item text | `footer-total-items` - total items text
   
 > [!TIP]
  [#4](https://github.com/nruffing/data-grid-vue/issues/4) accessibility improvements. Add missing aria-label attributes. Allow header to be navigated via keyboard. Allow sort and reorder actions to be performed via keyboard when header cell has focus. Space or enter to cycle through sort options. Left and right arrow to reorder. Allow header options to be triggered via space or enter. Add/remove column menu is focused when it opens and can be navigated via keyboard using the tab key.
   
 > [!TIP]
  Display loading spinner when data takes more then a second to load page data. Override loader with `loader` slot.
   
 
  - Add additional parameters to the `options-header`, `options-header-filter-options-shown`, and `options-header-clear-filters` slots.
  - `ServerSideStorageService` now has a generic type constraint to allow any type to be used for the user identifier sent in the request to get and set grid state.
  - `ServerSideStorageService` now has a grid id parameter that can be sent to the server to allow for support of multiple grids.
  - `ServerSideStorageService.getGridState` and `ServerSideDataService.getPage` will now only try to deserialize the response body as JSON if the status code is `200 OK` and the response `Content-Type` header is `application/json`.
  - Dynamic column header titles
  - Entire header cell is now the click target for a sort.
  - Default color values of CSS variables are now defined in hex.
  - Default accent color slightly altered to match documentation site.
  - Improved default layout styles of custom column filters set using the `filter-{fieldName}` slot.
  - Documentation site now includes documentation for [DataGridVueDotnet](https://github.com/nruffing/data-grid-vue-dotnet).
  - Repo now uses [`pnpm`](https://pnpm.io/) where the `data-grid-vue` package is build from the root workspace and the documentation site and dev app are nested workspaces.
  - Now being built with `vite` [v5](https://vitejs.dev/blog/announcing-vite5).
  - Update [`debounce`](https://www.npmjs.com/package/debounce/v/2.0.0) dependency to new major version v2.0.0 which requires node v18 ([current oldest supported version](https://nodejs.org/en/about/previous-releases)).
  - Update [`dragon-drop-vue`](https://www.npmjs.com/package/dragon-drop-vue) dependency to v0.2.0
  - Documentation site theme update
  - Documentation site is now setup up as a [progressive web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).
  - bugfix: `DataGridVueOptions.clickOutsideDirectiveName` removed.
  - bugfix: `DataGridVueOptions.dragonDropVueOptions.dragDirectiveName` and `dropDirectiveName` will always be overridden to `dgv-drag` and `dgv-drop`.
   

### v2.3.0
  - Allow dragon-drop-vue directive names to be overridden via the data-grid-vue plugin options
  - Allow data-grid-vue component registration name to be overridden via the plugin options
  - Allow the click-outside directive name to be overridden via the plugin options
  - Add documentation for which CSS variables are available
  - Quick start guide
  - Fix spelling errors in documentation
  - Fix edit page links in documentation
  - Readme updates

### v2.2.0
  - Add clear filters callback to options-header slot
  - Fix column shown state in ColumnSelectionItem
  - Define slot types and add to documentation
  - Define emit types and add to documentation
  - Even more documentation improvements

### v2.1.2
  - Fix for sorting and filtering not working when the data grid is not configured to be paged.
  - Fix Icon component import in HeaderCell
  - Documentation improvements

### v2.1.1
  - Readme/documentation improvements
  - CSS improvements
  
### v2.1.0
  - Add css variable for input/select font size

### v2.0.0-beta
 > [!CAUTION]
  DataGridVue component is now exported as DataGridVueGrid in favor of using a new plugin to ensure proper setup. Plugin registers DataGridVueGrid component globally as dgv-data-grid.
   
  - Column reordering via drag-and-drop can be enabled on the grid with the allowColumnReorder property. Drag and drop is powered by [dragon-drop-vue](https://www.npmjs.com/package/dragon-drop-vue) and dragon drop global options can be set on the plugin options.
  - Hidden columns are now supported. A popup for users to add/remove columns from the view can be enabled with the showColumnSelection property.
  - Improved page size select styling.
  - Clear filters action
  - Add support for storing grid state in local storage, session storage or server-side with HTTP support similar to using the server-side data service
  - Bugfix for sort index display when more then one column is sorted

### v1.0.0
  - Table html structure replaced with css grid for better layout control
  - Full height and full height options removed in favor of css grid to allow for greater layout control in parent application
  - fix order of sorting and filtering in default client data service

### v0.1.4-alpha
  - fix import types export
  - update dev dependencies

### v0.1.1-alpha
  - remove console.log

### v0.1.0-alpha
  - add full height option which forces the footer to the bottom of the grids parent and will scroll only the grid rows
  - add thead and tbody elements
  - add ability to specify column widths with px, % and \*
  - add page size selection with customizable page size options

### v0.0.5-alpha
  - fix external filter

### v0.0.4-alpha
  - add support for externally specifying a filter

### v0.0.3-alpha
  - fix css variable names
  - use rems

### v0.0.2-alpha
  - properly specify location of types in package

### v0.0.1-alpha
  - initial release


<hr />

## Contributing

For more information, read the [contribution guide](https://github.com/nruffing/data-grid-vue/blob/main/CONTRIBUTING.md).

## Code of Conduct

For more information, read the community [code of conduct](https://github.com/nruffing/data-grid-vue/blob/main/CODE_OF_CONDUCT.md).