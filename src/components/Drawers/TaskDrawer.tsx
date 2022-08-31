import { Button, Drawer, Input, Space } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'

// -------
//  adding notes in future
// -----

interface TaskDrawerProps {
    visible: boolean,
    onClose: () => void
}

const TaskDrawer = ({ visible, onClose }: TaskDrawerProps) => {
  return (
    <Drawer
        title="Modify task"
        placement="right"
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              Save
            </Button>
          </Space>
        }
      >

        <div>
            <Input bordered={false} placeholder="Label" />
        </div>
        <div>
            <TextArea style={{ fontSize: 42 }} bordered={false} placeholder="Title" />
        </div>
        <div>Subtasks here ...</div>
      </Drawer>
  )
}

export default TaskDrawer