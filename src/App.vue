<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route: (to, from) => {
      console.log(to)
    }
  }
}
</script>

<style>
#app {

}
</style>
