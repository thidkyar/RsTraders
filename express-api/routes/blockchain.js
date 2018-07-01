const SHA256      = require('js-sha256');
const express     = require('express');
const router      = express.Router();
const app         = express();

class Block {
  constructor(transactions, previousHash = '') {
    this.timestamp = Date.now();
    this.previousHash = previousHash;
    this.hash = this.hashCalculate();
    this.transactions = transactions; //Need to be array of object
    this.nOnce = 0; //difficulty level
  }
  
  hashCalculate() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nOnce).toString();
  }

  //Crustruct a new block
  mineBlock(difficulty) { 
    let timeCount = Date.now();
    // console.log('Mining block - Start', timeCount );
    //refactor this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    for(let nOnce = 0 ; this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0") ; nOnce++) {
      this.hash = SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + nOnce).toString();
    }
    // console.log('Mining block - Finish',Date.now());
    // console.log('Block mined in: ' + timeCount - Date.now() + 'seconds\n' + this.hash);
  }
}

class BlockChain{
  constructor() {
    this.chain = [new Block([], "0")];
    this.pendingTransactions = [];
    this.difficulty = 1; //Difficulty is how many 0's will have the head of the hash
    this.mineReward = 1; //reward to the bank who confirm or generate the block
  }

  mineTransaction(miningRewardUser){
    let lastBlock = this.chain[this.chain.length - 1];
    console.log('lastBlock.hash',lastBlock.hash);
    let block = new Block(this.pendingTransactions, lastBlock.hash);
    block.mineBlock(this.difficulty);

    this.chain.push(block);
    // console.log('lastBlock.hash',this.chain[this.chain.length - 1].hashCalculate());
    let test = this.chain.length - 1;
    this.chain[test].hash = this.chain[test].hashCalculate();

    this.pendingTransactions = [ new Transaction(null, miningRewardUser, this.miningReward) ];
  }

  addTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfUser(user){
    const amountTotal = {};
    var totalTransactions = [];
    //For to search the blocks
    for(const block of this.chain){
      //For to list the transactions inside the block
      for(const trans of block.transactions){

        if(trans.user_id === user) {
          let tt = {
                  coin_id_from: trans.coin_id_from,
                  coin_value_from: trans.coin_value_from,
                  coin_id_to: trans.coin_id_to,
                  coin_value_to: trans.coin_value_to,
                  date: trans.date
                };
          totalTransactions.push(tt);

          //withdraw coin from
          if(trans.coin_id_from) {
            amountTotal[trans.coin_id_from] = amountTotal[trans.coin_id_from] - trans.coin_value_from;
          }
          //deposit in coin to
          if(!amountTotal[trans.coin_id_to]) {
            amountTotal[trans.coin_id_to] = trans.coin_value_to;
          } else {
            amountTotal[trans.coin_id_to] = amountTotal[trans.coin_id_to] + trans.coin_value_to;
          }
        }
      }
    }
    //clean the coin with 0 of amount
    for(let i = 0; i < Object.keys(amountTotal).length;i++) {
      if(Object.values(amountTotal)[i] === 0 && Object.keys(amountTotal)[i] != 'RST') {
        delete amountTotal[Object.keys(amountTotal)[i]];
      }
    }
    return {'amountTotal': amountTotal, 'totalTransactions': totalTransactions};
  }

  validateChain() {
    //Start in 1 because the previous is the block 0 the first block
    for (let i = 1; i < this.chain.length; i++){

      //Test is the own hash is valid
      if (this.chain[i].hash !== this.chain[i].hashCalculate()) {
        return false;
      }
      //Test the link (chains) between the blocks 
      if (this.chain[i].previousHash !== this.chain[i - 1].hash) {
        return false;
      }
    }

    return true;
  }
}

class Transaction{
  constructor(user_id, coin_id_from, coin_value_from, coin_id_to, coin_value_to, date){
    this.user_id = user_id;
    this.coin_id_from = coin_id_from;
    this.coin_id_to = coin_id_to;
    this.coin_value_from = coin_value_from;
    this.coin_value_to = coin_value_to;
    this.date = date;
  }
}

let RSTCoin = new BlockChain();

// Base web page to login into the system. If the user is login send session to /urls
app.get("/users/:id/balance", (req, res) => {

  //need return this information
  RSTCoin.getBalanceOfUser(req.params.id) // change to body

});

app.post("/users/:id/transaction", (req, res) => {

  RSTCoin.addTransaction(new Transaction(
    req.params.id, //change to body
    req.params.coin_id_from,
    req.params.coin_value_from,
    req.params.coin_id_to,
    req.params.coin_value_to,
    req.params.date
  ));

  RSTCoin.mineTransaction(req.params.id);

  Console.log('The blockchain are valid? ',RSTCoin.validateChain());

});