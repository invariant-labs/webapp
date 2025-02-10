import { Grid, Typography, useMediaQuery } from '@mui/material'
import { useStyles } from './style'
import { PopularPoolData } from '@containers/PopularPoolsWrapper/PopularPoolsWrapper'
import Card from './Card/Card'
import { NetworkType } from '@store/consts/static'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { theme } from '@static/theme'
import { useMemo } from 'react'

export interface IPopularPools {
  pools: PopularPoolData[]
  isLoading: boolean
  network: NetworkType
  showAPY: boolean
}

const PopularPools: React.FC<IPopularPools> = ({ pools, isLoading, network, showAPY }) => {
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'))
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
  const isSmDown = useMediaQuery('@media (max-width:700px)')

  const slidesNumber = useMemo(() => {
    if (isSmDown) return 1
    if (isMdDown) return 2
    if (isLgDown) return 3
    return 4
  }, [isMdDown, isLgDown, isSmDown])

  const { classes } = useStyles({ showSlider: slidesNumber < 4 })

  return (
    <Grid container mb={6}>
      <Typography className={classes.title} mb={3}>
        Popular pools
      </Typography>
      <div className={classes.cardsContainer}>
        <Slider
          dots={isLgDown}
          draggable={isLgDown}
          touchMove={isLgDown}
          infinite={false}
          speed={500}
          slidesToShow={slidesNumber}
          slidesToScroll={1}
          arrows={true}
          className={classes.slider}
          dotsClass={`slick-dots ${classes.dots}`}
          appendDots={dots => <ul>{dots}</ul>}
          rows={1}>
          {pools.map((pool, index) => (
            <Card
              addressFrom={pool.addressFrom}
              addressTo={pool.addressTo}
              iconFrom={pool.iconFrom}
              iconTo={pool.iconTo}
              volume={pool.volume}
              TVL={pool.TVL}
              fee={pool.fee}
              symbolFrom={pool.symbolFrom}
              symbolTo={pool.symbolTo}
              apy={pool.apy}
              apyData={pool.apyData}
              isUnknownFrom={pool.isUnknownFrom}
              isUnknownTo={pool.isUnknownTo}
              isLoading={isLoading}
              network={network}
              showAPY={showAPY}
              key={index}
            />
          ))}
        </Slider>
      </div>
    </Grid>
  )
}

export default PopularPools
