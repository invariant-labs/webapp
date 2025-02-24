import React from 'react'
import { Dialog, DialogContent, IconButton, Box, Typography } from '@mui/material'
import useStyles from './style'
import icons from '@static/icons'
import { social } from '@static/links'

const socials = [
  { label: 'Discord', icon: icons.discordFill, url: social.discord },
  { label: 'X (formerly Twitter)', icon: icons.xFill, url: social.x },
  { label: 'Telegram', icon: icons.telegramFill, url: social.telegram },
  { label: 'Github', icon: icons.githubFill, url: social.github },
  { label: 'Medium', icon: icons.mediumFill, url: social.medium },
  { label: 'Docs', icon: icons.docsFill, url: social.docs }
]

export interface ISelectSocialsModal {
  open: boolean
  handleClose: () => void
}

export const SelectSocials: React.FC<ISelectSocialsModal> = ({ open, handleClose }) => {
  const { classes } = useStyles()
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ className: classes.paper }} fullWidth>
      <Box className={classes.header}>
        <Typography>Socials</Typography>
        <IconButton onClick={handleClose}>
          <img src={icons.closeModal} alt='close icon' />
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: 0 }}>
        <Box className={classes.socialsContainer}>
          {socials.map(social => (
            <Box
              key={social.label}
              className={classes.social}
              component='a'
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'>
              <Box className={classes.label}>
                <img src={social.icon} alt={social.label} />
                <Typography>{social.label}</Typography>
              </Box>
              <img width={14} src={icons.newTab} alt='Token address' />
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SelectSocials
