import React from 'react'
import { Progress } from 'antd'
import HallFilters from '../HallFilters'
interface HallTitleProps {
  title: string
  description: string
  progress: number
}

const HallTitle = ({ title, description, progress }: HallTitleProps) => {
  return (
    <>
      <div className='px-12 flex justify-between items-center bg-gray-50'>
        <div className='flex gap-5 items-center'>
          <Progress
            type='circle'
            percent={Math.round(progress * 100)}
            width={50}
          />
          <div className='py-2'>
            <h1 className='title-header-title text-2xl my-0'>{title}</h1>
            <h2 className='title-header-subtitle my-0'>{description}</h2>
          </div>
        </div>
        <HallFilters />
      </div>
    </>
  )
}

export default HallTitle
