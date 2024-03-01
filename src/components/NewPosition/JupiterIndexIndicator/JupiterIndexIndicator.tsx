import { useState, useEffect } from 'react'
import JupiterIcon from '@static/svg/JupiterIcon.svg'

interface IndicatorProps {
  markertId: string
}

interface ApiElementProps {
  pubkey: string
  executable: boolean
  lamports: number
  owner: string
  params: Object
  rentEpoch: number
  space: number
}

export const JupiterIndexIndicator = ({ markertId }: IndicatorProps) => {
  const [conn, setConn] = useState(false)
  useEffect(() => {
    void handleConn()
  }, [markertId])

  const handleConn = async () => {
    try {
      const response = await fetch('https://cache.jup.ag/markets?v=3')
      const data = await response.json()
      const connection = data.find((el: ApiElementProps) => el.pubkey === markertId)

      setConn(connection)
    } catch (err) {
        // TODO: upgrade error handling
      console.log(err)
    }
  }
// TODO: upgrade styles
  return <>{conn && <img src={JupiterIcon} alt='JupiterIcon' />}</>
}
