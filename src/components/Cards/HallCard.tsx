import React from "react";
import { Button, Card, Dropdown, Menu, Progress, Space } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

interface HallCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
}
const HallCard = ({ id, title, description, progress, startDate, endDate }: HallCardProps) => {
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Remove plan",
        },
      ]}
    />
  );
  const extras = (
    <Dropdown.Button overlay={menu}>
      <Link to={`/halls/${id}`}>Open</Link>
    </Dropdown.Button>
  );

  const formattedStart = moment(moment(startDate).format("YYYY-DD-MM")).toDate();
  const formattedEnd = moment(moment(endDate).format("YYYY-DD-MM")).toDate();

  return (
    <Card
      extra={extras}
      size="small"
      style={{ width: "100%" }}
    >
      <p className="hall-card-title">{title}</p>
      <p className="hall-card-description">{description}</p>
      <Progress percent={Math.round(progress * 100)} />
      <Space style={{ display: "flex", justifyContent: "space-between", paddingBlock: 8, color: "GrayText" }}>
        <span>{moment(formattedStart).format("ll")}</span>
        <span>{moment(new Date(formattedEnd)).format("ll")}</span>
      </Space>
      
    </Card>
  );
};

export default HallCard;
