<template>
  <div class="dgv-page-navigation">
    <button
      class="dgv-button-first-page"
      @click="setCurrentPage(1)"
      :disabled="currentPage === 1">
      First
    </button>
    <button 
      class="dgv-button-previous-page"
      @click="setCurrentPage(currentPage - 1)"
      :disabled="currentPage === 1">
      Previous
    </button>
    <button 
      class="dgv-button-page"
      :class="{ 'dgv-selected-page': page === currentPage }"
      v-for="page in displayedPages"
      :key="page"
      @click="setCurrentPage(page)">
      {{ page  }}
    </button>
    <button 
      class="dgv-button-next-page"
      @click="setCurrentPage(currentPage + 1)"
      :disabled="currentPage === numPages">
      Next
    </button>
    <button 
      class="dgv-button-last-page"
      @click="setCurrentPage(numPages)"
      :disabled="currentPage === numPages">
      Last
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageNavigation',
  props: {
    pageSize: {
      type: Number,
      required: true
    },      
    currentPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
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
        return [...Array(this.numPages).keys()].map(i => i+1)
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