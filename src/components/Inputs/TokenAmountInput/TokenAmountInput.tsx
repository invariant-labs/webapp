import useStyles from './style'
import classNames from 'classnames'
import { Input } from '@material-ui/core'
import Select from '@components/Inputs/Select/Select'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'


export const TokenAmountInput = () => {
    const classes = useStyles()
    
    return (
        <Input
          //inputRef={}
          //error={}
          className={classNames(classes.amountInput, "")}
          classes={{ input: classes.input }}
          //style={}
          type={'text'}
          //value={}
          disableUnderline={true}
          //placeholder={}
          //onChange={}
          endAdornment={(
            <OutlinedButton
              name='Max'
              color='primary'
              //onClick={}
              className={classes.maxButton}
              labelClassName={classes.label}
            />
          )}
          startAdornment={(
            <Select
              centered={true}
              //tokens={}
              //currency={}
              //onSelect={}
              //current={}
              className={classes.select}
            />
          )}
        />
      )
}