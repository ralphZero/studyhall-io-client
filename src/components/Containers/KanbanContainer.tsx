import React from 'react'
import './KanbanContainer.css';

interface KanbanContainerProps {
  children: JSX.Element | JSX.Element[] | JSX.Element[][]
}

const KanbanContainer = ({ children }: KanbanContainerProps) => {
  return (
    <div className="kanban-container">
        { children }
    </div>
  )
}

export default KanbanContainer