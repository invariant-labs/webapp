import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { getBondsProgramSync } from '@web3/programs/bonds'
import { BondSaleStruct, Bonds, BondStruct } from '@invariant-labs/bonds-sdk/lib/sale'
import { PublicKey } from '@solana/web3.js'
import { bondsList, userVested } from '@selectors/bonds'
import { actions } from '@reducers/bonds'
import * as R from 'remeda'

const onBondSaleChange = async (
  bondsProgram: Bonds,
  bondSale: PublicKey,
  fn: (sale: BondSaleStruct) => void
) => {
  bondsProgram.program.account.bondSale
    .subscribe(bondSale, 'singleGossip')
    .on('change', (sale: BondSaleStruct) => {
      fn(sale)
    })
}

const onBondChange = async (
  bondsProgram: Bonds,
  bond: PublicKey,
  fn: (data: BondStruct) => void
) => {
  bondsProgram.program.account.bond
    .subscribe(bond, 'singleGossip')
    .on('change', (data: BondStruct) => {
      fn(data)
    })
}

const BondsEvents = () => {
  const dispatch = useDispatch()
  const bondsProgram = getBondsProgramSync()
  const networkStatus = useSelector(status)
  const allBonds = useSelector(bondsList)
  const allUserVested = useSelector(userVested)

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !bondsProgram) {
      return
    }

    const connectEvents = () => {
      R.forEachObj(allBonds, bond => {
        onBondSaleChange(bondsProgram, bond.address, bondData => {
          dispatch(
            actions.updateBond({
              ...bondData,
              address: bond.address
            })
          )
        })
          .then(() => {})
          .catch(err => {
            console.log(err)
          })
      })
    }

    connectEvents()
  }, [dispatch, networkStatus, Object.values(allBonds).length])

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !bondsProgram) {
      return
    }

    const connectEvents = () => {
      R.forEachObj(allUserVested, vested => {
        onBondChange(bondsProgram, vested.address, bondData => {
          dispatch(
            actions.updateVested({
              ...bondData,
              address: vested.address
            })
          )
        })
          .then(() => {})
          .catch(err => {
            console.log(err)
          })
      })
    }

    connectEvents()
  }, [dispatch, networkStatus, Object.values(allUserVested).length])

  return null
}

export default BondsEvents
