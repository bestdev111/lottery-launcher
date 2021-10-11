This is a readme for Lottery project.

Metamask setup for BSC testnet: https://medium.com/spartanprotocol/how-to-connect-metamask-to-bsc-testnet-7d89c111ab2
Metamask setup for BSC mainnet: https://medium.com/spartanprotocol/connecting-metamask-to-bsc-mainnet-23e434bc670f

Deployment Instructions:

1) Deploy /contract/Lottery.sol to testnet or mainnet
2) Deploy /launcher/ which is a node.js script 
    Run 'npm install' to setup dependencies
    Fill in proper values to config.js - see comments in the file
    When ready to start run 'node index.js' to initialize the contract and start the first lottery
    Schedule 'node index.js' to run every 36 hours with a tool like cron
3) Deploy /frontend/ which is a react.js app
I supposed this is going to be changed or integrated into a bigger front end so it has minimally necessary functionality
    Run 'npm install' to setup dependencies
    Fill in proper values to config.js - see comments in the file
    Run 'npm start' to get it running
    By default it is available at http://localhost:3000/
        Connect wallet functionality is extracted from Pancakeswap, once connected it should be possible to buy tickets

I have done a test lottery on testnet, this is the deployed test contract https://testnet.bscscan.com/address/0x68420eDf30844BF1C5D17b578c311A188b6AF018
(with timelock reduced to 10 minutes).
It worked according to specs, including various condition checks. Once interesting effect is that when there are few tickets sold the jackpot becomes less then the other wins.
For example jackpot is 10% but 55% / 5 = 11% which is more then jackpot. It shoudn't be the case if enough tickets are sold.