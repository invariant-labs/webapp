import { Box, Typography } from '@mui/material'
import { shortenAddress } from '@utils/uiUtils'
import useStyles from './style'
import { closeIcon, unknownTokenIcon } from '@static/icons'

interface ISearchToken {
  icon: string
  name: string
  symbol: string
  address: string
  balance: any
  decimals: number
}

export const TokenChip: React.FC<{
  option: ISearchToken
  onRemove: (token: ISearchToken) => void
}> = ({ option, onRemove }) => {
  const { classes } = useStyles()
  return (
    <Box className={classes.boxChip}>
      <img
        src={option.icon}
        onError={e => {
          e.currentTarget.onerror = null
          e.currentTarget.src = unknownTokenIcon
        }}
        className={classes.avatarChip}
        alt={option.symbol}
      />
      <Typography className={classes.typographyChip}>{shortenAddress(option.symbol)}</Typography>
      <img
        src={closeIcon}
        className={classes.closeIcon}
        alt='close'
        onClick={e => {
          e.stopPropagation()
          onRemove(option)
        }}
      />
    </Box>
  )
}
