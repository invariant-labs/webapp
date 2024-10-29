// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'
// import { network, rpcAddress, status } from '@store/selectors/solanaConnection'
// import { Status } from '@store/reducers/solanaConnection'
// import { BondSaleStruct, Bonds, BondStruct } from '@invariant-labs/bonds-sdk/lib/sale'
// import { PublicKey } from '@solana/web3.js'
// import { bondsList, userVested } from '@store/selectors/bonds'
// import { actions } from '@store/reducers/bonds'
// import * as R from 'remeda'
// import { status as walletStatus } from '@store/selectors/solanaWallet'
// import { Status as WalletStatus } from '@store/reducers/solanaWallet'
// import { getBondsProgramSync } from '@utils/web3/programs/bonds'

// const onBondSaleChange = async (
//   bondsProgram: Bonds,
//   bondSale: PublicKey,
//   fn: (sale: BondSaleStruct) => void
// ) => {
//   bondsProgram.program.account.bondSale
//     .subscribe(bondSale, 'singleGossip')
//     .on('change', (sale: BondSaleStruct) => {
//       fn(sale)
//     })
// }

// const onBondChange = async (
//   bondsProgram: Bonds,
//   bond: PublicKey,
//   fn: (data: BondStruct) => void
// ) => {
//   bondsProgram.program.account.bond
//     .subscribe(bond, 'singleGossip')
//     .on('change', (data: BondStruct) => {
//       fn(data)
//     })
// }

// const BondsEvents = () => {
//   const dispatch = useDispatch()
//   const networkType = useSelector(network)
//   const rpc = useSelector(rpcAddress)
//   const bondsProgram = getBondsProgramSync(networkType, rpc)
//   const networkStatus = useSelector(status)
//   const allBonds = useSelector(bondsList)
//   const allUserVested = useSelector(userVested)
//   const walletStat = useSelector(walletStatus)

//   useEffect(() => {
//     if (networkStatus !== Status.Initialized || !bondsProgram) {
//       return
//     }

//     const connectEvents = () => {
//       R.forEachObj(allBonds, bond => {
//         onBondSaleChange(bondsProgram, bond.address, bondData => {
//           dispatch(
//             actions.updateBond({
//               ...bondData,
//               address: bond.address
//             })
//           )
//         })
//           .then(() => {})
//           .catch(err => {
//             console.log(err)
//           })
//       })
//     }

//     connectEvents()
//   }, [dispatch, networkStatus, Object.values(allBonds).length])

//   const [vestedKeys, setVestedKeys] = useState<string[]>([])

//   useEffect(() => {
//     if (
//       networkStatus !== Status.Initialized ||
//       !bondsProgram ||
//       walletStat !== WalletStatus.Initialized
//     ) {
//       return
//     }

//     const connectEvents = () => {
//       const removedKeys = vestedKeys.filter(key => typeof allUserVested[key] === 'undefined')
//       removedKeys.forEach(key => {
//         bondsProgram.program.account.bond
//           .unsubscribe(new PublicKey(key))
//           .then(() => {})
//           .catch(error => {
//             console.log(error)
//           })
//       })

//       setVestedKeys(Object.keys(allUserVested))

//       R.forEachObj(allUserVested, vested => {
//         onBondChange(bondsProgram, vested.address, bondData => {
//           dispatch(
//             actions.updateVested({
//               ...bondData,
//               address: vested.address
//             })
//           )
//         })
//           .then(() => {})
//           .catch(err => {
//             console.log(err)
//           })
//       })
//     }

//     connectEvents()
//   }, [dispatch, networkStatus, walletStat, Object.values(allUserVested).length])

//   useEffect(() => {
//     if (
//       networkStatus !== Status.Initialized ||
//       !bondsProgram ||
//       walletStat === WalletStatus.Initialized
//     ) {
//       return
//     }

//     const connectEvents = () => {
//       vestedKeys.forEach(key => {
//         bondsProgram.program.account.bond
//           .unsubscribe(new PublicKey(key))
//           .then(() => {})
//           .catch(error => {
//             console.log(error)
//           })
//       })

//       setVestedKeys([])
//     }

//     connectEvents()
//   }, [dispatch, networkStatus, walletStat])

//   return null
// }

// export default BondsEvents
