import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import Calculator from "./DisplaySection";
import icons from "@static/icons";

storiesOf('DisplaySection/currency', module)
    .addDecorator(withKnobs)
    .add('DisplaySection',() =>(
          <Calculator
            currency={'SYN'}
            currencyIconSrc={icons.SNY}
            value={'12,3451'}
            decimalsLimit={4}
            outputValue={12.3451}
          ></Calculator> 
    ))