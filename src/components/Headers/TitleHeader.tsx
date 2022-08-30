import React from 'react'

interface TitleHeaderProps {
  children?: JSX.Element | JSX.Element[]
}

const TitleHeader = ({children}: TitleHeaderProps) => {
  return (
    <div className='title-header'>
      <h1 className='title-header-title'>create a study plan</h1>
      <h2 className='title-header-subtitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate maxime voluptatibus assumenda laudantium.!</h2>
      { children }
    </div>
  )
}

export default TitleHeader