import { Grid, Typography, Box } from '@material-ui/core'
import useStyles from './style'
import { TokenAmountInput } from '../Inputs/TokenAmountInput/TokenAmountInput'
import ConnectAWalletButton from '../ConnectAWalletButton/ConnectAWalletButton'

interface Props {
    header?: string,
    estValue?: string,
    balanceValue?: string,
    xUSD?: string,
    USD?: string,
    SOL?: string,
    xETH?: string,
    xBTC?: string,
  }

export const Ido:React.FC<Props> = 
({ header, 
   estValue, 
   balanceValue,
   xUSD,
   USD,
   SOL,
   xETH,
   xBTC
}) => {
    const classes = useStyles()
    return (
    <Grid container className={classes.idoWrapper}>
        <Grid container className={classes.header}>
        <Typography component='h1'>IDO</Typography>
        </Grid>
        <Grid container className={classes.root} direction='column'>
            <Grid container className={classes.header}>
            <Typography component='h1'>{header}</Typography>
            </Grid>
            <Box className={classes.tokenComponentTextContainer}>
                <Typography className={classes.tokenComponentText}>EST.:{estValue} </Typography>
                <Typography className={classes.tokenComponentText}>Balance:{balanceValue}</Typography>
            </Box>
            <TokenAmountInput/>
                <Typography className={classes.tokenComponentText}>Deposited Amount:</Typography>
                <Grid container spacing={0}> 
                    <Grid item>
                        <img src="/src/static/png/logo.png" className={classes.invariantLogoIDO}></img>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.xUSD}>${xUSD}</Typography>
                        <Typography className={`${classes.tokenComponentText} ${classes.USDSOLxETxBTC}`}>
                            {USD}<span className={classes.tab}></span>{SOL} <span className={classes.tab}></span>{xETH} <span className={classes.tab}></span>{xBTC} 
                        </Typography>
                    </Grid>
                </Grid>
                <ConnectAWalletButton 
                    content="Connect a wallet"
                    //other propses    
                />
        </Grid>
  </Grid>)
}

export default Ido;