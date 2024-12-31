import { Box } from '@mui/material'
import icons from '@static/icons'
import { colors, typography } from '@static/theme'

interface ITopBannerProps {
  onClose: () => void
  isHiding: boolean
}

export const TopBanner = ({ onClose, isHiding }: ITopBannerProps) => {
  const bannerHeight = '44px'

  return (
    <Box
      sx={{
        position: 'relative',
        background: colors.invariant.light,
        padding: isHiding ? '0px 0px' : '10px 20px',
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
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: isHiding ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease-in-out'
        }}>
        <img
          src={icons.airdrop}
          style={{
            marginRight: '12px',
            height: '24px',
            width: '24px'
          }}
        />
        <span>
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
        </span>
      </span>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: colors.invariant.text
        }}
        onClick={onClose}>
        <img width={11} src={icons.closeSmallIcon} alt='Close'></img>
      </Box>
    </Box>
  )
}
