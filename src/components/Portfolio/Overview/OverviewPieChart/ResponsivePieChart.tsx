import { ResponsivePie } from '@nivo/pie'
import { Box, Fade, Grid, Typography } from '@mui/material'
import { colors } from '@static/theme'
import { useStyles } from './style'

const ResponsivePieChart = ({ data, chartColors, isLoading = true }) => {
  const { classes } = useStyles()
  const total = data?.reduce((sum, item) => sum + item.value, 0) || 0
  const loadingData = [{ id: 'loading', value: 1, label: '' }]
  const formatDataForNivo = inputData =>
    inputData.map((item, index) => ({
      id: item.label || `item-${index}`,
      label: item.label || '',
      value: item.value || 0,
      color: chartColors[index]
    }))
  const hasPositiveValue = data?.some(item => item.value > 0)

  const nivoData = hasPositiveValue ? formatDataForNivo(data) : loadingData
  const showPlaceholder = isLoading || !hasPositiveValue
  return (
    <Box position='relative' height={200} width='100%'>
      <Fade in={!showPlaceholder} timeout={{ enter: 0, exit: 400 }} unmountOnExit>
        <Box
          className={classes.sliceShadow}
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}>
          <ResponsivePie
            animate={false}
            data={nivoData}
            margin={{ top: 25, bottom: 20 }}
            innerRadius={0.6}
            colors={chartColors}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            startAngle={-45}
            endAngle={315}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            motionConfig='gentle'
            tooltip={({ datum }) => {
              const percentage = ((datum.value / total) * 100).toFixed(1)

              return (
                <Grid className={classes.tooltip}>
                  <Typography sx={{ color: datum.color }} component='span'>
                    {datum.label}
                  </Typography>
                  <Typography>
                    ${datum.value.toLocaleString()} ({percentage}%)
                  </Typography>
                </Grid>
              )
            }}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends']}
          />
        </Box>
      </Fade>

      <Fade
        in={showPlaceholder}
        timeout={{ enter: 0, exit: 400 }}
        style={{ transitionDelay: isLoading ? '0ms' : '100ms' }}
        unmountOnExit>
        <Box
          className={classes.sliceShadow}
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}>
          <ResponsivePie
            animate={false}
            data={loadingData}
            margin={{ top: 25, bottom: 20 }}
            innerRadius={0.6}
            colors={[colors.invariant.light]}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            startAngle={-45}
            endAngle={315}
            motionConfig='gentle'
            isInteractive={false}
          />
        </Box>
      </Fade>
    </Box>
  )
}

export default ResponsivePieChart
