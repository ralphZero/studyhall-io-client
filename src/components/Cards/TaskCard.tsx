import { Card } from 'antd'
import React from 'react'

const TaskCard = () => {
  return (
    <Card hoverable size="small" title="______" style={{ width: "100%", margin: "12px 0px" }}>
        <div hidden></div>
        <p className='hall-card-title'>title</p>
        <p>desc</p>
        {/* <Progress percent={Math.round(progress * 100)} /> */}
    </Card>
  )
}

export default TaskCard