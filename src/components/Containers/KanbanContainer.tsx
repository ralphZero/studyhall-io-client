import React from 'react'
import './KanbanContainer.css';

interface KanbanContainerProps {
  children: JSX.Element | JSX.Element[] | JSX.Element[][]
}

const KanbanContainer = ({ children }: KanbanContainerProps) => {
  return (
    <div className="">
        { children }
    </div>
  )
}

export default KanbanContainer