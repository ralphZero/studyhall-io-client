import React from "react";

import "./KanbanContainer.css";
import { PlanDate } from "../../models/plandate";
import KanbanColHeader from "./KanbanColHeader";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../../models/task";
import TaskCard from "../Cards/TaskCard";

interface KanbanColProps {
  date: PlanDate;
  tasks: Task[];
  onToggleModal: (value: boolean) => void;
  selectedCol: (value: string) => void;
  handleCardClick: (e: any, task: Task) => void;
}

const KanbanCol = ({
  date,
  tasks,
  onToggleModal,
  selectedCol,
  handleCardClick,
}: KanbanColProps) => {

  const handleClick = () => {
    onToggleModal(true);
    selectedCol(date.id);
  };

  return (
    <>
      <div className="kanban-col">
        <KanbanColHeader title={date.title} handleClick={handleClick} />
        <Droppable droppableId={date.id}>
          {
            (droppableProvided, snapshot) => (
              <div style={{ borderColor: `${snapshot.isDraggingOver ? "#e0e2e9": "#f6f6f7"}` }} ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className="kanban-col-container">
                { tasks.map((task, index) => <TaskCard onClick={handleCardClick} key={task.id} task={task} index={index} />) }
                { droppableProvided.placeholder }
              </div>
            )
          }
        </Droppable>
      </div>
    </>
  );
};

export default KanbanCol;
