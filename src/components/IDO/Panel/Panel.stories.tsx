
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel} from '@components/IDO/IdoLabel/IdoLabel'
import { Panel} from '@components/IDO/Panel/Panel'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/Panel', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>



<Panel endSalePeriod = "22 Feb 2022 23:59:00 GMT" endGracePeriod = "2 Feb 2022 21:45:50 GMT" solAmountContributed="122 124 846" estimatedTokenPrice= "218.839" invariantForSale = "20 000 000" />
        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabel name="Sale period ends in" amount= "15:30:33" logoSrc="clock" hasTopBorder={true} isDarkBg={true} />
<IdoLabel name="Grace period ends in" amount= "32:29:27" logoSrc="clock"  />
<IdoLabel name="SOL Contributed" amount= "122 124 846" isDarkBg={true} />
<IdoLabel name="Estimated token price" amount= "218.839" />
<IdoLabel name="Invariant for sale" amount= "20 000 000" logoSrc = {invariantLogo} hasBottomBorder={true} isDarkBg={true} />


    </div>
  ))
  
