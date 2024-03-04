// import './style.css'
export const jupiterIndicatorStyles = {
  container: {
    position: 'absolute',
    height: 32,
    top: -10,
    zIndex: 999,
    right: 5,
    padding: 0,
    margin: 0
  },
  image: {
    height: 32,
    width: 32,
    filter: 'drop-shadow(0px 0px 26px #bfef8c)',
    animation: 'pulseAnimation 1s infinite'
  },
  caption: {
    fontSize: 0
  },
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 312,
    backgroundColor: '#202946',
    color: '#A9B6BF',
    padding: '10px 20px'
  },
  detail: {
    color: '#2EE09A'
  },
  link: {
    color: '#EF84F5'
  },
  headerColor: {
    color: '#fff'
  },
  button: {
    minWidth: 'none'
  }
}
