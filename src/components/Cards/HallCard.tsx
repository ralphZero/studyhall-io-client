import { Card, Progress } from 'antd'
import React from 'react'

interface HallCardProps {
    id: string,
    title: string,
    description: string,
    progress: number
}
const HallCard = ({id, title, description, progress}: HallCardProps) => {
  return (
    <Card hoverable size="small" title="______" style={{ width: "100%" }}>
        <div hidden>{id}</div>
        <p className='hall-card-title'>{title}</p>
        <p>{description}</p>
        <Progress percent={Math.round(progress * 100)} />
    </Card>
  )
}

export default HallCard