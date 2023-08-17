import React from 'react'
import { Switch, Typography } from '@material-ui/core'
import useStyles from './style'
export interface IVolumeHeatmapSwitch {
  handleChange: () => void
  checked: boolean
}

export const VolumeHeatmapSwitch: React.FC<IVolumeHeatmapSwitch> = ({ checked, handleChange }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography className={classes.heatmapLabel}>
        Volume Heatmap <div className={classes.heatmapLabelIcon}>i</div>
      </Typography>
      <Switch checked={checked} onClick={handleChange} className={classes.switch} />
    </div>
  )
}
