import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = ({ color, size }) => {
  return (
    <ClipLoader
      color={color || '#007BFF'}
      loading={true}
      size={size || 20}
    />
  )
}

export default Loader