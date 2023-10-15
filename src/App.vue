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
:root {
  --base-900: #111111;
  --base-800: #222222;
  --base-700: #3a3a3a;
  --base-100: #eeeeee;
}

body, html {
  margin: 0;
  background-color: var(--base-700);
  color: var(--base-100);
}

body, html, main, #app {
  height: 100vh;
  min-height: 0;
  overflow: hidden;
}

#app {
  display: grid;
  grid-template-columns: auto 1fr;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: var(--base-800);
  padding: 0.5rem;
  align-items: center;
  border-right: var(--base-900) solid 1px;
  box-shadow: -3px 0px 20px 0 rgba(255, 255, 255, 0.2);
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

a, a:visited {
  color: var(--base-100);
}

input[type=checkbox],
label:has(input[type=checkbox]) {
  cursor: pointer;
}
</style>
