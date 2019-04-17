<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <div class="title">
          <h1>OLI Chain Explorer</h1>
        </div>
        <form class="search-bar" @submit.prevent="getAccounts">
          <input type="text" placeholder="Search for hashes" required v-model="address">
          <input type="submit" value="Search" class="btn">
        </form>
        <div class="day-picker">
          <button class="increement" v-on:click="inc">+</button>
          <p>Days: {{days}}</p>
          <button class="increement" v-on:click="dec">-</button>
        </div>
      </div>
    </div>
    <div class="main-body">
      <div class="graph">
        <h3>{{hashes.length}} Transactions found within {{blocksPerDay}} blocks from last {{days}} days.</h3>
      </div>
      <div class="main container">
        <div class="accounts">
          <div class="search-results overflow-text">
            Found {{ accounts.length }} results for the contract
            <em>{{lastAddress}}.</em>
          </div>

          <div class="main-column account-title">
            <h2>Account Address</h2>
            <div v-for="(account, index) in accounts" class="account" v-bind:key="index">
              <!-- <h4 v-on:click="getTxObject(hash)">{{ hash.title }}</h4> -->
              <h4 v-on:click="getAccountHashes" class="overflow-text">{{ account }}</h4>
            </div>
          </div>
        </div>

        <div class="tx-hashes" v-if="accounts.length">
          <div class="search-results overflow-text">
            Found {{ accountHashes.length }} results for the account
            <em>{{accountTitle}}.</em>
          </div>
          <div class="main-column hash-list">
            <h2>Hashes</h2>
            <div v-if="accountHashes.length" class="hash-list-div">
              <h4
                v-on:click="getTxObject"
                class="overflow-text"
                v-for="(accountHashe, index) in accountHashes"
                v-bind:key="index"
              >{{accountHashe.hash}}</h4>
            </div>
            <div v-else>No account selected.</div>
          </div>
        </div>

        <div class="tx-object" v-if="accountHashes.length">
          <div class="search-results overflow-text">
            Showing results for
            <em>{{hashTitle}}.</em>
          </div>
          <div class="main-column tx-object-details">
            <h2>Transaction Object</h2>
            <div v-if="Object.entries(txObject).length">
              <div class="hash-object-div overflow-text">
                Time:
                <span>{{ txObject.time}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Hash:
                <span>{{ txObject.hash}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Block Number:
                <span>{{ txObject.blockNumber}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Chain Id:
                <span>{{ txObject.chainId}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                From:
                <span>{{ txObject.from}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Gas:
                <span>{{ txObject.gas}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Gas Price:
                <span>{{ txObject.gasPrice}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Input:
                <span>{{ txObject.input}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Nonce:
                <span>{{ txObject.nonce}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Public Key:
                <span>{{ txObject.publicKey}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                R:
                <span>{{ txObject.r}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                Raw:
                <span>{{ txObject.raw}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                S:
                <span>{{ txObject.s}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                StandardV:
                <span>{{ txObject.standardV}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                To:
                <span></span>
                {{ txObject.to}}
              </div>
              <div class="hash-object-div overflow-text">
                Transaction Index:
                <span>{{ txObject.transactionIndex}}</span>
              </div>
              <div class="hash-object-div overflow-text">
                V:
                <span>{{ txObject.v}}</span>
              </div>
              <div class="hash-object-div overflow-text last">
                Value:
                <span>{{ txObject.value}}</span>
              </div>
              <div class="hash-stat">
                The function hash for the selected hash is
                <span
                  class="hash-stat-span"
                >{{ functionHash}}</span> and value is
                <span class="hash-stat-span">{{ hashValue}}</span>.
              </div>
            </div>
            <div v-else>No transaction hash selected.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = require("jquery");
const Web3 = require("web3");
// setting up the provider
//const web3 = new Web3("ws://85.214.224.112:8547");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://85.214.224.112:8547")
);

export default {
  name: "Explorer",
  data() {
    return {
      accounts: [],
      address: "0xB35ade92c443B3b111ddA47C6af8872110fB7a03",
      lastAddress: "",
      accountTitle: "",
      hashes: [],
      hashTitle: "",
      txObject: {},
      accountHashes: [],
      transactionObjects: [],
      functionHash: "",
      hashValue: "",
      days: 3,
      blocksPerDay: 2
    };
  },
  methods: {
    searchContract: async function(contractAddress, numberX) {
      let endBlockNumber = await web3.eth.getBlockNumber();
      let startBlockNumber = endBlockNumber - numberX;
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
              this.hashes.push(tx);
              this.transactionObjects.push({
                hash: tx.hash,
                time: block.timestamp,
                blockHash: tx.to,
                blockNumber: tx.blockNumber,
                chainId: tx.chainId,
                // condition: x.condition,
                // creates: x.creates,
                from: tx.from,
                gas: tx.gas,
                gasPrice: tx.gasPrice,
                input: tx.input,
                nonce: tx.nonce,
                publicKey: tx.publicKey,
                r: tx.r,
                raw: tx.raw,
                s: tx.s,
                standardV: tx.standardV,
                to: tx.to,
                transactionIndex: tx.transactionIndex,
                v: tx.v,
                value: tx.value
              });
              // check if address already exists in array
              if (this.accounts.indexOf(tx.from) === -1) {
                this.accounts.push(tx.from);
              }
            }
          });
        }
      }
    },
    getAccounts: function() {
      this.hashes = [];
      this.accounts = [];
      this.days = 3;
      this.blocksPerDay = 5;
      this.searchContract(this.address, this.blocksPerDay);
      this.lastAddress = this.address;
      /*
       * empty account title and account's transaction array
       * for every new search
       */
      this.accountTitle = "";
      this.accountHashes = [];
      this.txObject = {};
      this.hashTitle = "";
    },
    // get tx hashes for a particlar account
    getAccountHashes: function() {
      this.accountHashes = [];
      this.hashes.forEach(hash => {
        if (hash.from === event.target.innerHTML) {
          // create a new empty array and push accountHashes
          this.accountHashes.push(hash);
          this.accountTitle = event.target.innerHTML;
        }
      });
    },
    /*
     * display all hashes selected account from the above function
     * get tx object for selected hash
     * modify the getTxObject method: instead of passing parameter, use event.target.innerHTML
     * to compare with the array hashes accountHashes from above function
     */

    getTxObject: async function() {
      this.transactionObjects.forEach(txObj => {
        //seeg(x.blockNumber);
        if (txObj.hash === event.target.innerHTML) {
          // this.tx = JSON.stringify(selectedItem, null, 2);
          this.txObject = {
            hash: txObj.hash,
            time: txObj.time,
            blockHash: txObj.to,
            blockNumber: txObj.blockNumber,
            chainId: txObj.chainId,
            // condition: x.condition,
            // creates: x.creates,
            from: txObj.from,
            gas: txObj.gas,
            gasPrice: txObj.gasPrice,
            input: txObj.input,
            nonce: txObj.nonce,
            publicKey: txObj.publicKey,
            r: txObj.r,
            raw: txObj.raw,
            s: txObj.s,
            standardV: txObj.standardV,
            to: txObj.to,
            transactionIndex: txObj.transactionIndex,
            v: txObj.v,
            value: txObj.value
          };
          this.hashTitle = event.target.innerHTML;
        }
      });

      // getting function hash
      this.functionHash = this.txObject.input.slice(2, 10);
      // getting value sent
      this.hashValue = web3.utils.toDecimal(
        "0x" +
          this.txObject.input.slice(
            this.txObject.input.length - 6,
            this.txObject.input.length
          )
      );
      // slicing the long values
      // Object.keys(this.txObject).map(k => {
      //   if (this.txObject[k].length > 20) {
      //     this.txObject[k] = this.txObject[k].slice(0, 30) + "....";
      //   }
      // });
    },
    inc: function() {
      this.days++;
      this.blocksPerDay += 2;
      this.hashes = [];
      this.transactionObjects = [];
      this.searchContract(this.address, this.blocksPerDay);
    },
    dec: function() {
      this.days--;
      this.blocksPerDay -= 2;
      this.hashes = [];
      this.transactionObjects = [];
      this.searchContract(this.address, this.blocksPerDay);
      if (this.days <= 3) {
        this.days = 3;
        this.blocksPerDay = 5;
      }
    }
  },
  // default search on page load
  created: function() {
    this.getAccounts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main-body {
  display: flex;
  flex-direction: column;
}

.main-body h3 {
  padding: 2rem;
}
.main {
  padding: 2rem;
  display: flex;
  padding-bottom: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  color: #3e5252;
}

.accounts,
.tx-hashes,
.tx-object {
  width: 30%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.main-column {
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.account-title {
  background-color: #c0dbe2;
}
.hash-list {
  background-color: #cdf1c3;
}
.hash-list-div {
  max-height: 396px;
  overflow-y: auto;
}

::-webkit-scrollbar {
  display: none;
}
.overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tx-object-details {
  background-color: #ccb9da;
}

h2 {
  font-size: 1.25rem;
  text-transform: uppercase;
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
}

h4 {
  cursor: pointer;
}

.hash-object-div {
  font-weight: bold;
}

.last {
  padding-bottom: 1rem;
}

.hash-stat {
  padding-top: 1rem;
  border-top: 2px solid black;
}

span {
  font-weight: normal;
}

.day-picker {
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  font-size: 1.5em;
}

.increement {
  /* border: 2px solid #f5f5f5; */
  border: none;
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  background-color: #154360;
  color: #f5f5f5;
  font-weight: bold;
  padding: 0.5em;
  cursor: pointer;
}

button:focus {
  outline: none;
}
@media (max-width: 950px) {
  h2 {
    text-align: center;
    font-size: 14px;
  }
  .main-column {
    font-size: 12px;
  }
}
@media (max-width: 700px) {
  .header {
    padding: 1rem 0;
  }

  .main {
    padding: 2rem;
    flex-direction: column;
  }

  .accounts,
  .tx-hashes,
  .tx-object {
    padding: 1rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: auto;
    text-align: center;
  }

  .main-column {
    padding: 2rem;
    font-size: 14px;
  }

  .tx-object {
    text-align: left;
  }

  .title {
    padding-bottom: 2rem;
  }

  .title > h1 {
    font-size: 2rem;
    margin: -7px 0 0 4px;
  }

  .search-bar > input[type="text"] {
    flex-basis: 100%;
  }

  .search-results {
    padding-bottom: 2rem;
  }

  h2 {
    text-align: center;
  }

  div.test > p {
    font-size: 12px;
  }
}

h4:hover {
  color: orange;
}
</style>
