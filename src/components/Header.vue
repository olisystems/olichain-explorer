<template>
  <div id="container">
    <!-- <div class="header">
      <div class="container">
        <div class="title">
          <h1>OLI Chain Explorer</h1>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import Explorer from "./Explorer.vue";
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
.search-bar {
  flex: 0 0 auto;
  border-left: 0;
  border-right: 0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.search-bar > input {
  border-radius: 2px;
}

.search-bar > input[type="text"] {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex-basis: 50%;
  max-width: 450px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e9e9e9;
  border-right: none;
}

.search-bar > input[type="submit"] {
  background-color: #fdd922;
  color: #333333;
  padding: 1rem;
  border: 1px solid #e0bc27;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
}
.search-results {
  padding-bottom: 1rem;
}

.search-results,
.search-term {
  font-style: italic;
}

.header p {
  font-size: 0.8em;
  color: white;
  text-align: center;
}

.test {
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  text-align: center;
}

.btn {
  background-color: #108bea;
  border-radius: 2px;
  color: white;
  user-select: none;
  border: none;
  cursor: pointer;
  opacity: 1;
}

.btn:hover {
  background-color: #0f6cb2;
}

.btn:active {
  opacity: 0.8;
}
</style>
