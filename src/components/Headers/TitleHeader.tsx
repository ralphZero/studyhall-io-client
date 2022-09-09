import React from 'react'

interface TitleHeaderProps {
  children?: JSX.Element | JSX.Element[]
}

const TitleHeader = ({children}: TitleHeaderProps) => {
  return (
    <div className='title-header create-plan'>
      <h1 className='title-header-title'>My study plans</h1>
      <h2 className='title-header-subtitle'>Start organizing and tracking you study now by creating a new study plan or by selecting an existing one.</h2>
      { children }
    </div>
  )
}

export default TitleHeader