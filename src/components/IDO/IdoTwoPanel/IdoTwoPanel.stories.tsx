
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel } from '@components/IDO/IdoLabel/IdoLabel'
import { IdoTwoPanelWithRange } from "@components/IDO/IdoTwoPanel/IdoTwoPanelWithRange"  
import { IdoTwoPanel } from "@components/IDO/IdoTwoPanel/IdoTwoPanel" 
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import React from "react"

storiesOf('IDO/IdoTwoPanel', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    
<IdoTwoPanel />


  ))
  .add('withRange', () => (

    <IdoTwoPanelWithRange />
 

  ))
