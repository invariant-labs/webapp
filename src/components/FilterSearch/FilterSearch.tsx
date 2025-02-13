import {
  Autocomplete,
  Box,
  Fade,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import SearchIcon from '@static/svg/lupaDark.svg'
import { forwardRef, useMemo, useState } from 'react'
import { commonTokensForNetworks, NetworkType } from '@store/consts/static'
import { colors, theme, typography } from '@static/theme'
import useStyles from './style'
import { TokenChip } from './Helpers/TokenChip'
import { TokenOption } from './Helpers/TokenOption'
import { useSelector } from 'react-redux'
import { swapTokens } from '@store/selectors/solanaWallet'
import icons from '@static/icons'
import { tokensStatsWithTokensDetails } from '@store/selectors/stats'

interface ISearchToken {
  icon: string
  name: string
  symbol: string
  address: string
  balance: any
  decimals: number
}

interface IFilterSearch {
  networkType: string
  selectedFilters: ISearchToken[]
  setSelectedFilters: React.Dispatch<React.SetStateAction<ISearchToken[]>>
  filtersAmount: number
  isFiltering?: boolean
}

export const FilterSearch: React.FC<IFilterSearch> = ({
  networkType,
  selectedFilters,
  setSelectedFilters,
  filtersAmount,
  isFiltering = false
}) => {
  const tokensListDetails = useSelector(tokensStatsWithTokensDetails)
  const commonTokens = commonTokensForNetworks[networkType]
  const tokensList = useSelector(swapTokens)

  const mappedTokens = useMemo(() => {
    return tokensListDetails
      .map(tokenData => {
        const details = tokenData.tokenDetails
        const tokenAddress = details?.address?.toString() ?? tokenData.address.toString()
        const tokenFromList = tokensList.find(token => token.address.toString() === tokenAddress)
        return {
          icon: details?.logoURI ?? icons.unknownToken,
          name: details?.name ?? tokenData.address.toString(),
          symbol: details?.symbol ?? tokenData.address.toString(),
          address: tokenAddress,
          balance: tokenFromList ? tokenFromList.balance : 0,
          decimals: tokenFromList ? tokenFromList.decimals : 0
        }
      })
      .sort((a, b) => {
        const aHasBalance = Number(a.balance) > 0
        const bHasBalance = Number(b.balance) > 0
        const aIsCommon = commonTokens.some(token => token.toString() === a.address)
        const bIsCommon = commonTokens.some(token => token.toString() === b.address)
        if (aHasBalance && !bHasBalance) return -1
        if (!aHasBalance && bHasBalance) return 1
        if (aIsCommon && !bIsCommon) return -1
        if (!aIsCommon && bIsCommon) return 1
        return 0
      })
  }, [tokensListDetails, tokensList, commonTokens])

  const isTokensSelected = selectedFilters.length === filtersAmount
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const { classes } = useStyles({ isSmall })
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // Opcje, które nie zostały jeszcze wybrane
  const options: ISearchToken[] = useMemo(() => {
    return mappedTokens.filter(
      token => !selectedFilters.some(selected => selected.address === token.address)
    )
  }, [mappedTokens, selectedFilters])

  // Jeśli isFiltering jest true, nie otwieramy listy opcji
  const shouldOpenPopper = !isTokensSelected && open && !isFiltering

  const networkUrl = useMemo(() => {
    switch (networkType) {
      case NetworkType.Mainnet:
        return ''
      case NetworkType.Testnet:
        return '?cluster=testnet'
      case NetworkType.Devnet:
        return '?cluster=devnet'
      default:
        return '?cluster=testnet'
    }
  }, [networkType])

  const PaperComponent = (paperProps, ref) => {
    return (
      <Fade in timeout={300}>
        <Paper {...paperProps} ref={ref}>
          <Box>{paperProps.children}</Box>
        </Paper>
      </Fade>
    )
  }

  const CustomPopper = props => {
    return <Popper {...props} placement='bottom-start' modifiers={[]} />
  }

  const PaperComponentForward = forwardRef(PaperComponent)

  // Po usunięciu chipa zamykamy listę (analogicznie jak przy dodawaniu)
  const handleRemoveToken = (tokenToRemove: ISearchToken) => {
    setSelectedFilters(prev => prev.filter(token => token.address !== tokenToRemove.address))
    setOpen(false)
  }

  // Po wybraniu tokena zamykamy listę, aby uniknąć migotania
  const handleAutoCompleteChange = (_event: any, newValue: ISearchToken[]) => {
    setSelectedFilters(newValue)
    setInputValue('')
    setOpen(false)
  }

  return (
    <Autocomplete
      multiple
      disablePortal
      disableClearable
      id='token-selector'
      disableCloseOnSelect={!isTokensSelected}
      value={selectedFilters}
      popupIcon={null}
      onChange={handleAutoCompleteChange}
      PopperComponent={CustomPopper}
      PaperComponent={PaperComponentForward}
      options={options}
      classes={{ paper: classes.paper }}
      open={shouldOpenPopper}
      getOptionLabel={option => option.symbol}
      onOpen={() => {
        if (!isFiltering) setOpen(true)
      }}
      onClose={() => setOpen(false)}
      noOptionsText={<Typography className={classes.headerText}>No tokens found</Typography>}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }
        },
        width: isSmall ? '100%' : 'auto'
      }}
      ListboxProps={{
        autoFocus: true,
        sx: {
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: colors.invariant.newDark
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.invariant.pink,
            borderRadius: '3px'
          }
        },
        style: { maxHeight: !isSmall ? '300px' : '540px' }
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <TokenChip option={option} onRemove={handleRemoveToken} {...getTagProps({ index })} />
        ))
      }
      renderOption={(props, option) => (
        <Box component='li' {...props} sx={{ padding: '0 !important' }}>
          <TokenOption option={option} networkUrl={networkUrl} isSmall={isSmall} />
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          variant='outlined'
          className={classes.searchBar}
          placeholder={selectedFilters.length === 0 ? 'Search token' : ''}
          value={inputValue}
          InputProps={
            {
              ...params.InputProps,
              style: {
                padding: 0,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                ...typography.body2
              },
              readOnly: isTokensSelected || isFiltering,
              endAdornment: (
                <InputAdornment position='end'>
                  <img src={SearchIcon} className={classes.searchIcon} alt='Search' />
                </InputAdornment>
              ),
              inputProps: {
                ...params.inputProps,
                style: { paddingLeft: '12px' }
              },
              onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (params.inputProps.onKeyDown) {
                  params.inputProps.onKeyDown(event)
                }
                if (event.key === 'Backspace' && event.currentTarget.value === '') {
                  if (selectedFilters.length > 0) {
                    const lastToken = selectedFilters[selectedFilters.length - 1]
                    handleRemoveToken(lastToken)
                  }
                }
              }
            } as any
          }
          onClick={() => {
            if (!isTokensSelected && !isFiltering) setOpen(true)
          }}
        />
      )}
    />
  )
}
