import React from 'react'
import { Grid, Switch, Tooltip, Typography } from '@material-ui/core'
import useStyles from './style'

interface IHeatmapSwitch {
  onClick: () => void
  heatmapEnabled: boolean
}

const HeatmapSwitch: React.FC<IHeatmapSwitch> = ({ onClick, heatmapEnabled }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.heatmapSwitchContainer}>
      <Tooltip
        title={
          <>
            <Typography className={classes.heatmapTitle}>Volume Heatmap</Typography>
            <Typography className={classes.heatmapDesc}>
              Existuje mnoho variant s pasážemi Lorem Ipsum, nicméně valná většina trpí neduhy v
              podobě snahy o vtipný text či použití naprosto náhodných slov, což nevypadá zrovna
              uvěřitelně.V dnešní době je Lorem Ipsum používáno spoustou DTP balíků a webových
              editorů coby výchozí model výplňového textu.
            </Typography>
            <Typography className={classes.heatmapNote}>
              Note: Je obecně známou věcí, že člověk bývá při zkoumání grafického návrhu rozptylován
              okolním textem, pokud mu dává nějaký smysl.
            </Typography>
          </>
        }
        placement='bottom'
        classes={{
          tooltip: classes.heatmapTooltip
        }}>
        <Typography className={classes.heatmapSwitchTile}>
          Volume Heatmap <div className={classes.volumeHeatmapIcon}>i</div>
        </Typography>
      </Tooltip>
      <Switch classes={classes} onClick={onClick} checked={heatmapEnabled} />
    </Grid>
  )
}

export default HeatmapSwitch
