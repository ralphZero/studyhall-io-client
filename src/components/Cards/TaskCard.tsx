import React from "react";
import { Card, Progress, Space, Tag } from "antd";
import { Task } from "../../models/task";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";

import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (e: any, task: Task) => void;
}

const TaskCard = ({ task, onClick, index }: TaskCardProps) => {
  const completeIcon = task.isComplete
    ? { color: "#6F9600", display: "block" }
    : { color: "#6F9600", display: "none" };

    const title = (
      <Space>
        <Tag style={{ borderRadius: "8px" }} color="blue">{task.label}</Tag>
        { task.priority === 0 ? <Tag style={{ borderRadius: "8px" }} color="green">Low</Tag> : <Tag style={{ borderRadius: "8px" }} color="red">High</Tag> }
      </Space>
    )
  return (
    <Draggable draggableId={task.id as string} index={index}>
      {(draggableProvided, snapshot) => (
        <Card
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className="taskcard"
          onClick={(e) => onClick(e, task)}
          extra={<CheckCircleFilled style={completeIcon} />}
          size="small"
          title={title}
          style={{ margin: "12px 8px", borderColor: `${snapshot.isDragging ? "#514EFF" : "transparent"}`, ...draggableProvided.draggableProps.style }}
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
