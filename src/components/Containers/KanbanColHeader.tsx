import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface Props {
  title: string;
  handleClick: () => void;
}

const KanbanColHeader = ({ title, handleClick }: Props) => {
  const colors = ["#307351", "#14213d", "#2d7dd2"];
  const colorIndex = Math.floor(Math.random() * colors.length);

  return (
    <div
      className="kanban-col-header"
      style={{ backgroundColor: colors[colorIndex], color: "#f9f9f9f0" }}
    >
      <span>{title}</span>
      <Button
        onClick={handleClick}
        className="kanban-col-header-btn"
        type="text"
        icon={<PlusOutlined style={{ color: "#f9f9f9f0" }} />}
      />
    </div>
  );
};

export default KanbanColHeader;
