import { Typography, Box, Skeleton, Grid } from '@mui/material'
import { formatNumberWithoutSuffix } from '@utils/utils'
import { useStyles } from './style'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'
import { warning2Icon } from '@static/icons'

interface HeaderSectionProps {
  totalValue: { value: number; isPriceWarning: boolean }
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
          <Grid display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
            {totalValue.isPriceWarning && (
              <Grid
                position={'relative'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}>
                <TooltipHover title='The total value of assets might not be shown correctly'>
                  <img src={warning2Icon} className={classes.warning} width={18} />
                </TooltipHover>
              </Grid>
            )}
            <Typography className={classes.headerText}>
              $
              {Number.isNaN(totalValue)
                ? 0
                : formatNumberWithoutSuffix(totalValue.value, { twoDecimals: true })}
            </Typography>
          </Grid>
        )}
      </Box>
    </>
  )
}
