// import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
// import { SwapToken } from '@selectors/solanaWallet'
// import { theme } from '@static/theme'
// import React from 'react'
// import { formatNumbers, FormatNumberThreshold, showPrefix, trimLeadingZeros } from '@consts/utils'
// import classNames from 'classnames'
// import { useStyles } from './style'

// export interface IPositionsItem {
//   bondToken: SwapToken
//   quoteToken: SwapToken
//   bought: number
//   redeemable: number
//   vestingProgress: string
//   onRedeemClick: () => void
// }

// const thresholds: FormatNumberThreshold[] = [
//   {
//     value: 10,
//     decimals: 6
//   },
//   {
//     value: 100,
//     decimals: 4
//   },
//   {
//     value: 1000,
//     decimals: 2
//   },
//   {
//     value: 10000,
//     decimals: 1
//   },
//   {
//     value: 1000000,
//     decimals: 2,
//     divider: 1000
//   },
//   {
//     value: 1000000000,
//     decimals: 2,
//     divider: 1000000
//   },
//   {
//     value: Infinity,
//     decimals: 2,
//     divider: 1000000000
//   }
// ]

// const PositionsItem: React.FC<IPositionsItem> = ({
//   bondToken,
//   quoteToken,
//   bought,
//   redeemable,
//   vestingProgress,
//   onRedeemClick
// }) => {
//   const classes = useStyles()
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
//   const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))

//   return (
//     <Grid container className={classes.container}>
//       {isExSmall ? null : (
//         <Grid className={classes.pair}>
//           {isSmall ? null : (
//             <>
//               <img className={classes.icon} src={bondToken.logoURI} />
//               <img
//                 className={classNames(classes.icon, classes.secondPairIcon)}
//                 src={quoteToken.logoURI}
//               />
//             </>
//           )}
//           <Typography>
//             {bondToken.symbol}/{quoteToken.symbol}
//           </Typography>
//         </Grid>
//       )}

//       <Grid className={classes.text}>
//         {isSmall ? null : (
//           <img className={classNames(classes.icon, classes.singleIcon)} src={bondToken.logoURI} />
//         )}
//         <Typography>
//           {trimLeadingZeros(formatNumbers(thresholds)(bought.toString()))}
//           {showPrefix(bought)} {bondToken.symbol}
//         </Typography>
//       </Grid>

//       <Typography className={classNames(classes.redeemable, classes.text)}>
//         {trimLeadingZeros(formatNumbers(thresholds)(redeemable.toString()))}
//         {showPrefix(redeemable)}
//       </Typography>
//       <Typography className={classes.text}>{vestingProgress}</Typography>
//       <Button className={classes.redeemButton} onClick={onRedeemClick}>
//         Redeem
//       </Button>
//     </Grid>
//   )
// }

// export default PositionsItem
