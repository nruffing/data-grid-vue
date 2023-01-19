<template>
  <div class="dgv-page-navigation">
    <button
      class="dgv-button-first-page"
      @click="setCurrentPage(1)"
      :disabled="currentPage === 1"
      title="First page">      
      <Icon name="first-page" />
    </button>
    <button 
      class="dgv-button-previous-page"
      @click="setCurrentPage(currentPage - 1)"
      :disabled="currentPage === 1"
      title="Previous page">
      <Icon name="previous-page" />
    </button>
    <button 
      class="dgv-button-page"
      :class="{ 'dgv-selected-page': page === currentPage }"
      v-for="page in displayedPages"
      :key="page"
      @click="setCurrentPage(page)"
      :title="'Page ' + page">
      {{ page }}
    </button>
    <button 
      class="dgv-button-next-page"
      @click="setCurrentPage(currentPage + 1)"
      :disabled="currentPage === numPages"
      title="Next page">
      <Icon name="next-page" />
    </button>
    <button 
      class="dgv-button-last-page"
      @click="setCurrentPage(numPages)"
      :disabled="currentPage === numPages"
      title="Last page">
      <Icon name="last-page" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'PageNavigation',
  components: {
    Icon,
  },
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