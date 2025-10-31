import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material'
import { formatNumberWithoutSuffix } from '@utils/utils'
import { theme } from '@static/theme'
import loadingAnimation from '@static/gif/loading.gif'
import { useStyles } from './styles'
import { Button } from '@common/Button/Button'

interface UnclaimedSectionProps {
  unclaimedAmount: number
  handleClaimAll?: () => void
  loading?: boolean
}

export const UnclaimedSection: React.FC<UnclaimedSectionProps> = ({
  unclaimedAmount,
  handleClaimAll,
  loading = false
}) => {
  const { classes } = useStyles()
  const isMd = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box className={classes.unclaimedSection}>
      <Box className={classes.titleRow}>
        <Box className={classes.container}>
          <Typography className={classes.unclaimedTitle}>Unclaimed fees </Typography>
          {!isMd && (
            <Button
              sx={{ textWrap: 'nowrap' }}
              scheme='green'
              height={32}
              width={105}
              padding='0 20px'
              onClick={handleClaimAll}
              disabled={loading || unclaimedAmount === 0}>
              {loading ? (
                <>
                  <img
                    src={loadingAnimation}
                    style={{ height: 25, width: 25, zIndex: 10 }}
                    alt='loading'
                  />
                </>
              ) : (
                'Claim All'
              )}
            </Button>
          )}
        </Box>

        {loading ? (
          <Skeleton variant='text' width={100} height={30} className={classes.unclaimedAmount} />
        ) : (
          <Typography className={classes.unclaimedAmount}>
            ${formatNumberWithoutSuffix(unclaimedAmount, { twoDecimals: true })}
          </Typography>
        )}
      </Box>
      {isMd && (
        <Button
          scheme='green'
          height={32}
          width={'100%'}
          onClick={handleClaimAll}
          disabled={loading || unclaimedAmount === 0}>
          {loading ? (
            <>
              <img
                src={loadingAnimation}
                style={{ height: 25, width: 25, zIndex: 10 }}
                alt='loading'
              />
            </>
          ) : (
            'Claim All'
          )}
        </Button>
      )}
    </Box>
  )
}
