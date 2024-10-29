// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { withKnobs } from '@storybook/addon-knobs'
// import { colors } from '@static/theme'
// import SortSelect, { SortItem } from '@components/Inputs/SortSelect/SortSelect'
// import icons from '@static/icons'

// const activity: SortItem[] = [
//   {
//     name: 'Active',
//     icon: icons.activeIcon
//   },
//   {
//     name: 'Inactive',
//     icon: icons.inactiveIcon
//   },
//   {
//     name: 'All',
//     icon: icons.allIcon
//   }
// ]

// const tokens: SortItem[] = [
//   {
//     name: 'xUSD',
//     icon: icons.USD
//   },
//   {
//     name: 'xBTC',
//     icon: icons.BTC
//   },
//   {
//     name: 'xSOL',
//     icon: icons.SOL
//   },
//   {
//     name: 'xETH',
//     icon: icons.ETH
//   },
//   {
//     name: 'xFTT',
//     icon: icons.FTT
//   }
// ]

// const TVL: SortItem[] = [
//   {
//     name: '↑ Ascending',
//     value: 'Ascending'
//   },
//   {
//     name: '↓ Descending',
//     value: 'Descending'
//   },
//   {
//     name: '● All',
//     value: 'All'
//   }
// ]

// storiesOf('Inputs/sortSelect', module)
//   .addDecorator(withKnobs)
//   .add('activity', () => (
//     <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
//       <SortSelect
//         name='Sort farms'
//         current={activity[2]}
//         onSelect={(chosen: string) => action(`chosen index: ${chosen}`)()}
//         sortItems={activity}
//         onlyText={false}
//       />
//     </div>
//   ))
//   .add('token', () => (
//     <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
//       <SortSelect
//         name='Sort farms'
//         current={tokens[2]}
//         onSelect={(chosen: string) => action(`chosen index: ${chosen}`)()}
//         sortItems={tokens}
//         onlyText={false}
//       />
//     </div>
//   ))
//   .add('TVL/APY', () => (
//     <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
//       <SortSelect
//         name='Sort farms'
//         current={TVL[2]}
//         onSelect={(chosen: string) => action(`chosen index: ${chosen}`)()}
//         sortItems={TVL}
//         onlyText={true}
//       />
//     </div>
//   ))
export default {}
