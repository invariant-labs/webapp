import { Grid } from "@material-ui/core";
import React from "react";
import BondHeader from "../BondHeader/BondHeader";
import BondItem from "../BondItem/BondItem";
import { useStyles } from "./style";

interface BondListInterface {
    data: Array<{
        icon: string
        secoundIcon: string
        symbol: string
        secoundSymbol: string
        decimals: number
        price: number
        roiPercent: string
        purchased: string
        vesting: string
    }>
}

const BondList: React.FC<BondListInterface> = ({ data }) => {
    const classes = useStyles()

    return(
        <Grid className={classes.container}>
            <BondHeader />
            {data.map((element, index) => (
                <BondItem 
                icon={element.icon}
                secoundIcon={element.secoundIcon}
                symbol={element.symbol}
                secoundSymbol={element.secoundSymbol}
                decimals={element.decimals}
                price={element.price}
                roiPercent={element.roiPercent}
                purchased={element.purchased}
                vesting={element.vesting}
                />
            ))}
        </Grid>
    )
}

export default BondList