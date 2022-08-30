import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd'

import './KanbanContainer.css';

interface KanbanColProps {
    title: string,
    onClick?: () => void,
    children: JSX.Element | (JSX.Element | null)[]
}

const KanbanCol = ({ title, children }: KanbanColProps) => {
  return (
    <div className="kanban-col">
        <div className="kanban-col-header">
            <span>{ title }</span>
            <Button className='kanban-col-header-btn' type="text" icon={<PlusOutlined />} />
        </div>
        <div className='kanban-col-container'>
            { children }
        </div>
    </div>
  )
}

export default KanbanCol