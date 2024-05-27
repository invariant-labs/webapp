import React from 'react'
import { Typography } from '@material-ui/core'
import { useLabelStyles } from './style'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { Color } from '@material-ui/lab'
import { useEffect } from 'react'

export interface IProps {
  displayLength: number
  marketId: string
  copyPoolAddressHandler: (message: string, variant: Color) => void
  style?: React.CSSProperties
  setIndexed: React.Dispatch<React.SetStateAction<boolean>>
}

export const MarketIdLabel: React.FC<IProps> = ({
  displayLength,
  marketId,
  copyPoolAddressHandler,
  style,
  setIndexed
}) => {
  const classes = useLabelStyles()

  useEffect(() => {
    // Fetch market data from Jupiter API to determine if the market ID is indexed
    const fetchData = async () => {
      try {
        const response = await fetch('https://cache.jup.ag/markets?v=3')
        if (!response.ok) {
          throw new Error('Failed to fetch market data')
        }
        const data = await response.json()

        // Check if the current market ID exists in the fetched data
        const isIndexed = data.some((pool: { pubkey: string }) => pool.pubkey === marketId)

        // Update the state to indicate whether the market ID is indexed
        setIndexed(isIndexed)

        // Log the result for clarification (can be removed in production)
        console.log(`Market ID ${marketId} indexed in Jupiter: ${isIndexed}`)
      } catch (error: any) {
        console.error('Error fetching market data:', error.message)
      }
    }
    fetchData()
  }, [marketId, setIndexed])

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
      <FileCopyOutlinedIcon className={classes.clipboardIcon} onClick={copyToClipboard} />
    </Typography>
  )
}

export default MarketIdLabel
