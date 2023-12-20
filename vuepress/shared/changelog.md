# Data Grid Vue

## Release Notes

### v3.1.0
  - Update ['dragon-drop-vue'](https://www.npmjs.com/package/dragon-drop-vue) dependency to v1.1.0
  - update development dependencies

### v3.0.1
  - bugfix: click outside directive used for closing the add/remove columns popup is incorrectly using page position instead of viewport position
  - bugfix: header title and aria label incorrectly informs user that a column can be sorted when sort is turned on for the grid but not that specific column
  - bugfix: focus is placed back on whichever column header was focused last when performing another update like filtering
  - accessibility: scrollable region must have keyboard access for `dgv-data-grid-body`
  - accessibility: `aria-label` attribute cannot be used on a span with no valid `role` attribute for `dgv-filter-operator` and `options-header`.
  - docs: fix critical accessibility errors reported by axe


### v3.0.0
  ::: danger BREAKING
  node v18 is now the minimum supported version. This was previously v14. v18 is the [current oldest lts version of node](https://nodejs.org/en/about/previous-releases).
  :::
  ::: danger BREAKING
  `data-grid-vue` now requires a minimum `vue` version of `3.3.0`. It is also recommended to upgrade to at least version `5.0.2` of `vite`. [Vite v5 migration guide](https://vitejs.dev/guide/migration)
  :::
  ::: danger BREAKING
  The `column-selection-popup` slot `hiddenUpdated` prop has been renamed to `onHiddenUpdated` to be consistent with similar method names.
  :::
  ::: danger BREAKING
  Methods that return a `Promise` have been renamed to be suffixed with `Async` to make it clear that they return a `Promise`.
    `loadPageData` -> `loadPageDataAsync` | `onPageSizeChanged` -> `onPageSizeChangedAsync` | `DataService.getPage` -> `DataService.getPageAsync` | `StorageService.getGridState` -> `StorageService.getGridStateAsync` | `StorageService.setGridState` -> `StorageService.setGridStateAsync`
  :::
  ::: tip New Feature Highlight
  New footer slots
    `footer` - entire footer | `footer-page-size-select` - footer page size select | `footer-additional-content` - additional content between page size select and total item text | `footer-total-items` - total items text
  :::
  ::: tip New Feature Highlight
  [#4](https://github.com/nruffing/data-grid-vue/issues/4) accessibility improvements. Add missing aria-label attributes. Allow header to be navigated via keyboard. Allow sort and reorder actions to be performed via keyboard when header cell has focus. Space or enter to cycle through sort options. Left and right arrow to reorder. Allow header options to be triggered via space or enter. Add/remove column menu is focused when it opens and can be navigated via keyboard using the tab key.
  :::
  ::: tip New Feature Highlight
  Display loading spinner when data takes more then a second to load page data. Override loader with `loader` slot.
  :::
  ::: details More changes
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
  - Update ['dragon-drop-vue'](https://www.npmjs.com/package/dragon-drop-vue) dependency to v0.2.0
  - Documentation site theme update
  - Documentation site is now setup up as a [progressive web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).
  - bugfix: `DataGridVueOptions.clickOutsideDirectiveName` removed.
  - bugfix: `DataGridVueOptions.dragonDropVueOptions.dragDirectiveName` and `dropDirectiveName` will always be overridden to `dgv-drag` and `dgv-drop`.
  :::

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
  ::: danger BREAKING
  DataGridVue component is now exported as DataGridVueGrid in favor of using a new plugin to ensure proper setup. Plugin registers DataGridVueGrid component globally as dgv-data-grid.
  :::
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
