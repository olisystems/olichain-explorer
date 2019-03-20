<template>
  <div id="app">
    <Header />
    <Explorer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Explorer from "./components/Explorer.vue";

export default {
  name: 'app',
  components: {
    Header,
    Explorer
  }
}
</script>

<style>

</style>
