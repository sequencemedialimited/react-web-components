import React from 'react'

export default function App () {
  return (
    <sequence-media
      data-text='React web components'
      onClick={(event) => console.log('React click', event)}
    />
  )
}
