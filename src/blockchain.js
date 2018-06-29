const SHA256 = require('js-sha256');

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
    console.log('Mining block - Start', timeCount );
    //refactor this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    for(let nOnce = 0 ; this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0") ; nOnce++) {
      // this.hash = this.hashCalculate();
      this.hash = SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + nOnce).toString();
    }
    console.log('Mining block - Finish',Date.now());
    console.log('Block mined in: ' + timeCount - Date.now() + 'seconds\n' + this.hash);
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
    console.log('lastBlock.hash',this.chain[this.chain.length - 1].hashCalculate());
    let test = this.chain.length - 1;
    this.chain[test].hash = this.chain[test].hashCalculate();

    this.pendingTransactions = [ new Transaction(null, miningRewardUser, this.miningReward) ];
  }

  addTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfUser(user){
    let amount = 0;
    //For to search the blocks
    for(const block of this.chain){
      //For to list the transactions inside the block
      for(const trans of block.transactions){

        if(trans.fromUser === user){
          amount -= trans.amount;
        }

        if(trans.toUser === user){
          amount += trans.amount;
        }
      }
    }
    return amount;
  }

  validateChain() {
    //Start in 1 because the previous is the block 0 the first block
    for (let i = 1; i < this.chain.length; i++){
      console.log('1',this.chain.length);
      console.log(this.chain[i].hash);
      console.log(this.chain[i].hashCalculate());
      console.log('2');
      console.log(this.chain[i - 1].hash);
      console.log(this.chain[i].previousHash);

      //Test is the own hash is valid
      if (this.chain[i].hash !== this.chain[i].hashCalculate()) {
        console.log('1');
        return false;
      }
      //Test the link (chains) between the blocks 
      if (this.chain[i].previousHash !== this.chain[i - 1].hash) {
        console.log('2');
        return false;
      }
    }

    return true;
  }
}

class Transaction{
  constructor(fromUser, toUser, amount){
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.amount = amount;
  }
}
 
let user1 = '0Rafael'
let user2 = '0Juliana'

let RSTCoin = new BlockChain();

RSTCoin.addTransaction(new Transaction(null, user1, 1000));
RSTCoin.addTransaction(new Transaction(null, user2, 1000));
RSTCoin.addTransaction(new Transaction(user2, user1, 50));
RSTCoin.addTransaction(new Transaction(user1, user2, 100));
RSTCoin.addTransaction(new Transaction(user2, user1, 50));
RSTCoin.addTransaction(new Transaction(user1, user2, 100));
RSTCoin.addTransaction(new Transaction(user2, user1, 50));
RSTCoin.addTransaction(new Transaction(user1, user2, 100));
RSTCoin.addTransaction(new Transaction(user1, user2, 100));
RSTCoin.addTransaction(new Transaction(user2, user1, 50));
RSTCoin.addTransaction(new Transaction(user2, user1, 50));
RSTCoin.addTransaction(new Transaction(user2, user1, 50));

console.log(RSTCoin.mineTransaction(user1));

console.log(RSTCoin.getBalanceOfUser(user1));

console.log(RSTCoin.validateChain());