<template>
  <div id="app">
    <Header/>
    <Explorer/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Explorer from "./components/Explorer.vue";

export default {
  name: "app",
  components: {
    Header,
    Explorer
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  font-family: "Open Sans", sans-serif;
  background-color: #f3f3f3;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
}
</style>
