<img src="./vuepress/docs/.vuepress/public/favicon.svg" width="100" style="margin: 15px 0;" />

# Data Grid Vue

Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.

[Documentation](https://github.com/nruffing/data-grid-vue/blob/main/vuepress/docs/README.md)

[NPM](https://www.npmjs.com/package/data-grid-vue)

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
