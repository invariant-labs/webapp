import { Token } from '@consts/static'
import { Pair } from '@invariant-labs/sdk'
import { PoolStructure, Tickmap } from '@invariant-labs/sdk/lib/market'
import { Tick } from '@invariant-labs/sdk/src/market'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'
import * as R from 'remeda'
import { BN } from '@project-serum/anchor'



export interface IFarmsStore {
  
}

export interface ICreateStake {
    pool: PublicKey
    id: BN
    position: PublicKey
    incentive: PublicKey
    owner: PublicKey
    index: number
    invariant: PublicKey
}

export const defaultState: IFarmsStore = {

}