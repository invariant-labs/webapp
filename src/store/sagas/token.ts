import { call, SagaGenerator } from 'typed-redux-saga'
import { getConnection } from './connection'
import { Account, PublicKey } from '@solana/web3.js'
import { MintInfo, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getWallet } from './wallet'

export function* createToken(
  decimals: number,
  freezeAuthority?: string,
  mintAuthority?: string
): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const connection = yield* call(getConnection)

  const token = yield* call(
    [Token, Token.createMint],
    connection,
    new Account(),
    mintAuthority ? new PublicKey(mintAuthority) : wallet.publicKey,
    freezeAuthority ? new PublicKey(freezeAuthority) : null,
    decimals,
    TOKEN_PROGRAM_ID
  )
  return token.publicKey.toString()
}
export function* getTokenDetails(address: string): SagaGenerator<MintInfo> {
  const connection = yield* call(getConnection)
  const token = new Token(connection, new PublicKey(address), TOKEN_PROGRAM_ID, new Account())
  const info = yield* call([token, token.getMintInfo])
  return info
}

export function* mintToken(tokenAddress: string, recipient: string, amount: number): Generator {
  yield* call(getWallet)
  const connection = yield* call(getConnection)
  const token = new Token(connection, new PublicKey(tokenAddress), TOKEN_PROGRAM_ID, new Account())
  // This should return txid in future
  yield* call([token, token.mintTo], new PublicKey(recipient), new Account(), [], amount)
}
