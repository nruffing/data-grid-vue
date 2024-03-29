<template>
  <div class="dgv-page-navigation">
    <button
      class="dgv-button-first-page"
      @click="setCurrentPage(1)"
      :disabled="currentPage === 1"
      title="First page"
      aria-label="Go to first page"
    >
      <Icon name="first-page" />
    </button>
    <button
      class="dgv-button-previous-page"
      @click="setCurrentPage(currentPage - 1)"
      :disabled="currentPage === 1"
      title="Previous page"
      aria-label="Go to previous page"
    >
      <Icon name="previous-page" />
    </button>
    <button
      class="dgv-button-page"
      :class="{ 'dgv-selected-page': page === currentPage }"
      v-for="page in displayedPages"
      :key="page"
      @click="setCurrentPage(page)"
      :title="'Page ' + page"
      :aria-label="page === currentPage ? `Page ${page}. This is the current page.` : `Go to page ${page} of ${numPages}`"
    >
      {{ page }}
    </button>
    <button
      class="dgv-button-next-page"
      @click="setCurrentPage(currentPage + 1)"
      :disabled="currentPage === numPages"
      title="Next page"
      aria-label="Go to next page"
    >
      <Icon name="next-page" />
    </button>
    <button
      class="dgv-button-last-page"
      @click="setCurrentPage(numPages)"
      :disabled="currentPage === numPages"
      title="Last page"
      aria-label="Go to last page"
    >
      <Icon name="last-page" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

/**
 * @group Components
 * @description The page navigation in the grids footer.
 */
export default defineComponent({
  name: 'PageNavigation',
  components: {
    Icon,
  },
  props: {
    /**
     * @description The current page size.
     */
    pageSize: {
      type: Number,
      required: true,
    },

    /**
     * @description The current page number starting with `1` for the first page.
     */
    currentPage: {
      type: Number,
      required: true,
    },

    /**
     * @description The total number of items in the grid after all filter conditions
     * have been applied.
     */
    totalItems: {
      type: Number,
      required: true,
    },
  },
  emits: {
    /**
     * @group emits
     * @description Event emitted when the page changes.
     * @param page The new page number.
     */
    'update:currentPage'(page: number): boolean {
      return true
    },
  },
  computed: {
    numPages(): number {
      return Math.ceil(this.totalItems / this.pageSize)
    },
    displayedPages(): number[] {
      const maxPages = 4
      const halfMax = maxPages / 2

      if (this.numPages <= maxPages) {
        return [...Array(this.numPages).keys()].map(i => i + 1)
      }

      let start = this.currentPage - halfMax + 1
      if (start <= 0) {
        start = 1
      }

      const result = []

      for (let i = start, index = 0; index < maxPages && i <= this.numPages; i++, index++) {
        result.push(i)
      }

      while (result.length < maxPages) {
        start--
        result.unshift(start)
      }

      return result
    },
  },
  methods: {
    setCurrentPage(page: number) {
      this.$emit('update:currentPage', page)
    },
  },
})
</script>
