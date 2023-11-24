<template>
  <ParentLayout>
    <template #navbar-before>
      <div class="github-buttons">
        <GithubButton
          href="https://github.com/sponsors/nruffing"
          data-color-scheme="no-preference: light; light: light; dark: light;"
          data-icon="octicon-heart"
          data-size="large"
          aria-label="Sponsor @nruffing on GitHub"
        >
          Sponsor
        </GithubButton>
        <GithubButton
          href="https://github.com/nruffing/data-grid-vue"
          data-color-scheme="no-preference: light; light: light; dark: light;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star nruffing/data-grid-vue on GitHub"
        >
          Star
        </GithubButton>
      </div>
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import ParentLayout from '../../node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue'

// https://buttons.github.io/
import GithubButton from 'vue-github-button'
</script>
