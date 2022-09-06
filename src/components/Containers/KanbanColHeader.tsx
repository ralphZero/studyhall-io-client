import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface Props {
  title: string;
  handleClick: () => void;
}

const KanbanColHeader = ({ title, handleClick }: Props) => {
  return (
    <div className="kanban-col-header">
      <span>{title}</span>
      <Button
        onClick={handleClick}
        className="kanban-col-header-btn"
        type="text"
        icon={<PlusOutlined style={{ color: "#8C8C8C" }} />}
      />
    </div>
  );
};

export default KanbanColHeader;
