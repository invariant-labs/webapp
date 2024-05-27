interface Pool {
  pubkey: string
}

export const fetchIndexedPools = async () => {
  try {
    const response = await fetch('https://cache.jup.ag/markets?v=3')
    const data: Pool[] = await response.json()
    return data.map(pool => pool.pubkey)
  } catch (error) {
    console.error('Error fetching indexed pools:', error)
    return []
  }
}
