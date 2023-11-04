<img src="./vuepress/docs/.vuepress/public/favicon.svg" width="100" style="margin: 15px 0;" />

# Data Grid Vue

Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.

<div class="badges">
  <a href="https://github.com/nruffing/data-grid-vue/actions/workflows/ci.yml">
    <img src="https://github.com/nruffing/data-grid-vue/actions/workflows/ci.yml/badge.svg" />
  </a>
  <a href="https://github.com/nruffing/data-grid-vue/actions/workflows/azure-static-web-apps-white-grass-07ff9650f.yml">
    <img src="https://github.com/nruffing/data-grid-vue/actions/workflows/azure-static-web-apps-white-grass-07ff9650f.yml/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/data-grid-vue" target="_blank" aria-label="npm">
    <img alt="npm" src="https://img.shields.io/npm/v/data-grid-vue?logo=npm" />
  </a>
  <a href="https://github.com/nruffing/data-grid-vue/blob/main/LICENSE" aria-label="MIT License">
    <img alt="GitHub" src="https://img.shields.io/github/license/nruffing/data-grid-vue" />
  </a>
</div>

<hr />
<div class="example-image-container">
  <img src="./vuepress/docs/.vuepress/public/example.png" />
</div>
<hr />

## Features

* CSS variables for quick theming
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
* Column widths can be specified with px, % or *
  * By default columns without a width specified will take up an equal share of the remaining space
  * The relative * unit can be used to specify a column to take a relational share of the remaining space
* Selectable page size with configurable available page sizes
* Optional drag and drop column reorder
* Optional add/remove columns from with column selection menu
* Built-in support for storing grid state in local storage, session storage or server-side with HTTP support similar to using the server-side data service

<hr />
<div class="links">
  <a href="https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=bug&projects=&template=bug_report.md&title=%5Bbug%5D">Report Bug</a>
  <span>|</span>
  <a href="https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=enhancement&projects=&template=feature_request.md&title=%5Bfeature%5D">Feature Request</a>
  <span>|</span>
  <a href="https://datagridvue.com" target="_blank">Documentation</a>
  <span>|</span>
  <a href="https://github.com/nruffing/data-grid-vue/blob/main/CHANGELOG.md">Changelog</a>
  <span>|</span>
  <a href="https://www.npmjs.com/package/data-grid-vue" target="_blank">NPM</a>
  <span>|</span>
  <a href="https://yarnpkg.com/package?name=data-grid-vue" target="_blank">Yarn</a>
</div>
<hr />

# Date Grid Vue

## Release Notes

- v0.0.1-alpha
  - initial release
- v0.0.2-alpha
  - properly specify location of types in package
- v0.0.3-alpha
  - fix css variable names
  - use rems
- v0.0.4-alpha
  - add support for externally specifying a filter
- v0.0.5-alpha
  - fix external filter
- v0.1.0-alpha
  - add full height option which forces the footer to the bottom of the grids parent and will scroll only the grid rows
  - add thead and tbody elements
  - add ability to specify column widths with px, % and \*
  - add page size selection with customizable page size options
- v0.1.1-alpha
  - remove console.log
- v0.1.4-alpha
  - fix import types export
  - update dev dependencies
- v1.0.0
  - Table html structure replaced with css grid for better layout control
  - Full height and full height options removed in favor of css grid to allow for greater layout control in parent application
  - fix order of sorting and filtering in default client data service
- v2.0.0-beta
  - BREAKING: DataGridVue component is now exported as DataGridVueGrid in favor of using a new plugin to ensure proper setup. Plugin registers DataGridVueGrid component globally as dgv-data-grid.
  - Column reordering via drag-and-drop can be enabled on the grid with the allowColumnReorder property. Drag and drop is powered by [dragon-drop-vue](https://www.npmjs.com/package/dragon-drop-vue) and dragon drop global options can be set on the plugin options.
  - Hidden columns are now supported. A popup for users to add/remove columns from the view can be enabled with the showColumnSelection property.
  - Improved page size select styling.
  - Clear filters action
  - Add support for storing grid state in local storage, session storage or server-side with HTTP support similar to using the server-side data service
  - Bugfix for sort index display when more then one column is sorted
- v2.1.0
  - Add css variable for input/select font size
