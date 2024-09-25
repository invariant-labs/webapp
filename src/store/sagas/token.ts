import { call, SagaGenerator } from 'typed-redux-saga'
import { getConnection } from './connection'
import { PublicKey } from '@solana/web3.js'
import { getMint, Mint } from '@solana/spl-token'

// export function* createToken(
//   decimals: number,
//   freezeAuthority?: string,
//   mintAuthority?: string
// ): SagaGenerator<string> {
// const wallet = yield* call(getWallet)
// const connection = yield* call(getConnection)
// const token = yield* call(
//   [createMint],
//   connection,
//   mintAuthority ? new PublicKey(mintAuthority) : wallet.publicKey,
//   mintAuthority ? new PublicKey(mintAuthority) : wallet.publicKey,
//   freezeAuthority ? new PublicKey(freezeAuthority) : null,
//   decimals,
//   undefined,
//   undefined,
//   TOKEN_PROGRAM_ID
// )
// return token.toString()
// return ''
// }
export function* getTokenDetails(address: string): SagaGenerator<Mint> {
  const connection = yield* call(getConnection)
  const info = yield* call(getMint, connection, new PublicKey(address))
  return info
}

// export function* mintToken(tokenAddress: string, recipient: string, amount: number): Generator {
//   // yield* call(getWallet)
//   // const connection = yield* call(getConnection)
//   // // const token = new Token(connection, new PublicKey(tokenAddress), TOKEN_PROGRAM_ID, new Account())
//   // // This should return txid in future
//   // yield* call([token, token.mintTo], new PublicKey(recipient), new Account(), [], amount)
// }
