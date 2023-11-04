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