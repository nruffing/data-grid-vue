<template>
  <svg viewBox="-4 0 20 20" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
    <!-- Filter -->
    <g v-if="name === 'filter'" transform="scale(.65) translate(-3, 4)">
      <path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z"></path>
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
