import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd'

import './KanbanContainer.css';

interface KanbanColProps {
    id: string,
    title: string,
    onToggleModal: (value: boolean) => void,
    selectedCol: (value: string) => void,
    children: JSX.Element | (JSX.Element | null)[]
}

const KanbanCol = ({ id, title, children, onToggleModal, selectedCol }: KanbanColProps) => {
  const handleClick = () => {
    onToggleModal(true);
    selectedCol(id);
  }
  return (
    <>
    <div className="kanban-col">
        <div className="kanban-col-header">
            <span>{ title }</span>
            <Button onClick={handleClick} className='kanban-col-header-btn' type="text" icon={<PlusOutlined />} />
        </div>
        <div className='kanban-col-container'>
            { children }
        </div>
    </div>
    </>
  )
}

export default KanbanCol