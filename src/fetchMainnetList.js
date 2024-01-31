const fs = require('fs')
const axios = require('axios')

const run = async () => {
  const tokensObject = await (await axios.default.get('https://token.jup.ag/all')).data
  fs.writeFileSync(
    './src/store/consts/tokenLists/mainnet.json',
    JSON.stringify(
      Object.values(tokensObject).sort((a, b) => {
        if (a.logoURI && !b.logoURI) {
          return -1
        } else if (!a.logoURI && b.logoURI) {
          return 1
        } else {
          return a.symbol.toLowerCase().localeCompare(b.symbol.toLowerCase())
        }
      })
    )
  )
  console.log('Tokens list updated!')
}

run()
