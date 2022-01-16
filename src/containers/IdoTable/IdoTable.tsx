import { Grid, Typography, Box } from '@material-ui/core'
import useStyles from './style'
import { TokenAmountInput } from '../../components/Inputs/TokenAmountInput/TokenAmountInput'
import ConnectAWalletButton from '../../components/ConnectAWalletButton/ConnectAWalletButton'

interface Props {
    saleTime?: string,
    graceTime?: string,
    sol?: string,
    estPrice?: string,
    invariant?: string,
  }

export const IdoTable:React.FC<Props> = 
({
    saleTime,
    graceTime,
    sol,
    estPrice,
    invariant,
}) => {
    const classes = useStyles()
    return (
        <Grid container direction='column' className={classes.tableComponentWrapper}>
            <div className={classes.saleDiv}>
                <Typography className={`${classes.tableHeaderText}`}>
                        Sale period ends in
                </Typography>
                <div className={classes.tableWrapper}>
                    <div className={classes.floatFirstEl}>
                        <img src="/src/static/png/clock.png" className={classes.idoTableIcon}></img>
                    </div>
                    <div className={classes.floatSecondEl}>
                        <Typography className={`${classes.tableComponentText}`}>
                            {saleTime}
                         </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.graceDiv}>
                
                <Typography className={`${classes.tableHeaderText}`}>
                    Grace period ends in
                </Typography>
                <div className={classes.tableWrapper}>
                    <div className={classes.floatFirstEl}>
                            <img src="/src/static/png/clock.png" className={classes.idoTableIcon}></img>
                    </div>
                    <div className={classes.floatSecondEl}>
                        
                        <Typography className={`${classes.tableComponentText}`}>
                            {graceTime}
                         </Typography>
                    </div>
                </div>
                    
            </div>
            <div className={classes.solDiv}>
                
                <Typography className={`${classes.tableHeaderText}`}>
                    SOL contributed in
                </Typography>
                <div className={classes.tableWrapper}>
                    <div className={classes.floatFirstEl}>
                            <img src="/src/static/png/sol.png" className={classes.idoTableIcon}></img>
                    </div>
                    <div className={classes.floatSecondEl}>
                        
                        <Typography className={`${classes.tableComponentText}`}>
                            {sol}
                         </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.estimatedDiv}>
                
                <Typography className={`${classes.tableHeaderText}`}>
                    Estimated token price
                </Typography>
                <div className={classes.tableWrapper}>
                    <div className={classes.floatFirstEl}>
                            <img src="/src/static/png/dollar.png" className={classes.idoTableIcon}></img>
                    </div>
                    <div className={classes.floatSecondEl}>
                        
                        <Typography className={`${classes.tableComponentText}`}>
                            {estPrice}
                         </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.invariantDiv}>
                
                <Typography className={`${classes.tableHeaderText}`}>
                    INVARIANT for sale
                </Typography>
                <div className={classes.tableWrapper}>
                    <div className={classes.floatFirstEl}>
                            <img src="/src/static/png/invariant-logo.png" className={classes.idoTableIcon}></img>
                    </div>
                    <div className={classes.floatSecondEl}>
                        
                        <Typography className={`${classes.tableComponentText}`}>
                            {invariant}
                         </Typography>
                    </div>
                </div>
            </div>
        </Grid>

  )
}

export default IdoTable;