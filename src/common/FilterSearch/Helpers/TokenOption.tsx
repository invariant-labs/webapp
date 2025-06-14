import { Box, Typography } from '@mui/material'
import { shortenAddress } from '@utils/uiUtils'
import { formatNumberWithSuffix, printBN } from '@utils/utils'
import { useStyles } from './style'
import { typography } from '@static/theme'
import { ISearchToken } from '../FilterSearch'
import { newTabIcon, unknownTokenIcon } from '@static/icons'

export const TokenOption: React.FC<{
  option: ISearchToken
  networkUrl: string
  isSmall: boolean
}> = ({ option, networkUrl, isSmall }) => {
  const { classes } = useStyles()

  const tokenBalance = printBN(option.balance, option.decimals)

  return (
    <Box className={classes.tokenContainer}>
      <Box className={classes.leftSide}>
        <img
          width={isSmall ? 32 : 24}
          src={option?.icon ?? unknownTokenIcon}
          onError={e => {
            e.currentTarget.onerror = null
            e.currentTarget.src = unknownTokenIcon
          }}
          alt={option.symbol}
          className={classes.searchResultIcon}
        />
        <Box className={classes.tokenData}>
          <Box className={classes.symbolAndAddress}>
            <Typography className={classes.tokenLabel}>{shortenAddress(option.symbol)}</Typography>
            <Box className={classes.tokenAddress}>
              <a
                className={classes.addressLink}
                href={`https://solscan.io/token/${option.address.toString()}${networkUrl}`}
                target='_blank'
                rel='noopener noreferrer'
                onClick={event => event.stopPropagation()}>
                <Typography className={classes.truncatedAddress}>
                  {shortenAddress(option.address)}
                </Typography>
                <img className={classes.newTabIcon} src={newTabIcon} alt='Token address' />
              </a>
            </Box>
          </Box>
          {isSmall && (
            <Typography sx={{ ...typography.caption4 }} className={classes.tokenName}>
              {option.name === option.address ? shortenAddress(option.name) : option.name}
            </Typography>
          )}
        </Box>
      </Box>

      <Box>
        <Box className={classes.tokenBalanceStatus}>
          {Number(option.balance) > 0 && (
            <>
              <Typography>Balance:</Typography>
              <Typography>&nbsp; {formatNumberWithSuffix(tokenBalance)}</Typography>
            </>
          )}
        </Box>
        {!isSmall && (
          <Box>
            <Typography
              className={classes.tokenName}
              sx={{ textAlign: 'end', ...typography.tiny2 }}>
              {option.name === option.address ? shortenAddress(option.name) : option.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
