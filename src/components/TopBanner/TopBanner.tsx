import { Box } from '@mui/material'
import icons from '@static/icons'
import { colors, theme, typography } from '@static/theme'

interface INormalBannerProps {
  onClose: () => void
  isHiding: boolean
}

export const TopBanner = ({ onClose, isHiding }: INormalBannerProps) => {
  const bannerHeight = 'fit-content'

  return (
    <Box
      sx={{
        position: 'relative',
        background: colors.invariant.light,
        padding: isHiding ? '0px 0px' : { xs: '12px 16px', sm: '10px 25px' },
        width: '100%',
        maxWidth: '100%',
        height: isHiding ? '0px' : bannerHeight,
        display: 'flex',
        ...typography.body1,
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        color: colors.invariant.text,
        margin: isHiding ? '0' : undefined,
        overflow: 'hidden',
        opacity: isHiding ? 0 : 1,
        transition: 'all 0.3s ease-in-out',
        willChange: 'height,padding,margin'
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          transform: isHiding ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease-in-out',
          width: '100%',
          maxWidth: { xs: '100%', sm: '350px' },
          position: 'relative',
          gap: '12px'
        }}>
        <Box
          component='img'
          src={icons.airdrop}
          sx={{
            width: { xs: '20px', sm: '24px' },
            height: { xs: '20px', sm: '24px' },
            minWidth: { xs: '20px', sm: '24px' },
            objectFit: 'contain'
          }}
        />
        <Box
          sx={{
            display: 'inline',
            width: 'fit-content',
            fontSize: { xs: '14px', sm: '16px' },
            flex: 1,
            [theme.breakpoints.up('md')]: {
              textWrap: 'nowrap'
            }
          }}>
          Invariant Points are live on Eclipse! Check it out
          <span
            style={{
              color: colors.invariant.pink,
              textDecoration: 'underline',
              marginLeft: '6px',
              cursor: 'pointer',
              ...typography.body1
            }}
            onClick={() => {
              window.open('https://eclipse.invariant.app/points', '_blank')
            }}>
            here!
          </span>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '8px', sm: '25px' },
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: colors.invariant.text,
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}>
        <Box
          component='img'
          src={icons.closeSmallIcon}
          sx={{
            width: { xs: '10px', sm: '11px' },
            height: { xs: '10px', sm: '11px' },
            minWidth: { xs: '10px', sm: '11px' }
          }}
          alt='Close'
        />
      </Box>
    </Box>
  )
}
