<template>
  <div id="app" class="wrapper">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
  .wrapper {
    min-height: 100%;
    padding-bottom: 50px;
  }
</style>
