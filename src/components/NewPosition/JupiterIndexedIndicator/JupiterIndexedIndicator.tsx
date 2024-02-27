import JupiterLogo from '@static/svg/jupiter-logo.svg'
import React from 'react'
import useStyles from './style'
import { Button } from '@material-ui/core'

interface IJupiterIndexedIndicatorProps {
  isIndexed: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const JupiterIndexedIndicator: React.FC<IJupiterIndexedIndicatorProps> = ({
  isIndexed,
  onClick
}) => {
  const classes = useStyles()

  return (
    <Button onClick={onClick} className={classes.iconBtn} disabled={!isIndexed} disableRipple>
      <img
        src={JupiterLogo}
        className={classes.icon}
        style={{ opacity: isIndexed ? 1 : 0.5 }}
        alt='Jupiter'
      />
    </Button>
  )
}

export default JupiterIndexedIndicator

// eslint-disable-next-line no-lone-blocks
{
  /* <Button onClick={handleClickSettings} className={classes.settingsIconBtn} disableRipple>
<img src={settingIcon} className={classes.settingsIcon} />
</Button> */
}
