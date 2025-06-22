import { Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export const useSkeletonStyle = makeStyles()((theme: Theme) => ({
  skeletonBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  skeletonCircle40: {
    width: '40px',
    height: '40px'
  },
  skeletonCircle36: {
    width: '36px',
    height: '36px'
  },
  skeletonRect100x36: {
    width: '100px',
    height: '36px',
    marginLeft: theme.spacing(1.5),
    borderRadius: '10px'
  },
  skeletonRect60x36: {
    width: '60px',
    height: '36px',
    margin: '0 auto',
    marginRight: '8px',
    borderRadius: '10px'
  },
  skeletonRectFullWidth36: {
    width: '100%',
    height: '36px',
    borderRadius: '10px',
    margin: '0 auto'
  },
  skeletonRect32x32: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    margin: '0 auto'
  }
}))
