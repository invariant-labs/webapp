import React from 'react'
import { Box, List, ListItem } from '@material-ui/core'
import { AccessTime } from '@material-ui/icons'
import { ListEstimate } from '@components/ListEstimate/ListEstimate'
import icons from '@static/icons'
import useStyles from './style'

export const IdoStats: React.FC = () => {
  const classes = useStyles()
  return (
    <Box className={classes.statsContainer}>
      <List className={classes.statsList}>
        <ListItem className={classes.statsListItem}>
          <ListEstimate
            itemLabel='Sale period ends in'
            estimateExact='15:30:33'
            element={<AccessTime className={classes.timeIcon} />}
          />
        </ListItem>
        <ListItem className={classes.statsListItem}>
          <ListEstimate
            itemLabel='Grace period ends in'
            estimateExact='32:29:27'
            element={<AccessTime className={classes.timeIcon} />}
          />
        </ListItem>
        <ListItem className={classes.statsListItem}>
          <ListEstimate
            itemLabel='SOL Contributed'
            estimateExact='122 124 846'
            element={<img src={icons.SOL} className={classes.icon} />}
          />
        </ListItem>
        <ListItem className={classes.statsListItem}>
          <ListEstimate
            itemLabel='Estimated token price'
            estimateExact='218.839'
            element={<img src={icons.USDC} className={classes.icon} />}
          />
        </ListItem>
        <ListItem className={classes.statsListItem}>
          <ListEstimate
            itemLabel='INVARIANT for sale'
            estimateExact='20 000 000'
            element={<img className={classes.logo} src='../../public/logo192.png' />}
          />
        </ListItem>
      </List>
    </Box>
  )
}
