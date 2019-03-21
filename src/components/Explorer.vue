<template>
  <div class="main container">
    <div class="holder">
      <form @submit.prevent="transactionsByAccount">
        <input
          type="text"
          placeholder="Enter smart contract address..."
          autofocus
          v-model="address"
        >
      </form>
      <div>
        <h5>{{address}}</h5>
      </div>
    </div>

    <div class="hashes">
      <div v-for="hash in hashes" class="hash" v-bind:key="hash.id">
        <!-- <h4 v-on:click="getTxObject(hash)">{{ hash.title }}</h4> -->
        <h4 v-on:click="getTxObject(hash)">{{ hash.from }}</h4>
      </div>
      <div class="hash">Total hashes: {{ hashes.length }}</div>
    </div>

    <div class="tx-object">
      <h2>Transaction Object</h2>
      <div v-if="Object.entries(txObject).length">
        <div>Block Hash: {{ txObject.blockHash}}</div>
        <div>Block Number: {{ txObject.blockNumber}}</div>
        <div>Chain Id: {{ txObject.chainId}}</div>
        <div>Condition: {{ txObject.condition}}</div>
        <div>Creates: {{ txObject.creates}}</div>
        <div>From: {{ txObject.from}}</div>
        <div>Gas: {{ txObject.gas}}</div>
        <div>Gas Price: {{ txObject.gasPrice}}</div>
        <div>Input: {{ txObject.input}}</div>
        <div>Nonce: {{ txObject.nonce}}</div>
        <div>Public Key: {{ txObject.publicKey}}</div>
        <div>R: {{ txObject.r}}</div>
        <div>Raw: {{ txObject.raw}}</div>
        <div>S: {{ txObject.s}}</div>
        <div>StandardV: {{ txObject.standardV}}</div>
        <div>To: {{ txObject.to}}</div>
        <div>Transaction Index: {{ txObject.transactionIndex}}</div>
        <div>V: {{ txObject.v}}</div>
        <div>Value: {{ txObject.value}}</div>
      </div>
      <div v-else>No transaction hash selected.</div>
    </div>
  </div>
</template>

<script>
// import getTxsByAccount from "../assets/js/script.js";
// import test from "../assets/js/script.js";
export default {
  name: "Explorer",
  data() {
    return {
      hashes: hashesArray,
      address: "",
      txObject: {}
    };
  },
  methods: {
    getTxObject: function(selectedHash) {
      // this.tx = JSON.stringify(selectedItem, null, 2);
      this.txObject = {
        blockHash: selectedHash.to,
        blockNumber: selectedHash.from,
        chainId: selectedHash.chainId,
        condition: selectedHash.condition,
        creates: selectedHash.creates,
        from: selectedHash.from,
        gas: selectedHash.gas,
        gasPrice: selectedHash.gasPrice,
        input: selectedHash.input,
        nonce: selectedHash.nonce,
        publicKey: selectedHash.publicKey,
        r: selectedHash.r,
        raw: selectedHash.raw,
        s: selectedHash.s,
        standardV: selectedHash.standardV,
        to: selectedHash.to,
        transactionIndex: selectedHash.transactionIndex,
        v: selectedHash.v,
        value: selectedHash.value
      };
      //console.log(e.target.innerHTML);
    },

    transactionsByAccount() {
      console.log(this.hashes);
      getTxsByAccount(this.address);
      this.address = "";
    }
  }
};

// setting up the provider
const Web3 = require("web3");
//const web3 = new Web3("ws://85.214.224.112:8547");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://85.214.224.112:8547")
);
const $ = require("jquery");

async function getTxsByAccount(
  contractAddress,
  startBlockNumber,
  endBlockNumber
) {
  // check endBlockNumber is null
  if (endBlockNumber == null) {
    endBlockNumber = await web3.eth.getBlockNumber();
  }
  // check startBlockNumber
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 3;
  }
  //console.log("Searching for transactions from account " + contractAddress + " within blocks " + startBlockNumber + " and " + endBlockNumber);
  // loop through the blocks to get block transactions
  for (let i = startBlockNumber; i <= endBlockNumber; i++) {
    /*
     * If true, the returned block will contain all transactions as objects
     * if false it will only contains the transaction hashes
     * var block = await web3.eth.getBlock(i, true);
     */
    let block = await web3.eth.getBlock(i, true);
    // filter out empty blocks
    if (block.transactions.length != 0) {
      block.transactions.forEach(tx => {
        // filter out transactions for a specific smart contract
        if (contractAddress == tx.to) {
          hashesArray.push(tx);
        }
      });
    }
  }
}
let hashesArray = [];
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

.tx-object {
  display: flex;
  flex: 2;
  flex-direction: column;
  /* background-color: #e0edf4; */
  color: #3e5252;
  padding: 0.5rem;
  padding-left: 2rem;
  margin: 0.5rem;
  overflow: auto;
}

.tx-object > h2 {
  font-size: 1.25rem;
  text-transform: uppercase;
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
}

.hash {
  display: flex;
  flex-flow: row nowrap;
  overflow: auto;
  padding: 0.5rem;
  padding-left: 2rem;
  margin: 0.5rem;
  background-color: #e0edf4;
  color: #3e5252;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
</style>
