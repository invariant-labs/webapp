import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel} from '@components/IDO/IdoLabel/IdoLabel'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/Panel', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabel name="Sale period ends in" amount= "15:30:33" logoSrc="clock" hasTopBorder={true} />
<IdoLabel name="Grace period ends in" amount= "32:29:27" logoSrc="clock" isDarkBg={true} />
<IdoLabel name="SOL Contributed" amount= "122 124 846" />
<IdoLabel name="Estimated token price" amount= "218.839" isDarkBg={true}/>
<IdoLabel name="Invariant for sale" amount= "20 000 000" logoSrc = {invariantLogo} hasBottomBorder={true} />

        
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
  
