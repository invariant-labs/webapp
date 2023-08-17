import React, { useState } from 'react'
import { Switch } from '@material-ui/core'
import { useStyles } from './style'

export interface IVolumeHeatmapSwitch {
    onSwitch: (isDiscrete: boolean) => void
    initialValue: boolean
}

export const VolumeHeatmapSwitch: React.FC<IVolumeHeatmapSwitch> = ({onSwitch, initialValue}) => {
    const [checked, setChecked] = useState(initialValue)

    const classes = useStyles()

    const handleChange = () => {
        setChecked(!checked)
        onSwitch(!checked)
    }

    return (
        <Switch
          checked={checked}
          onClick={handleChange}
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
        />
    )
}

export default VolumeHeatmapSwitch