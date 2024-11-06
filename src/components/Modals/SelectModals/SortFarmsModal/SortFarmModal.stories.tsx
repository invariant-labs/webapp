// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import { withKnobs } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions'
// import { SortItem } from '@components/Inputs/SortSelect/SortSelect'
// import SortFarmModal from './SortFarmModal'
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
//     name: '↑ Ascending'
//   },
//   {
//     name: '↓ Descending'
//   },
//   {
//     name: '● All'
//   }
// ]

// storiesOf('newModals/sortFarms', module)
//   .addDecorator(withKnobs)
//   .add('activity', () => (
//     <SortFarmModal
//       sortItems={activity}
//       open={true}
//       handleClose={() => {}}
//       anchorEl={null}
//       onSelect={(chosen: string) => action(`chosen index: ${chosen}`)()}
//       onlyText={false}
//     />
//   ))
//   .add('tokens', () => (
//     <SortFarmModal
//       sortItems={tokens}
//       open={true}
//       handleClose={() => {}}
//       anchorEl={null}
//       onSelect={(chosen: string) => action(`chosen index: ${chosen}`)()}
//       onlyText={false}
//     />
//   ))
//   .add('TVL/APY', () => (
//     <SortFarmModal
//       sortItems={TVL}
//       open={true}
//       handleClose={() => {}}
//       anchorEl={null}
//       onSelect={(chosen: string) => action(`chosen index: ${chosen}`)()}
//       onlyText={true}
//     />
//   ))
export default {}
