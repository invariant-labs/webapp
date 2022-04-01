import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import BondList from "./BondList";

storiesOf('bonds/BondList', module).addDecorator(withKnobs).add('BondList', () => {
    const [data] = React.useState(
        Array(4).fill({}).map(() => {
            return {
                icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
                secoundIcon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
                symbol: 'xSOL',
                secoundSymbol: 'xBTC' ,
                decimals: 2,
                price: 122235,
                roiPercent: '3413.34',
                purchased: '100,434,444.44', 
                vesting: '10'
            }
        })
    )
    return <BondList data={data} />
})