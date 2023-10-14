<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'grid' }">Grid</router-link>
  </nav>
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
  background-color: rgb(113, 115, 118);
}

body, html, main, #app {
  height: 100vh;
  min-height: 0;
  overflow: hidden;
}

#app {
  display: grid;
  grid-template-columns: 50px auto;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
