import { Grid } from '@mui/material'
import useStyles from './styles'
import PopularPoolsWrapper from '@containers/PopularPoolsWrapper/PopularPoolsWrapper'
import { WrappedPoolList } from '@containers/WrappedPoolList/WrappedPoolList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentInterval } from '@store/selectors/stats'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { actions } from '@store/reducers/stats'

const ListPage: React.FC = () => {
  const { classes } = useStyles()

  const dispatch = useDispatch()

  const lastUsedInterval = useSelector(currentInterval)

  const updateInterval = (interval: IntervalsKeys) => {
    dispatch(actions.getCurrentIntervalStats({ interval }))
    dispatch(actions.setCurrentInterval({ interval }))
  }

  useEffect(() => {
    dispatch(
      actions.getCurrentIntervalStats({
        interval: lastUsedInterval || IntervalsKeys.Daily
      })
    )
  }, [])

  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.innerContainer}>
        <PopularPoolsWrapper updateInterval={updateInterval} lastUsedInterval={lastUsedInterval} />
        <WrappedPoolList />
      </Grid>
    </Grid>
  )
}

export default ListPage
