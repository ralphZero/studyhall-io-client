import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import "./KanbanContainer.css";

interface KanbanColProps {
  id: string;
  title: string;
  onToggleModal: (value: boolean) => void;
  selectedCol: (value: string) => void;
  children: JSX.Element | (JSX.Element | null)[];
}

const KanbanCol = ({
  id,
  title,
  children,
  onToggleModal,
  selectedCol,
}: KanbanColProps) => {
  const handleClick = () => {
    onToggleModal(true);
    selectedCol(id);
  };

  const colors = ["#307351","#14213d","#da2c38","#2d7dd2"];

  const colorIndex = Math.floor(Math.random() * colors.length);

  return (
    <>
      <div className="kanban-col">
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
        <div className="kanban-col-container">{children}</div>
      </div>
    </>
  );
};

export default KanbanCol;
