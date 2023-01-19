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
  },
})
</script>