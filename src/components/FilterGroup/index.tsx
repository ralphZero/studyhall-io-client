import * as React from 'react'

type Props = {
  children: any
}

const FilterGroup = (props: Props) => {
  const { children } = props
  return (
    <div className='m-0 p-0 flex py-2 justify-end items-center'>
      {children}
    </div>
  )
}

export default FilterGroup
