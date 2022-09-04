import React from "react";
import { Progress } from "antd";
interface HallTitleProps {
  title: string;
  description: string;
  progress: number;
}

const HallTitle = ({ title, description, progress }: HallTitleProps) => {
  return (
    <>
      <div className="title-header" style={style}>
        <div>
          <h1
            className="title-header-title"
            style={{ fontSize: "28px", marginTop: "5px" }}
          >
            {title}
          </h1>
          <h2 className="title-header-subtitle">{description}</h2>
        </div>
        <Progress
          type="circle"
          percent={Math.round(progress * 100)}
          width={70}
        />
      </div>
    </>
  );
};

const style = {
  padding: "15px 50px",
  backgroundColor: "#FAFAFA",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "120px",
};

export default HallTitle;
