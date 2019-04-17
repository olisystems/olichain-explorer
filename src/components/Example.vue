<template>
  <div id="app"></div>
</template>

<script>
import test from "../assets/js/test.js";
// setting up the provider
const Web3 = require("web3");
//const web3 = new Web3("ws://85.214.224.112:8547");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://85.214.224.112:8547")
);
const $ = require("jquery");
let block;
export default {
  name: "Example",
  data() {
    return {
      accounts: [],
      address: "0xB35ade92c443B3b111ddA47C6af8872110fB7a03",
      lastAddress: "",
      accountTransactionsArray: [],
      accountTitle: "",
      hashTitle: "",
      txObject: {},
      functionHash: "",
      hashValue: "",
      days: 3,
      daysBlock: 2,
      hashesArray: []
    };
  },
  methods: {
    hello: async function(contractAddress, numberX) {
      let endBlockNumber = await web3.eth.getBlockNumber();
      let startBlockNumber = endBlockNumber - numberX;
      // loop through the blocks to get block transactions
      for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        /*
         * If true, the returned block will contain all transactions as objects
         * if false it will only contains the transaction hashes
         * var block = await web3.eth.getBlock(i, true);
         */
        block = await web3.eth.getBlock(i, true);
      }
      console.log(block);
    },
    hh: function() {
      this.days = 3;
      this.daysBlock = 5;
      this.hello(this.address, this.daysBlock);
      this.lastAddress = this.address;
      /*
       * empty account title and account's transaction array
       * for every new search
       */
      this.accountTitle = "";
      this.accountTransactionsArray = [];
      this.txObject = {};
      this.hashTitle = "";
      this.tt();
    },

    tt: function() {
      console.log(block);
      if (block.transactions.length != 0) {
        console.log("eee");
        block.transactions.forEach(tx => {
          // filter out transactions for a specific smart contract
          if (this.address == tx.to) {
            hashesArray.push(tx);
            if (accounts.indexOf(tx.from) === -1) {
              accounts.push(tx.from);
            }
          }
        });
        console.log(this.accounts);
      }
    }
  },
  created: function() {
    this.hh();
    //this.tt();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
