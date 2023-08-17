import {FormControlLabel, Switch} from "@material-ui/core";
import React from "react";

export const HeatMapSwitch = ()=>{
    return (
        <div style={{ marginRight: '-12px', marginLeft: '18px' }}><FormControlLabel label={''} control={<Switch size={"small"}/>} ></FormControlLabel>
        </div>
    )
}
