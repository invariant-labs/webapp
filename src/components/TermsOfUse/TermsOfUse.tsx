import React, { useState } from 'react'
import { Box, Typography, Checkbox, Link, FormControlLabel } from '@mui/material'
import useStyles from './style'
import { logoTitleIcon } from '@static/icons'
import { Button } from '@common/Button/Button'
import { colors } from '@static/theme'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'

interface TermsModalProps {
  openTerms: () => void
  handleContinue: () => void
}

const TermsModal: React.FC<TermsModalProps> = ({ openTerms, handleContinue }) => {
  const { classes } = useStyles()
  const [accepted, setAccepted] = useState(false)

  if (!open) return null

  return (
    <div className={classes.overlay}>
      <div className={classes.container}>
        <Box className={classes.header}>
          <img src={logoTitleIcon} className={classes.logo} />
        </Box>

        <Typography className={classes.heading}>Terms of Use</Typography>

        <Typography className={classes.description}>
          Please make sure to read and understand the{' '}
          <Link className={classes.link} href='#' onClick={openTerms}>
            Terms of Use
          </Link>{' '}
          before entering the application.
        </Typography>

        <Box display='flex' alignItems='center' gap={1} marginTop={2}>
          <FormControlLabel
            className={classes.form}
            control={
              <Checkbox
                checked={accepted}
                onChange={e => setAccepted(e.target.checked)}
                className={classes.checkbox}
              />
            }
            label={
              <>
                <span>Agree to the</span>
                <span className={classes.pink}> Terms of Use.</span>
              </>
            }
          />
        </Box>
        <TooltipHover
          title={
            accepted ? '' : 'You need to accept the Terms and Use before entering the application.'
          }
          color={colors.invariant.warning}
          fullSpan>
          <Button
            disabled={!accepted}
            onClick={() => {
              if (accepted) handleContinue?.()
            }}
            scheme='green'
            style={{
              color: colors.invariant.newDark,
              width: '100%'
            }}>
            Continue
          </Button>
        </TooltipHover>
      </div>
    </div>
  )
}

export default TermsModal
