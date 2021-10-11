var Web3 = require('web3')
var Tx = require('ethereumjs-tx').Transaction
var Common = require('ethereumjs-common').default
var request = require('request')

var config = require('./config')
var ABI = require('./ABI')

var web3 = new Web3(config.rpcUrl)
var lotteryContract = new web3.eth.Contract(ABI, config.lotteryContractAddress)

// Retrieve current BNB to USD rate from Coingecko (free API) - this is a fixed URL so I don't move it to config
request.get({url: `https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`}, (err, response, body) => {
  if (err) {
    console.log('There was a problem retrieving the current BNB to USD rate')
    return
  }

  // Parse response and setup new ticket price
  let price = JSON.parse(body).binancecoin.usd
  let formattedPrice = `${(10 * (1.0 / parseFloat(price))).toFixed(8)}` // Can use something like formattedPrice = '0.1' for testing here if the real price is too high

  let newTicketPrice = web3.utils.toHex(web3.utils.toWei(formattedPrice, 'ether'))

  // Draw current lottery and initialize the new one with the actual ticket price
  web3.eth.getTransactionCount(config.controlWalletAddress).then((nonce) => {
    let tran = {
      from: config.controlWalletAddress,
      to: config.lotteryContractAddress,
      value: 0,
      data: lotteryContract.methods.draw(newTicketPrice).encodeABI(),
      gasLimit: web3.utils.toHex(800000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      nonce: nonce,
      chainId: config.chainId
    }
    
    let pk = Buffer.from(config.controlWalletKey, 'hex')
    let tx = new Tx(tran, { common: Common.forCustomChain(
      'mainnet',
      {
        name: 'BSC',
        networkId: config.chainId,
        chainId: config.chainId
      },
      'petersburg'
    ) })
    tx.sign(pk)
    let serialized = tx.serialize()
    
    web3.eth.sendSignedTransaction('0x' + serialized.toString('hex'))
  })

})


