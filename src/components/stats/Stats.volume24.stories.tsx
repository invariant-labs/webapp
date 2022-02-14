import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { colors, newTypography, theme } from '@static/theme'
import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Typography, Box } from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'
import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'

storiesOf('position/Stats', module)
  .addDecorator(withKnobs)
  .add('volume24', () => {
    const [percentVolume] = React.useState<number>(1.14)
    const [volume] = React.useState<number>(231258435934)
    const [data] = React.useState([
      {
        map: '1AM',
        dataA: 120,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '4AM',
        dataA: 35,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '7AM',
        dataA: 33,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '10AM',
        dataA: 27,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '1PM',
        dataA: 199,
        dataB: 76,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '4PM',
        dataA: 117,
        dataB: 200,
        dataC: 100,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '7PM',
        dataA: 100,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '10PM',
        dataA: 200,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '10PM',
        dataA: 200,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      }
    ])

    const keys = data.map(({ map, ...rest }) => rest)

    const getKeys = keys
      .map(key => Object.keys(key))
      .reduce((array, isArray) => (Array.isArray(isArray) ? array.concat(isArray) : array))
    const uniqueKeys = [...new Set(getKeys)]

    const classes = styled()

    const Theme = {
      axis: {
        fontSize: '14px',
        tickColor: 'transparent',
        ticks: { line: { stroke: colors.invariant.component }, text: { fill: colors.white.main } },
        legend: { text: { stroke: 'transparent' } }
      },
      grid: { line: { stroke: 'transparent' } }
    }

    return (
      <Grid className={classes.container}>
        <Box className={classes.volumeContainer}>
          <Typography className={classes.volumeHeader}>Volume 24H</Typography>
          <div className={classes.volumePercentContainer}>
            <Typography className={classes.volumePercentHeader}>
              ${formatNumbers()(volume.toString())}
              {showPrefix(volume)}
            </Typography>
            <Box className={classes.volumeStatusContainer}>
              <Box
                className={classNames(
                  classes.volumeStatusColor,
                  percentVolume < 0 ? classes.backgroundVolumeLow : classes.backgroundVolumeUp
                )}>
                <Typography
                  component='p'
                  className={classNames(
                    classes.volumeStatusHeader,
                    percentVolume < 0 ? classes.volumeLow : classes.volumeUp
                  )}>
                  {percentVolume < 0
                    ? `-${percentVolume.toString().split('-')[1]}`
                    : `+ ${percentVolume}`}
                  %
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>
        <div className={classes.barContainer}>
          <ResponsiveBar
            margin={{ top: 70, bottom: 30, left: 0 }}
            data={data}
            keys={uniqueKeys}
            indexBy='map'
            labelSkipWidth={2}
            labelSkipHeight={12}
            theme={Theme}
            groupMode='grouped'
            enableLabel={false}
            enableGridY={false}
            isInteractive={false}
            innerPadding={3}
            padding={0.03}
            indexScale={{ type: 'band', round: true }}
            colors={colors.invariant.pink}
          />
        </div>
      </Grid>
    )
  })

const styled = makeStyles(() => ({
  container: {
    backgroundColor: colors.invariant.component,
    color: 'white',
    maxWidth: '524px',
    borderRadius: 24,
    padding: 30,
    fontFamily: theme.typography.fontFamily
  },
  volumeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: 'normal'
  },
  volumeHeader: {
    color: '#A9B6BF',
    ...newTypography.body2
  },
  volumePercentContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  volumePercentHeader: {
    ...newTypography.heading1,
    letterSpacing: '-0.03em',
    marginTop: 5
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
  barContainer: {
    height: 200,
    display: 'flex'
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
