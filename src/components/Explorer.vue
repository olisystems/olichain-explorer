<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <div class="title">
          <h1>OLI Chain Explorer</h1>
        </div>
        <form class="search-bar" @submit.prevent="transactionsByAccount">
          <input type="text" placeholder="Search for hashes" required v-model="address">
          <input type="submit" value="Search" class="btn">
        </form>
        <p>
          Enter
          <em>smart contract's</em> address
        </p>
      </div>
    </div>
    <div class="main container">
      <div class="hashes">
        <div class="search-results">
          Found {{ hashes.length }} results for the contract
          <em>{{lastAddress}}.</em>
        </div>
        <div v-for="hash in hashes" class="hash" v-bind:key="hash.id">
          <!-- <h4 v-on:click="getTxObject(hash)">{{ hash.title }}</h4> -->
          <h4 v-on:click="getTxObject(hash)">{{ hash }}</h4>
        </div>
      </div>

      <div class="tx-object">
        <h2>Transaction Object</h2>
        <div v-if="Object.entries(txObject).length">
          <div class="hash-object-div">
            Block Hash:
            <span>{{ txObject.blockHash}}</span>
          </div>
          <div class="hash-object-div">
            Block Number:
            <span>{{ txObject.blockNumber}}</span>
          </div>
          <div class="hash-object-div">
            Chain Id:
            <span>{{ txObject.chainId}}</span>
          </div>
          <!-- <div>Condition: {{ txObject.condition}}</div>
          <div>Creates: {{ txObject.creates}}</div>-->
          <div class="hash-object-div">
            From:
            <span>{{ txObject.from}}</span>
          </div>
          <div class="hash-object-div">
            Gas:
            <span>{{ txObject.gas}}</span>
          </div>
          <div class="hash-object-div">
            Gas Price:
            <span>{{ txObject.gasPrice}}</span>
          </div>
          <div class="hash-object-div">
            Input:
            <span>{{ txObject.input}}</span>
          </div>
          <div class="hash-object-div">
            Nonce:
            <span>{{ txObject.nonce}}</span>
          </div>
          <div class="hash-object-div">
            Public Key:
            <span>{{ txObject.publicKey}}</span>
          </div>
          <div class="hash-object-div">
            R:
            <span>{{ txObject.r}}</span>
          </div>
          <div class="hash-object-div">
            Raw:
            <span>{{ txObject.raw}}</span>
          </div>
          <div class="hash-object-div">
            S:
            <span>{{ txObject.s}}</span>
          </div>
          <div class="hash-object-div">
            StandardV:
            <span>{{ txObject.standardV}}</span>
          </div>
          <div class="hash-object-div">
            To:
            <span></span>
            {{ txObject.to}}
          </div>
          <div class="hash-object-div">
            Transaction Index:
            <span>{{ txObject.transactionIndex}}</span>
          </div>
          <div class="hash-object-div">
            V:
            <span>{{ txObject.v}}</span>
          </div>
          <div class="hash-object-div">
            Value:
            <span>{{ txObject.value}}</span>
          </div>
          <div class="hash-stat">
            The function hash for the selected hash is
            <span class="hash-stat-span">{{ functionHash}}</span> and value is
            <span class="hash-stat-span">{{ hashValue}}</span>.
          </div>
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
      hashes: [],
      address: "0xB35ade92c443B3b111ddA47C6af8872110fB7a03",
      lastAddress: "",
      txObject: {},
      functionHash: "",
      hashValue: ""
    };
  },
  methods: {
    getTxObject: function(selectedHash) {
      // this.tx = JSON.stringify(selectedItem, null, 2);
      this.txObject = {
        blockHash: selectedHash.to,
        blockNumber: selectedHash.blockNumber,
        chainId: selectedHash.chainId,
        // condition: selectedHash.condition,
        // creates: selectedHash.creates,
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
      // getting function hash
      this.functionHash = this.txObject.input.slice(2, 10);
      // getting value sent
      this.hashValue = Number(
        "0x" +
          this.txObject.input.slice(
            this.txObject.input.length - 6,
            this.txObject.input.length
          )
      );
      // slicing the long values
      Object.keys(this.txObject).map(k => {
        if (this.txObject[k].length > 20) {
          this.txObject[k] = this.txObject[k].slice(0, 30) + "....";
        }
      });
    },
    transactionsByAccount: function() {
      hashesArray = [];
      accountsArray = [];
      this.hashes = accountsArray;
      getTxsByAccount(this.address);
      this.lastAddress = this.address;
      //this.address = "";
    }
  },
  // default search on page load
  created: function() {
    this.transactionsByAccount();
  }
};

// setting up the provider
const Web3 = require("web3");
//const web3 = new Web3("ws://85.214.224.112:8547");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://85.214.224.112:8547")
);
const $ = require("jquery");

let hashesArray = [];
let accountsArray = [];
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
    startBlockNumber = endBlockNumber - 15;
  }
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
          accountsArray.indexOf(tx.from) === -1 ? accountsArray.push(tx.from) : console.log("This item already exists");
        }
      });
    }
  }
}
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
  /* background-color: #ffffff; */
  color: #3e5252;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
.hash-object-div {
  font-weight: bold;
}
span {
  font-weight: normal;
}
.hash-stat-span {
  font-weight: bold;
  font-style: italic;
}
.hash-stat {
  padding-top: 1rem;
  border-top: 2px solid black;
}
</style>
