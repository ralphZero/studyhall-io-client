import React from 'react';
import { Card, Space } from 'antd';
import { Task } from '../../models/task';
import { CheckCircleFilled } from '@ant-design/icons';

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const completeIcon = task.isComplete ? { color: "#6F9600", display: "block" } : { color: "#6F9600", display: "none" }
  return (
    <Card extra={<CheckCircleFilled style={completeIcon} />} hoverable size="small" title={task.label} style={{ width: "100%", margin: "12px 0px" }}>
        <div hidden></div>
        <div className='task-card-title'>
          <Space wrap>
            {task.task}
          </Space>
        </div>
        {/* <Progress percent={Math.round(progress * 100)} /> */}
    </Card>
  )
}

export default TaskCard