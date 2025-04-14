import { Typography, Box, Skeleton } from '@mui/material'
import { formatNumberWithoutSuffix } from '@utils/utils'
import { useStyles } from './style'

interface HeaderSectionProps {
  totalValue: number
  loading?: boolean
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ totalValue, loading }) => {
  const { classes } = useStyles()

  return (
    <>
      <Box className={classes.headerRow}>
        <Typography className={classes.headerText}>Liquidity Assets</Typography>
        {loading ? (
          <>
            <Skeleton variant='text' width={100} height={24} />
          </>
        ) : (
          <Typography className={classes.headerText}>
            $
            {Number.isNaN(totalValue)
              ? 0
              : formatNumberWithoutSuffix(totalValue, { twoDecimals: true })}
          </Typography>
        )}
      </Box>
    </>
  )
}
