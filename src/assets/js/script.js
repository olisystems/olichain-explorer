// setting up the provider
const Web3 = require("web3");
//const web3 = new Web3("ws://85.214.224.112:8547");
const web3 = new Web3(
    new Web3.providers.WebsocketProvider("ws://85.214.224.112:8547")
);
const $ = require("jquery");

export default async function getTxsByAccount(
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
                    test.push(tx);
                }
            });
        }
    }
}

let test = [];
