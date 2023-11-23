# Data Grid Vue

## Release Notes

### v2.4.0
  - `ServerSideStorageService` now has a generic type constraint to allow any type to be used for the user identifier sent in the request to get and set grid state.
  - `ServerSideStorageService.getGridState` and `ServerSideDataService.getPage` will now only try to deserialize the response body as JSON if the status code is `200 OK` and the response `Content-Type` header is `application/json`.
  - Default color values of CSS variables are now defined in hex.
  - Default accent color slightly altered to match documentation site.
  - Documentation site now includes documentation for [DataGridVueDotnet](https://github.com/nruffing/data-grid-vue-dotnet).

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
