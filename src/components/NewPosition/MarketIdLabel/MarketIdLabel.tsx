import React from 'react'
import { Typography } from '@material-ui/core'
import { useLabelStyles } from './style'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { Color } from '@material-ui/lab'

export interface IProps {
  displayLength: number
  marketId: string
  copyPoolAddressHandler: (message: string, variant: Color) => void
}

export const MarketIdLabel: React.FC<IProps> = ({
  displayLength,
  marketId,
  copyPoolAddressHandler
}) => {
  const classes = useLabelStyles()

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(marketId)
      .then(() => {
        copyPoolAddressHandler('Market ID copied to Clipboard', 'success')
      })
      .catch(err => {
        copyPoolAddressHandler('Failed to copy Market ID to Clipboard', 'error')
      })
  }

  return (
    <Typography className={classes.marketId}>
      Market ID: {marketId.slice(0, displayLength)}...
      {marketId.slice(marketId.length - displayLength, marketId.length)}{' '}
      <FileCopyOutlinedIcon className={classes.clipboardIcon} onClick={copyToClipboard} />
    </Typography>
  )
}

export default MarketIdLabel
