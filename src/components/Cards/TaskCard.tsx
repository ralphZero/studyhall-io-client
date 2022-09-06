import React from "react";
import { Card, Progress, Space } from "antd";
import { Task } from "../../models/task";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (e: any, task: Task) => void;
}

const TaskCard = ({ task, onClick, index }: TaskCardProps) => {
  const completeIcon = task.isComplete
    ? { color: "#6F9600", display: "block" }
    : { color: "#6F9600", display: "none" };
  return (
    <Draggable draggableId={task.id as string} index={index}>
      {(draggableProvided, snapshot) => (
        <Card
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          
          // onClick={(e) => onClick(e, task)}
          extra={<CheckCircleFilled style={completeIcon} />}
          size="small"
          title={task.label}
          style={{ margin: "12px 8px", backgroundColor: `${snapshot.isDragging ? "blue" : "red"}`, ...draggableProvided.draggableProps.style }}
        >
          <div className="task-card-title">
            <Space wrap>{task.task}</Space>
          </div>
          {task.subtasksCount > 0 && (
            <Space
              style={{ display: "flex", paddingBlock: 15 }}
              direction="vertical"
            >
              <Progress percent={Math.round(task.progress * 100)} />
              <Space>
                <CheckCircleOutlined />
                {`${task.subtasksCompletedCount} / ${task.subtasksCount}`}{" "}
                completed
              </Space>
            </Space>
          )}
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
