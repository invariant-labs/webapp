
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel } from '@components/IDO/IdoLabel/IdoLabel'
import { Panel } from "@components/IDO/Panel/Panel" 
import { IdoInput } from "@components/IDO/IdoInput/IdoInput" 
import { ConnectWalletButton} from "@components/IDO/ConnectWalletButton/ConnectWalletButton" 
import { IdoDepositSol } from "@components/IDO/IdoDepositSol/IdoDepositSol" 
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('IDO/IdoTwoPanel', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{display:"flex", flexDirection: "row",gap: "20px"}}>
      
<div style={{display:"flex", flexDirection:"column", alignContent:"flex-start", justifyContent:"space-around", backgroundColor: "#3A466B", padding:"2%", borderRadius:"24px", width:"416px"}}>
<div style={{color:"white", marginTop:"-30px"}}> 

<h2 style= {{fontSize: "20px",lineHeight: "40px", fontFamily:"Mukta"}}> Deposit your SOL</h2>
</div>


<div style={{ backgroundColor: "#111931",  borderRadius:"24px",padding:"0px 10px" }}>
<IdoInput name="Ido Input" color='secondary' balance ={5000} conversionRate = {15.5} valueChange={2.41} onHover={action('hover')} />
</div>

<IdoDepositSol/>

<div style={{display:"grid", placeItems:"center" }}><ConnectWalletButton name='Connect Wallet' color='secondary' /></div>
</div> 

<div style={{width:"240px" }}>
<Panel endSalePeriod = "22 Feb 2022 23:59:00 GMT" endGracePeriod = "2 Feb 2022 21:45:50 GMT" solAmountContributed="122 124 846" estimatedTokenPrice= "218.839" invariantForSale = "20 000 000" />
</div>    

    </div>
  ))
  .add('hover', () => (
    <div style={{ }}>
      <IdoLabel name="Estimated Token Price" amount= "122 354 345" />
    </div>
  ))
