import React from 'react'

type IProps = {
    id: string
}

const SingleFarmwrapper:React.FC<IProps> = ({id}) => {
  return (
    <div style={{color: 'white'}}>{id}</div>
  )
}

export default SingleFarmwrapper