import { storiesOf } from '@storybook/react'
import RangeSelector from './RangeSelector'
import { action } from '@storybook/addon-actions'
import { calcPrice } from '@consts/utils'
import { MAX_TICK, MIN_TICK } from '@invariant-labs/sdk'

const data = [
  {
    x: calcPrice(MIN_TICK, true, 6, 6),
    y: 10,
    index: MIN_TICK
  },
  {
    x: calcPrice(MAX_TICK, true, 6, 6),
    y: 10,
    index: MAX_TICK
  }
]

const concentrationArray = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 63.003496731999185, 63.99557385459872, 64,
  65.01965413700657, 66.07731150511556, 67.170224813211, 68.30018673620842, 69.46911358177529,
  70.6790561353108, 71.93221166688458, 73.23093724802779, 74.57776454816059, 75.9754163060941,
  77.42682470208663, 78.93515189131959, 80.50381300138696, 82.13650194581045, 83.83722046423644,
  85.61031086990157, 87.46049306849481, 89.39290651287934, 91.41315787890433, 93.52737539366086,
  95.74227092491752, 98.06521115680876, 100.50429944188154, 103.06847024576703, 105.76759850416065,
  108.61262671337496, 111.61571320264505, 114.79040582454873, 118.1518462966702, 121.71701169630413,
  125.50500123540567, 129.53737854037226, 133.83858238779547, 138.43642241999584,
  143.36268108534173, 148.6538493430759, 154.35203214616604, 160.50607124005197, 167.17294866108585,
  174.41955636498605, 182.32494848123096, 190.98323706872694, 200.50735659816596, 211.0340172182762,
  222.73030911083112, 235.80263779450277, 250.50901016763237, 267.17623496809654, 286.2244948589016,
  308.2032594762985, 333.84515500191145, 364.14921713798856, 400.5140958676793, 444.96006338884666,
  500.5175279982779, 571.9485598766967, 667.1899426585674, 800.5278868860325, 1000.5348136431164,
  1333.8797054596678, 2000.5695099245224, 4000.6389649839957
]

storiesOf('position/rangeSelector', module)
  .add('setter', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: calcPrice(140, true, 6, 6),
        index: 140
      }}
      tokenASymbol='BAT'
      tokenBSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
      currentPairReversed={null}
      initialIsDiscreteValue={false}
      onDiscreteChange={() => {}}
      poolIndex={null}
      reloadHandler={() => {}}
      concentrationArray={concentrationArray}
      concentrationIndex={0}
      getTicksInsideRange={(left, right, _isXtoY) => {
        return { leftInRange: left, rightInRange: right }
      }}
      minimumSliderIndex={0}
      setConcentrationIndex={() => {}}
      setShouldResetPlot={() => {}}
      shouldResetPlot={false}
    />
  ))
  .add('blocked', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: calcPrice(140, true, 6, 6),
        index: 140
      }}
      tokenASymbol='BAT'
      tokenBSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      blocked
      blockerInfo='Select tokens to set price range.'
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={4}
      isXtoY={true}
      currentPairReversed={null}
      initialIsDiscreteValue={false}
      onDiscreteChange={() => {}}
      poolIndex={null}
      reloadHandler={() => {}}
      concentrationArray={concentrationArray}
      concentrationIndex={0}
      getTicksInsideRange={(left, right, _isXtoY) => {
        return { leftInRange: left, rightInRange: right }
      }}
      minimumSliderIndex={0}
      setConcentrationIndex={() => {}}
      setShouldResetPlot={() => {}}
      shouldResetPlot={false}
    />
  ))
  .add('concentrated', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: calcPrice(140, true, 6, 6),
        index: 140
      }}
      tokenASymbol='BAT'
      tokenBSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
      currentPairReversed={null}
      initialIsDiscreteValue={false}
      onDiscreteChange={() => {}}
      poolIndex={null}
      reloadHandler={() => {}}
      concentrationArray={concentrationArray}
      concentrationIndex={0}
      getTicksInsideRange={(left, right, _isXtoY) => {
        return { leftInRange: left, rightInRange: right }
      }}
      minimumSliderIndex={0}
      setConcentrationIndex={() => {}}
      setShouldResetPlot={() => {}}
      shouldResetPlot={false}
    />
  ))
