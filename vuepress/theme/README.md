# Theme

## HTML Architecture 

`data-grid-vue` is designed with a fairly flat HTML structure and leverages CSS grid to arrange the HTML elements into a data grid. The data grid cells are a sub-grid to allow the data cells to be the scrollable container (i.e. sticky header and footer).

This architecture allows for endless layout possibilities both in the data grid and where the data grid is placed on the page (e.g. full page, half page, etc.). The data grid component works very well inside both flex and grid-based layouts even when they are deeply nested.

Here is a high-level overview of the HTML that gets rendered.

```html
<div class="dgv-data-grid-container">
  <div class="dgv-options-header">...</div>

  <div class="dgv-header-cell">...</div>
  <div class="dgv-header-cell">...</div>
  ...
  <div class="dgv-header-cell">...</div>

  <div class="dgv-filter-options-cell">...</div>
  <div class="dgv-filter-options-cell">...</div>
  ...
  <div class="dgv-filter-options-cell">...</div>

  <div class="dgv-data-grid-body">

    <div class="dgv-data-grid-cell">...</div>
    <div class="dgv-data-grid-cell">...</div>
    ...
    <div class="dgv-data-grid-cell">...</div>
    ...
    <div class="dgv-data-grid-cell">...</div>
    <div class="dgv-data-grid-cell">...</div>

  </div>

  <div class="dgv-footer">...</div>
</div>
```

## CSS Variables

Including the data grid's core styles will come with the CSS variables below.  The below also includes their default values.  The data grid can be themed by adjusting the values of these CSS variables.  The core stylesheet can be loaded using an import statement similar to the following in your `main.ts` file. It is recommended to import it prior to any application stylesheets to be able to properly override the variable values.

```ts
import 'data-grid-vue/style'
```

::: tip Note
Explicitly importing the `data-grid-vue` stylesheet is only required when using the plugin to register the data grid component and dependencies (which is recommended). If importing the data grid component locally to the component where it is used then the stylesheet will automatically come with it. However, you will need to keep in mind the order in which the CSS will be included and in this case you will likely need to override any of the data grid's CSS variables in the [SFC](https://vuejs.org/guide/scaling-up/sfc.html) style block of the local component.
:::

@[code css](@temp/dgvCssVariables.css)
