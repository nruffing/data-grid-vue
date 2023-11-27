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
  * Specific labels for screen readers with additional context leveraging `aria-label` attributes where necessary
  * Keyboard navigation
    * Header cells, header options, filter row cells, add/remove column menu, and page navigation in the footer can be keyboard navigated using the tab key.
    * Header options can be invoked with the space or enter key.
    * Columns can be sorted with the space or enter key when the header cell is focused.
    * Columns can be reordered with the left and right arrow keys when the header cell is focused.
    * Header options can be invoked with the space key when focused.
    * Add/remove column menu is focused when it opens and can be navigated via keyboard using the tab key.