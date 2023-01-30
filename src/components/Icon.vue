<template>
  <svg viewBox="-4 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- First Page-->
    <g v-if="name === 'first-page'" transform="translate(-6, -2)">
      <path d="M19,21 L9.5,12 L19,3 M5,3 L5,21"></path>
    </g>
    <!-- Previous Page -->
    <g v-if="name === 'previous-page'" transform="translate(-6, -2)">
      <polyline points="17.0011615 3 7 12.0021033 17.0011615 21.0042067"></polyline>
    </g>
    <!-- Next Page -->
    <g v-if="name === 'next-page'" transform="translate(-6, -2)">
      <polyline points="7 3 17.0011615 12.0021033 7 21.0042067"></polyline>
    </g>
    <!-- Last Page -->
    <g v-if="name === 'last-page'" transform="translate(-6, -2)">
      <path d="M19,21 L9.5,12 L19,3 M5,3 L5,21" transform="translate(11.750000, 12.000000) scale(-1, 1) translate(-11.750000, -12.000000)"></path>
    </g>
    <!-- Sort Ascending -->
    <g v-if="name === 'sort-ascending'" transform="translate(-10, -9)">
      <line x1="16" y1="26" x2="16" y2="4"></line>
      <polyline points="24.5,18 16,26.5 7.5,18"></polyline>
    </g>
    <!-- Sort Descending -->
    <g v-if="name === 'sort-descending'" transform="translate(-10, -3)">
      <line x1="16" y1="6" x2="16" y2="28"></line>
      <polyline points="7.5,14 16,5.5 24.5,14"></polyline>
    </g>
    
    <!-- Text Value -->
    <g v-if="text" transform="translate(15, 18)">
      <text>{{ text }}</text>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: undefined,
    },
  },
})
</script>
