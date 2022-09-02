import React from "react";
import { Card, Progress, Space } from "antd";
import { Task } from "../../models/task";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";

interface TaskCardProps {
  task: Task;
  onClick: (e: any, task: Task) => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const completeIcon = task.isComplete
    ? { color: "#6F9600", display: "block" }
    : { color: "#6F9600", display: "none" };
  return (
    <Card
      onClick={(e) => onClick(e, task)}
      extra={<CheckCircleFilled style={completeIcon} />}
      hoverable
      size="small"
      title={task.label}
      style={{ width: "100%", margin: "12px 0px" }}
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
            {`${task.subtasksCompletedCount} / ${task.subtasksCount}`} completed
          </Space>
        </Space>
      )}
    </Card>
  );
};

export default TaskCard;
