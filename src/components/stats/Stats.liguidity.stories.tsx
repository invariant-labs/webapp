import React from 'react'
import { makeStyles, Grid, Box, Typography } from '@material-ui/core'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { colors, newTypography, theme } from '@static/theme'
import { formatNumbers, showPrefix } from '@consts/utils'
import classNames from 'classnames'
import { ResponsiveLine } from '@nivo/line'

storiesOf('position/stats', module)
  .addDecorator(withKnobs)
  .add('liquidity', () => {
    const [liquidityVolume] = React.useState<number>(231258435934)
    const [liquidityPercent] = React.useState<number>(-4.14)

    const data = [
      {
        id: 'current range',
        data: [
          { x: '1AM', y: 20 },
          { x: '4AM', y: 15 },
          { x: '7AM', y: 10 },
          { x: '10AM', y: 9 },
          { x: '1PM', y: 5 },
          { x: '4PM', y: 3 },
          { x: '7PM', y: 10 },
          { x: '10PM', y: 5 }
        ]
      }
    ]

    const Theme = {
      axis: {
        tickColor: 'transparent',
        ticks: { line: { stroke: colors.invariant.component }, text: { fill: colors.white.main } }
      }
    }

    const classes = styles()

    return (
      <Grid className={classes.container}>
        <Box className={classes.liquidityContainer}>
          <Typography className={classes.liquidityHeader}>Liquidity 24H</Typography>
          <div className={classes.volumePercentHeader}>
            <Typography className={classes.volumeLiquidityHeader}>
              ${formatNumbers()(liquidityVolume.toString())}
              {showPrefix(liquidityVolume)}
            </Typography>
            <Box className={classes.volumeStatusContainer}>
              <Box
                className={classNames(
                  classes.volumeStatusColor,
                  liquidityPercent < 0 ? classes.backgroundVolumeLow : classes.backgroundVolumeUp
                )}>
                <Typography
                  component='p'
                  className={classNames(
                    classes.volumeStatusHeader,
                    liquidityPercent < 0 ? classes.volumeLow : classes.volumeUp
                  )}>
                  {liquidityPercent < 0
                    ? `-${liquidityPercent.toString().split('-')[1]}`
                    : `+ ${liquidityPercent}`}
                  %
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>
        <div className={classes.barContainer}>
          <ResponsiveLine
            data={data}
            margin={{ top: 70, bottom: 30, left: 10, right: 20 }}
            axisBottom={{
              tickSize: 0,
              tickPadding: 0,
              tickRotation: 0,
              tickValues: 5
            }}
            curve={'monotoneX'}
            enableGridX={false}
            enableGridY={false}
            enablePoints={false}
            enableArea={true}
            isInteractive={false}
            animate={false}
            colors={colors.invariant.green}
            theme={Theme}
            lineWidth={1}
            defs={[
              linearGradientDef('gradient', [
                { offset: 0, color: 'inherit' },
                { offset: 50, color: 'inherit' },
                { offset: 100, color: 'inherit', opacity: 0 }
              ])
            ]}
            fill={[{ match: '*', id: 'gradient' }]}
          />
        </div>
      </Grid>
    )
  })

const styles = makeStyles(() => ({
  container: {
    backgroundColor: colors.invariant.component,
    color: 'white',
    maxWidth: '524px',
    borderRadius: 24,
    padding: 30,
    fontFamily: theme.typography.fontFamily
  },
  liquidityContainer: {
    dispaly: 'flex',
    flexDirection: 'column',
    alignItems: 'flexp-start',
    fontWeight: 'normal'
  },
  liquidityHeader: {
    color: '#A9B6BF',
    ...newTypography.body2
  },

  volumeLiquidityHeader: {
    ...newTypography.heading1,
    letterSpacing: '-0.03em',
    marginTop: 5
  },
  barContainer: {
    height: 200,
    display: 'flex'
  },
  volumePercentHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  volumeStatusContainer: {
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'auto'
  },
  volumeStatusColor: {
    height: 20,
    minWidth: 'auto',
    padding: '5px 15px 5px 15px',
    borderRadius: 6
  },

  volumeStatusHeader: {
    fontFamily: theme.typography.fontFamily,
    ...newTypography.body1,
    filter: 'brightness(1.2)'
  },
  volumeLow: {
    color: colors.invariant.Error
  },
  backgroundVolumeLow: {
    backgroundColor: 'rgba(251,85,95,0.2)'
  },
  backgroundVolumeUp: {
    backgroundColor: 'rgba(46, 224, 149,0.2)'
  },
  volumeUp: {
    color: colors.invariant.green
  }
}))
