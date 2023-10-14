<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',  
})
</script>

<style>
body, html {
  margin: 0;
  background-color: rgb(40, 69, 97);
}

body, html, main, #app {
  height: 100vh;
  min-height: 0;
  overflow: hidden;
}

main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  height: calc(100% - 40px);
}

.custom-filter {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
}
</style>
