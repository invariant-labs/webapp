import React from 'react'
import useStyles from './styles'
import { default as useStylesLabel } from '@components/Labels/IDOLabels/style'
import { Grid } from '@material-ui/core'
import { IDOContainer } from '@containers/IDO/IDOContainer'
import { IDOLabelsFull } from '@components/Labels/IDOLabels/IDOLabelsFull'
import { IIDOInputProps } from '@components/Inputs/IDOInput/IDOInput'
import { IIDOInsidesProps } from '@components/IDO/Insides/IDOInsides'
import { IWideButtonProps } from '@components/WideButton/WideButton'

export const IDOPage: React.FC = () => {
  const classes = useStyles()
  const classesLabel = useStylesLabel()

  const IDOLabelsData = [
    {
      className: classesLabel.top,
      title: 'Sale period ends in',
      icon: '/src/static/svg/clockWhite.svg',
      value: '15:30:33'
    },
    {
      className: classesLabel.middleDark,
      title: 'Grace period ends in',
      icon: 'src/static/svg/clockWhite.svg',
      value: '32:29:27'
    },
    {
      title: 'SOL Contributed',
      icon: 'src/static/svg/blueElipse.svg',
      value: '122 124 846'
    },
    {
      className: classesLabel.middleDark,
      title: 'Estimated token price',
      icon: 'src/static/svg/blueElipse.svg',
      value: '218.839'
    },
    {
      className: classesLabel.bottom,
      title: 'INVARIANT for sale',
      icon: '/src/static/svg/LogoShort.svg',
      value: '20 000 000'
    }
  ]

  const IDOInputData: IIDOInputProps = {
    currencyIcon: '/src/static/svg/blueElipse.svg',
    currencyShort: 'SNY',
    onChange: () => {},
    inputValue: 0.000001,
    balanceCurrency: 'SNY',
    balanceValue: '102 460.3445',
    changePercent: -4.14,
    bigNumberRightBottom: '205 341.4361',
    onMaxClick: () => {}
  }

  const IDOInsidesData: IIDOInsidesProps = {
    valuexUSD: 46.643,
    valueUSD: 47.43,
    valueSOL: 0.0432,
    valuexETH: '0.0000',
    valuexBTC: '0.0000'
  }

  const IWideButtonData: IWideButtonProps = {
    name: 'Connect a wallet'
  }

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <IDOContainer
          IDOInput={IDOInputData}
          IDOInsides={IDOInsidesData}
          IWideButton={IWideButtonData}
        />
      </Grid>
      <Grid item>
        <IDOLabelsFull labels={IDOLabelsData} />
      </Grid>
    </Grid>
  )
}

export default IDOPage
