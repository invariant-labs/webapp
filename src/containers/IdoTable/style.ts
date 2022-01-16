import { makeStyles, Theme } from '@material-ui/core/styles'
import { typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  idoTableIcon: {
    width: 20,
    marginRight: '5px'
  },
  tableComponentText: {
    color: 'white',
    ...typography.label1,
    fontSize: 19,
    lineHeight: 1,
  },
  tableComponentWrapper: {
    maxWidth: '224px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px',
      maxWidth: '400px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px'
    },
    [theme.breakpoints.down('lg')]: {
      padding: '0 16px'
    },
  },
  tableHeaderText: {
    color: "#7F768F",
    tabSize: 4,
    fontSize: "12",
    fontWeight: 400,
  },
  tableWrapper: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  floatFirstEl: {
    float:"left"
  },
  floatSecondEl: {
    float:"left"
  },
  saleDiv: {
    padding:'4.5px',
    marginTop: '63px',
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    textAlign: 'center',
    backgroundColor: "#27262B"
  },
  graceDiv: {
    padding:'4.5px',
    textAlign: 'center',
    backgroundColor: "#1C1B1E"
  },
  solDiv: {
    padding:'4.5px',
    textAlign: 'center',
    backgroundColor: "#27262B"
  },
  estimatedDiv: {
    padding:'4.5px',
    textAlign: 'center',
    backgroundColor: "#1C1B1E"
  },
  invariantDiv: {
    padding:'4.5px',
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    textAlign: 'center',
    backgroundColor: "#27262B"
  }

}))

export default useStyles
