import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { colors } from '@static/theme'
import { useStyles } from './style'

const ResponsivePieChart = ({ data, chartColors, isLoading = true }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showRealData, setShowRealData] = useState(!isLoading)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowRealData(true)
      }, 50)
      return () => clearTimeout(timer)
    } else {
      setShowRealData(false)
    }
  }, [isLoading])

  const total = data?.reduce((sum, item) => sum + item.value, 0) || 0

  const loadingData = [{ value: 1, label: '' }]

  const getPathStyles = (index: number, isLoadingChart: boolean) => ({
    stroke: 'transparent',
    outline: 'none',
    opacity: isLoadingChart ? (showRealData ? 0 : 1) : showRealData ? 1 : 0,
    filter: `drop-shadow(0px 0px ${hoveredIndex === index ? '4px' : '2px'} ${
      isLoadingChart ? colors.invariant.light : chartColors[index]
    })`,
    transition: 'all 0.3s ease-in-out'
  })

  const generateDynamicStyles = () => {
    const styles: Record<string, ReturnType<typeof getPathStyles>> = {}
    const itemCount = data.length

    for (let i = 0; i < itemCount; i++) {
      styles[`&:nth-of-type(${i + 1})`] = getPathStyles(i, false)
    }

    return styles
  }

  const commonChartProps = {
    outerRadius: '50%',
    innerRadius: '90%',
    startAngle: -45,
    endAngle: 315,
    cx: '55%',
    cy: '55%'
  }
  const { classes } = useStyles({
    chartColors,
    hoveredColor: hoveredIndex !== null ? chartColors[hoveredIndex] : null
  })
  return (
    <Box position='relative'>
      <Box position={'absolute'} top={0} left={0}>
        <PieChart
          skipAnimation
          series={[
            {
              data: loadingData,
              ...commonChartProps,
              valueFormatter: () => ''
            }
          ]}
          sx={{
            '& path': {
              stroke: 'transparent',
              outline: 'none'
            }
          }}
          colors={[colors.invariant.light]}
          tooltip={{ trigger: 'none' }}
          slotProps={{ legend: { hidden: true } }}
          width={300}
          height={200}
        />
      </Box>
      <Box position={'absolute'} top={0} left={0}>
        <PieChart
          skipAnimation
          series={[
            {
              data: data.length > 0 ? data : [{}],
              ...commonChartProps,
              valueFormatter: item => {
                if (!data) return ''
                const percentage = ((item.value / total) * 100).toFixed(1)
                return `$${item.value.toLocaleString()} (${percentage}%)`
              }
            }
          ]}
          onHighlightChange={item => {
            if (showRealData) {
              setHoveredIndex(item?.dataIndex ?? null)
            }
          }}
          sx={{
            '& path': generateDynamicStyles()
          }}
          colors={isLoading ? [colors.invariant.light] : chartColors}
          tooltip={{
            trigger: showRealData ? 'item' : 'none',
            classes: {
              root: classes.dark_background,
              valueCell: classes.value_cell,
              labelCell: classes.label_cell,
              paper: classes.dark_paper,
              table: classes.dark_table,
              cell: classes.dark_cell,
              mark: classes.dark_mark,
              row: classes.dark_row
            }
          }}
          slotProps={{
            legend: { hidden: true }
          }}
          width={300}
          height={200}
        />
      </Box>
    </Box>
  )
}

export default ResponsivePieChart
