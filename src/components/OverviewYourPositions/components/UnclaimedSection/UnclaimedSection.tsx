import { Box, Typography, Button, Skeleton, useMediaQuery } from '@mui/material'
import { formatNumberWithoutSuffix } from '@utils/utils'
import { theme } from '@static/theme'
import loadingAnimation from '@static/gif/loading.gif'
import { useStyles } from './styles'

interface UnclaimedSectionProps {
  unclaimedTotal: number
  handleClaimAll?: () => void
  loading?: boolean
}

export const UnclaimedSection: React.FC<UnclaimedSectionProps> = ({
  unclaimedTotal,
  handleClaimAll,
  loading = false
}) => {
  const { classes } = useStyles({ isLoading: loading || unclaimedTotal === 0 })
  const isLg = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Box className={classes.unclaimedSection}>
      <Box className={classes.titleRow}>
        <Box className={classes.container}>
          <Typography className={classes.unclaimedTitle}>Unclaimed fees (total)</Typography>
          {!isLg && (
            <Button
              className={classes.claimAllButton}
              onClick={handleClaimAll}
              disabled={loading || unclaimedTotal === 0}>
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
            ${formatNumberWithoutSuffix(unclaimedTotal, { twoDecimals: true })}
          </Typography>
        )}
      </Box>
      {isLg && (
        <Button
          className={classes.claimAllButton}
          onClick={handleClaimAll}
          disabled={loading || unclaimedTotal === 0}>
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
