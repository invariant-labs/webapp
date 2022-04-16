import { Button, Grid } from '@material-ui/core'
import React from 'react'
import HeaderModal, { IHeaderModal } from '../HeaderModal/HeaderModal'
import TokenInfo, { ITokenInfo } from '../TokenInfo/TokenInfo'
import useStyles from './style'

interface IListModel {
  tokenInfoData: ITokenInfo
  headerModalData: IHeaderModal
}

const ListModel: React.FC<IListModel> = ({ tokenInfoData, headerModalData }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <HeaderModal {...headerModalData} />
      </Grid>
      <Grid item>
        <TokenInfo {...tokenInfoData} />
      </Grid>
      <Button className={classes.button}>Buy xBTC</Button>
    </Grid>
  )
}

export default ListModel
