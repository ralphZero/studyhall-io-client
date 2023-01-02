import { FilterOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import * as React from 'react'
import DateFilter from '../DateFilter'
import FilterGroup from '../FilterGroup'

const HallFilters = () => {
  return (
    <FilterGroup>
      <DateFilter />
      <Button size='middle' icon={<FilterOutlined />}>
        Filter
      </Button>
    </FilterGroup>
  )
}

export default HallFilters
