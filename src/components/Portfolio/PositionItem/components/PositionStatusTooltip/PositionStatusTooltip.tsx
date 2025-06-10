const PositionStatusTooltip: React.FC<{
  isActive?: boolean
  isPromoted?: boolean
  isLocked?: boolean
}> = ({ isActive, isPromoted, isLocked }) => {
  if (isLocked) {
    return (
      <p>
        This position is <b>locked</b> and <b>will not</b> earn points.
        <br />
        <br />A locked position does not generate points, even if it is active and the pool is
        generating points.
      </p>
    )
  }
  if (!isActive && !isPromoted) {
    return (
      <p>
        This position <b>isn't</b> earning points for two reasons:
        <br />
        <br />
        1. Your position's liquidity remains <b>inactive</b> and <b>won't</b> earn points as long as
        the current price is outside its specified price range.
        <br />
        <br />
        2. This position was opened on a pool that <b>doesn't</b> generate points. If you were
        expecting to earn points, make sure you selected a pool with a fee tier that generates
        points.
      </p>
    )
  }

  if (!isActive) {
    return (
      <p>
        This position <b>isn't</b> earning points, even though the pool is generating them. Your
        position's liquidity remains <b>inactive</b> and <b>won't</b> earn points as long as the
        current price is outside its specified price range. <br />
        <br /> To start earning points again, close the current position and open a new one with a
        price range that includes the pool's current price.
      </p>
    )
  }

  if (!isPromoted) {
    return (
      <p>
        This position <b>isn't</b> earning points because it was opened on a pool that
        <b> doesn't</b> generate them.
        <br />
        <br /> If you were expecting to earn points, make sure you selected a pool with a fee tier
        that generates points, as not all pools do. Only pools with the <b>specified</b> fee tier
        can generate points.
      </p>
    )
  }

  return null
}

export default PositionStatusTooltip
