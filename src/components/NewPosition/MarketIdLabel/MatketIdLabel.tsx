import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useLabelStyles } from './style'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { poolsArraySortedByFees } from '@selectors/pools'
import { useSelector, useDispatch } from 'react-redux'

export interface IProps {
  displayLength: number
  poolIndex: number
}

export const MarketIdLabel: React.FC<IProps> = ({ displayLength, poolIndex }) => {
  const dispatch = useDispatch()
  const classes = useLabelStyles()

  const allPools = useSelector(poolsArraySortedByFees)

  const [poolAddress, setPoolAddress] = useState<string>('')

  useEffect(() => {
    const marketId = allPools[poolIndex]?.address.toString()
    setPoolAddress(marketId)
  }, [poolIndex])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(poolAddress)
    dispatch(
      snackbarsActions.add({
        message: 'Market ID copied to clipboard',
        variant: 'success',
        persist: false
      })
    )
  }

  return (
    <Typography className={classes.marketId}>
      Market ID: {poolAddress.slice(0, displayLength)}...
      {poolAddress.slice(poolAddress.length - displayLength, poolAddress.length)}{' '}
      <FileCopyOutlinedIcon className={classes.clipboardIcon} onClick={copyToClipboard} />
    </Typography>
  )
}

export default MarketIdLabel
