
import accounts from '../../components/Explorer.vue';
// setting up the provider
const Web3 = require("web3");
//const web3 = new Web3("ws://85.214.224.112:8547");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://85.214.224.112:8547")
);

let block;
let hashesArray = [];
let accountsArray = [];
export default async function getTxsByAccount(contractAddress, numberX) {
  // // check endBlockNumber is null
  // if (endBlockNumber == null) {
  //   endBlockNumber = await web3.eth.getBlockNumber();
  // }
  // // check startBlockNumber
  // if (startBlockNumber == null) {
  //   startBlockNumber = endBlockNumber - 3;
  // }

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
    // filter out empty blocks
    if (block.transactions.length != 0) {
      block.transactions.forEach(tx => {
        // filter out transactions for a specific smart contract
        if (contractAddress == tx.to) {
          hashesArray.push(tx);
          if (accountsArray.indexOf(tx.from) === -1) {
            accounts.push(tx.from);
          }
        }
      });
    }
  }
}



