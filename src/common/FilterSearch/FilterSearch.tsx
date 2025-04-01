import {
  Autocomplete,
  AutocompleteOwnerState,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  Box,
  Fade,
  InputAdornment,
  InputProps,
  Paper,
  PaperProps,
  Popper,
  PopperProps,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { forwardRef, useMemo, useState, useCallback, memo } from 'react'
import { commonTokensForNetworks, NetworkType } from '@store/consts/static'
import { theme, typography } from '@static/theme'
import { TokenChip } from './Helpers/TokenChip'
import { TokenOption } from './Helpers/TokenOption'
import { useSelector } from 'react-redux'
import { swapTokens } from '@store/selectors/solanaWallet'
import icons from '@static/icons'
import { tokensStatsWithTokensDetails } from '@store/selectors/stats'
import ListboxComponent from './Helpers/ListBoxComponent'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

type Breakpoint = 'md' | 'sm'
import { printBN } from '@utils/utils'
import useStyles from './styles'

export interface ISearchToken {
  icon: string
  name: string
  symbol: string
  address: string
  balance: BN
  decimals: number
  balanceUSD?: number
}
interface ITokenBalance {
  address: PublicKey
  balance: BN
  decimals: number
}
interface IFilterSearch {
  networkType: string
  selectedFilters: ISearchToken[]
  setSelectedFilters: React.Dispatch<React.SetStateAction<ISearchToken[]>>
  filtersAmount: number
  bp?: Breakpoint
  loading?: boolean
  closeOnSelect?: boolean
}

const CustomPopper = memo((props: PopperProps) => {
  return <Popper {...props} placement='bottom-start' />
})

const PaperComponent = forwardRef<HTMLDivElement, PaperProps>((paperProps, ref) => {
  return (
    <Fade in timeout={300}>
      <Paper {...paperProps} ref={ref}>
        <Box>{paperProps.children}</Box>
      </Paper>
    </Fade>
  )
})
export const FilterSearch: React.FC<IFilterSearch> = memo(
  ({
    networkType,
    selectedFilters,
    setSelectedFilters,
    filtersAmount,
    bp = 'sm',
    loading = false,
    closeOnSelect = false
  }) => {
    const tokensListDetails = useSelector(tokensStatsWithTokensDetails)
    const commonTokens = commonTokensForNetworks[networkType]
    const tokensList = useSelector(swapTokens)
    const [open, setOpen] = useState(false)

    const tokenListMap = useMemo(() => {
      const map = new Map<string, ITokenBalance>()
      tokensList.forEach(token => {
        map.set(token.address.toString(), token)
      })
      return map
    }, [tokensList])

    const commonTokensSet = useMemo(
      () => new Set(commonTokens.map(token => token.toString())),
      [commonTokens]
    )

    const mappedTokens = useMemo(() => {
      return tokensListDetails
        .map(tokenData => {
          const details = tokenData.tokenDetails
          const tokenAddress = details?.address?.toString() ?? tokenData.address.toString()
          const tokenFromList = tokenListMap.get(tokenAddress)
          const price = tokenData.price
          const balanceUSD =
            price && tokenFromList
              ? +printBN(tokenFromList.balance, tokenData.tokenDetails?.decimals) * price
              : 0

          return {
            icon: details?.logoURI ?? icons.unknownToken,
            name: details?.name ?? tokenData.address.toString(),
            symbol: details?.symbol ?? tokenData.address.toString(),
            address: tokenAddress,
            balance: tokenFromList ? tokenFromList.balance : 0,
            decimals: tokenFromList ? tokenFromList.decimals : 0,
            balanceUSD: balanceUSD
          }
        })
        .sort((a, b) => {
          const aHasBalance = Number(a.balance) > 0
          const bHasBalance = Number(b.balance) > 0
          const aIsCommon = commonTokensSet.has(a.address)
          const bIsCommon = commonTokensSet.has(b.address)
          if (a.balanceUSD !== b.balanceUSD) return b.balanceUSD - a.balanceUSD

          if (aHasBalance && !bHasBalance) return -1
          if (!aHasBalance && bHasBalance) return 1
          if (aIsCommon && !bIsCommon) return -1
          if (!aIsCommon && bIsCommon) return 1
          const aAddressEqualsName = a.address === a.symbol
          const bAddressEqualsName = b.address === b.symbol
          if (aAddressEqualsName && !bAddressEqualsName) return 1
          if (!aAddressEqualsName && bAddressEqualsName) return -1

          return 0
        })
    }, [tokensListDetails, tokenListMap, commonTokensSet])

    const isTokensSelected = selectedFilters.length === filtersAmount
    const isSmall = useMediaQuery(theme.breakpoints.down(bp))
    const { classes } = useStyles({ isSmall })

    const shouldOpenPopper = useMemo(() => !isTokensSelected && open, [isTokensSelected, open])

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

    const handleRemoveToken = useCallback(
      (tokenToRemove: ISearchToken) => {
        setSelectedFilters(prev => prev.filter(token => token.address !== tokenToRemove.address))
      },
      [setSelectedFilters]
    )

    const handleAutoCompleteChange = useCallback(
      (_event: React.SyntheticEvent, newValue: ISearchToken[]) => {
        setSelectedFilters(newValue)
        closeOnSelect ? setOpen(false) : setOpen(true)
      },
      [setSelectedFilters, closeOnSelect]
    )

    const handleOpenPopper = useCallback(() => {
      if (!isTokensSelected) {
        setOpen(true)
      }
    }, [isTokensSelected])

    const handleClosePopper = useCallback(() => {
      setOpen(false)
    }, [])

    const renderOption = useCallback(
      (
        autocompleteProps: React.HTMLAttributes<HTMLLIElement> & { key: number },
        option: ISearchToken,
        _state: AutocompleteRenderOptionState,
        _ownerState: AutocompleteOwnerState<ISearchToken, true, false, false, 'div'>
      ): React.ReactNode => {
        const { key, ...autocompletePropsWithoutKey } = autocompleteProps

        return (
          <Box
            component='li'
            key={key}
            {...autocompletePropsWithoutKey}
            sx={{ padding: '0 !important' }}>
            <TokenOption option={option} networkUrl={networkUrl} isSmall={isSmall} />
          </Box>
        )
      },
      [networkUrl, isSmall]
    )

    const renderTags = useCallback(
      (value: ISearchToken[], getTagProps: AutocompleteRenderGetTagProps) =>
        value.map((option, index) => {
          const { key, ...tagPropsWithoutKey } = getTagProps({ index })
          return (
            <TokenChip
              key={key}
              option={option}
              onRemove={handleRemoveToken}
              {...tagPropsWithoutKey}
            />
          )
        }),
      [handleRemoveToken]
    )

    const handleKeyDown = useCallback(
      (
        event: React.KeyboardEvent<HTMLInputElement>,
        inputProps: React.InputHTMLAttributes<HTMLInputElement>
      ) => {
        if (inputProps.onKeyDown) {
          inputProps.onKeyDown(event)
        }
        if (event.key === 'Backspace' && event.currentTarget.value === '') {
          if (!isTokensSelected && selectedFilters.length > 0) {
            const lastToken = selectedFilters[selectedFilters.length - 1]
            handleRemoveToken(lastToken)
          }
        }
      },
      [handleRemoveToken, isTokensSelected, selectedFilters]
    )

    const renderInput = useCallback(
      (params: AutocompleteRenderInputParams) => {
        const newInputProps: Partial<InputProps> = {
          ...params.InputProps,
          style: {
            padding: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            ...typography.body2
          },
          endAdornment: (
            <InputAdornment position='end'>
              <img src={icons.searchIcon} className={classes.searchIcon} alt='Search' />
            </InputAdornment>
          ),
          inputProps: {
            ...params.inputProps,
            readOnly: isTokensSelected,
            style: { paddingLeft: '12px' }
          },
          onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(event, params.inputProps)
        }
        return (
          <TextField
            {...params}
            variant='outlined'
            className={classes.searchBar}
            placeholder={selectedFilters.length === 0 ? 'Search token' : ''}
            InputProps={newInputProps}
            onClick={handleOpenPopper}
          />
        )
      },
      [
        classes.searchBar,
        classes.searchIcon,
        handleKeyDown,
        handleOpenPopper,
        isTokensSelected,
        selectedFilters.length
      ]
    )

    return (
      <Autocomplete<ISearchToken, true, false, false, 'div'>
        multiple
        disablePortal
        id='token-selector'
        isOptionEqualToValue={(option, value) => option.address === value.address}
        disableCloseOnSelect={closeOnSelect ? closeOnSelect : !isTokensSelected || !loading}
        value={selectedFilters}
        popupIcon={null}
        onChange={handleAutoCompleteChange}
        ListboxComponent={ListboxComponent}
        PopperComponent={CustomPopper}
        PaperComponent={PaperComponent}
        options={mappedTokens}
        classes={{ paper: classes.paper }}
        open={shouldOpenPopper}
        getOptionLabel={option => option.symbol}
        onOpen={handleOpenPopper}
        onClose={handleClosePopper}
        filterOptions={(options, { inputValue }) => {
          const trimmedInput = inputValue.trim().toLowerCase()
          if (!trimmedInput) return options

          return options.filter(
            option =>
              option.symbol.toLowerCase().includes(trimmedInput) ||
              option.name.toLowerCase().includes(trimmedInput) ||
              option.address.toLowerCase().includes(trimmedInput)
          )
        }}
        noOptionsText={<Typography className={classes.headerText}>No tokens found</Typography>}
        componentsProps={{
          popper: {
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'viewport'
                }
              }
            ]
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }
          },
          width: isSmall ? '100%' : 'auto'
        }}
        renderTags={renderTags}
        renderOption={renderOption}
        renderInput={renderInput}
      />
    )
  }
)

export const MemoizedTokenOption = memo(TokenOption)
