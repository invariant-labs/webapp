import React from 'react'
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import InputSection from "./InputSection";
import icons from '@static/icons';


storiesOf('InputSection/Currency', module)
  .addDecorator(withKnobs)
  .add('InputSection', () => (
      <InputSection
        setValue={() => {}}
        placeholder={'12,3451'}
        coin={'SYN'}
        currencyIconSrc={icons.SNY}
        onMaxClick={() => {}}
        decimalsLimit={4}
        percentageChange={-4.15}
        balanceValue={'460.3445'}
        usdValue={205341.43}
      />
  ))