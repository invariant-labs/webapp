import { Typography } from '@mui/material'
import React from 'react'
import { useLabelStyles } from './style'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { VariantType } from 'notistack'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'

export interface IProps {
  displayLength: number
  marketId: string
  copyPoolAddressHandler: (message: string, variant: VariantType) => void
  style?: React.CSSProperties
}

export const MarketIdLabel: React.FC<IProps> = ({
  displayLength,
  marketId,
  copyPoolAddressHandler,
  style
}) => {
  const { classes } = useLabelStyles()

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(marketId)
      .then(() => {
        copyPoolAddressHandler('Market ID copied to Clipboard', 'success')
      })
      .catch(() => {
        copyPoolAddressHandler('Failed to copy Market ID to Clipboard', 'error')
      })
  }

  return (
    <Typography className={classes.marketId} style={style}>
      Market ID: {marketId.slice(0, displayLength)}...
      {marketId.slice(marketId.length - displayLength, marketId.length)}{' '}
      <TooltipHover title='Copy'>
        <FileCopyOutlinedIcon className={classes.clipboardIcon} onClick={copyToClipboard} />
      </TooltipHover>
    </Typography>
  )
}

export default MarketIdLabel
