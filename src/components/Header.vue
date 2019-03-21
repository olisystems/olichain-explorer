<template>
  <div id="container">
    <div class="header">
      <div class="container">
        <div class="title">
          <h1>OLI Chain Explorer</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header {
  padding: 1rem 2rem;
  flex: 0;
  background-color: #154360;
}

.title {
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 2rem 0 1rem;
}

.title > h1 {
  font-size: 2rem;
  color: white;
  margin: -9px 0 0 6px;
  text-align: center;
}
</style>
