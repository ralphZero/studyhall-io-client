import * as React from 'react'
import { DatePicker } from 'antd'
import type { DatePickerProps } from 'antd'
import moment from 'moment'

const DateFilter = () => {
  const weekFormat = 'MMM DD, yyyy'
  const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
    `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
      .endOf('week')
      .format(weekFormat)}`
  return (
    <>
      <div className='inline-flex flex-col'>
        <span>Week</span>
        <DatePicker size='small' picker='week' format={customWeekStartEndFormat} />
      </div>
    </>
  )
}

export default DateFilter
