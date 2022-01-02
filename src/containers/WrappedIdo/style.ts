import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  idoTitle: {
    color: 'white',
    fontSize: '20px',
    paddingBottom: '28px'
  },
  idoWrapper: {
    color: 'primary',
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 780px)': {
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  },
  leftGrid: {
    width: '408px',
    borderRadius: '10px',
    height: '340px',
    background: '#222126',
    marginRight: '10px',
    '@media (max-width: 780px)': {
      maxWidth: '336px',
      marginBottom: '20px',
      marginRight: '0px'
    }
  },
  idoLeft1: {
    width: '360px',
    alignSelf: 'center',
    color: 'white',
    '@media (max-width: 780px)': {
      width: '288px'
    }
  },
  idoLeft2: {
    color: 'white',
    alignSelf: 'center',
    '@media (max-width: 780px)': {
      width: '288px'
    }
  },
  idoLeft21: {
  },
  idoLeft211: {
    fontSize: '14px',
    color: '#7F768F'
  },
  idoLeft212: {
    fontSize: '14px',
    color: '#7F768F'
  },
  idoLeft22: {
    backgroundColor: '#1C1B1E',
    width: '360px',
    border: '1px solid #34303B',
    borderRadius: '5px',
    maxHeight: '63px'
  },
  idoLeft221: {
  },
  idoLeft222: {
    fontSize: '30px',
    color: '#7F768F'
  },
  idoLeft223: {
    backgroundColor: '#9DD46D',
    height: '32px',
    padding: '7px 0',
    color: '#1C1B1E',
    // fontWeight: '400',
    borderRadius: '3px',
    minWidth: '55px'
  },
  idoLeft3: {
    width: '360px',
    alignSelf: 'center',
    color: 'white',
    '@media (max-width: 780px)': {
      width: '288px'
    }
  },
  idoLeft31: {
    fontSize: '14px',
    color: '#7F768F'
  },
  idoLeft32: {
    width: '360px',
    display: 'flex',
    flexDirection: 'row'
  },
  idoLeft33: {
    color: 'white'
  },
  idoLeft34: {
  },
  idoLeft35: {
    color: 'white'
  },
  idoLeft36: {
  },
  idoLeft361: {
    fontSize: '14px',
    color: '#7F768F'
  },
  idoLeft362: {
    fontSize: '14px',
    color: '#7F768F'
  },
  idoLeft363: {
    fontSize: '14px',
    color: '#7F768F'
  },
  idoLeft364: {
    fontSize: '14px',
    color: '#7F768F'
  },
  idoLeft4: {
    display: 'flex',
    width: '360px',
    alignSelf: 'center',
    borderRadius: '5px',
    '@media (max-width: 780px)': {
      width: '288px'
    }
  },
  rightGrid: {
    width: '240px',
    borderRadius: '10px',
    height: '340px',
    background: '#222126',
    '@media (max-width: 780px)': {
      width: '408px',
      maxWidth: '336px'
    }
  },
  rightGrid1: {
    textAlign: 'center',

    height: '68px'
  },
  rightGrid11: {
    color: '#7F768F',
    fontSize: '14px'

  },
  rightGrid12: {
    fontSize: '20px',
    color: 'white'
  },
  rightGrid2: {
    textAlign: 'center',

    backgroundColor: '#1C1B1E',
    height: '68px'
  },
  rightGrid21: {
    color: '#7F768F',
    fontSize: '14px'
  },
  rightGrid22: {
    fontSize: '20px',
    color: 'white'
  },
  rightGrid3: {
    textAlign: 'center',

    height: '68px'
  },
  rightGrid31: {
    color: '#7F768F',
    fontSize: '14px'
  },
  rightGrid32: {
    fontSize: '20px',
    color: 'white'
  },
  rightGrid4: {
    textAlign: 'center',
    backgroundColor: '#1C1B1E',
    height: '68px'
  },
  rightGrid41: {
    color: '#7F768F',
    fontSize: '14px'
  },
  rightGrid42: {
    fontSize: '20px',
    color: 'white'
  },
  rightGrid5: {
    height: '68px',
    textAlign: 'center'
  },
  rightGrid51: {
    color: '#7F768F',
    fontSize: '14px'
  },
  rightGrid52: {
    fontSize: '20px',
    color: 'white'
  }
})
