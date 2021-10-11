let config = {
  
  // https://data-seed-prebsc-1-s1.binance.org:8545 for testnet
  // https://bsc-dataseed.binance.org/ for mainnet
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',

  // 97 for testnet, 56 for mainnet
  chainId: 97,

  // Lottery smart contract address
  lotteryContractAddress: '0x68420eDf30844BF1C5D17b578c311A188b6AF018',

  // Should be the same wallet that was used for Lottery smart contract deployment (the contract owner)
  controlWalletKey: '29297a351887d570468793a97d72f27d7bbad18146cc1ca66aeb25a26ef73278',
  controlWalletAddress: '0xc9bd458dDD4f7f5fcE2094f4c6cC536ce14918A9'
}

module.exports = config
