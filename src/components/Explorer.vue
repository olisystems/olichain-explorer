<template>
<div class="main container">
      <div class="hashes">
        <div v-for="hash in hashes" class="hash" v-bind:key="hash.id">
          <h4 v-on:click="getTxObject(hash)">{{ hash.title }}</h4>
        </div>
        <div class="hash">Total hashes: {{ hashes.length }}</div>
      </div>

      <div class="tx-object">
        <h2>Transaction Object</h2>
        <div v-if="Object.entries(txObject).length">
          <div>title: {{ txObject.title }}</div>
          <div>id: {{ txObject.id }}</div>
        </div>
        <div v-else>No transaction hash selected.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Explorer",
  data() {
    return {
      hashes: [
        { title: "hash 1", id: 1 },
        { title: "hash 2", id: 2 },
        { title: "hash 3", id: 3 },
        { title: "hash 4", id: 4 }
      ],
      txObject: {}
    };
  },
  methods: {
    getTxObject: function(selectedHash) {
      // this.tx = JSON.stringify(selectedItem, null, 2);
      this.txObject = {
        title: selectedHash.title,
        id: selectedHash.id
      };
      //console.log(e.target.innerHTML);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main {
  padding: 2rem;
  display: flex;
  flex: 1;
  padding-bottom: 2rem;
}

.container {
  margin: 0 auto;
  width: 1100px;
}

.hashes {
  flex: 3;
  }

.tx-object{
  display: flex;
  flex: 2;
  flex-direction: column;
  background-color: #ffffff;
  /* background-color: #e0edf4; */
  color: #3e5252;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.08);
  padding: 0.5rem;
  padding-left: 2rem;
  margin: 0.5rem;
  overflow: auto;
}

.tx-object > h2{
  font-size: 1.25rem;
  text-transform: uppercase;
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
}

.hash{
  display: flex;
  flex-flow: row nowrap;
  overflow: auto;
  padding: 0.5rem;
  padding-left: 2rem;
  margin: 0.5rem;
  background-color: #e0edf4;
  color: #3e5252;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.08);
  cursor: pointer;
}

</style>
