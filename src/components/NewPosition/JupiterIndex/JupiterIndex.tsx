import jupiterIndexIcon from '@static/svg/jupiter.svg'
import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { isPoolIndexed } from '@consts/utils'
import { Box, List, ListItem, Tooltip, Typography } from '@material-ui/core'

interface IJupiterIndex {
  address: string
}

const JupiterIndex: React.FC<IJupiterIndex> = ({ address }) => {
  const classes = useStyles()
  const [indexed, setIndexed] = useState<boolean>(false)

  useEffect(() => {
    if (!address) {
      setIndexed(false)
      return
    }
    void (async () => {
      const indexedStatus = await isPoolIndexed('C7XR5hH5wRAYNsKWbjQUT8Hs4QFZ84LXUHDEx32m783Y')
      setIndexed(indexedStatus)
    })()
  }, [address])

  return (
    <Tooltip
      placement='bottom'
      interactive={true}
      classes={{
        tooltip: classes.jupiterTooltip
      }}
      title={
        <>
          <Typography className={classes.jupiterTitle}>Jupiter Indexing</Typography>
          <Typography className={classes.jupiterStatus}>
            Status:{' '}
            <Box component='span' color={indexed ? '#2ee09a' : '#fb555f'}>
              {indexed ? 'Indexing active' : 'Indexing inactive'}
            </Box>
          </Typography>
          <Typography className={classes.jupiterDesc}>
            An indexed pool enhances your position's accessibility across the Solana ecosystem,
            boosting profitability.
          </Typography>

          <Typography className={classes.jupiterDesc}>
            If a pool is not yet indexed, meeting three requirements will enable its indexing:
            <List className={classes.jupiterRequirements} dense={true} disablePadding={true}>
              <ListItem className={classes.jupiterRequirement}>
                Ensure your token exists on-chain with metadata following the{' '}
                <a
                  href='https://docs.metaplex.com/programs/token-metadata/token-standard'
                  className={classes.metaplexLink}>
                  Metaplex Token Metadata
                </a>
                .
              </ListItem>
              <ListItem className={classes.jupiterRequirement}>
                Maintain at least $250 liquidity on both buy and sell sides.
              </ListItem>
              <ListItem className={classes.jupiterRequirement}>
                Limit buy and sell price impact to 30% to prevent single-sided liquidity markets.
              </ListItem>
            </List>
          </Typography>

          <Typography className={classes.jupiterDesc} style={{ marginBottom: 0 }}>
            Once these criteria are met, Jupiter automatically lists your token within minutes
            (usually up to ~30 min).
          </Typography>
        </>
      }>
      <img
        className={classes.icon}
        src={jupiterIndexIcon}
        style={{ opacity: indexed ? 1 : 0.3 }}
        alt={`${indexed ? 'Glowing' : 'Unlit'} Jupiter icon`}
      />
    </Tooltip>
  )
}

export default JupiterIndex
