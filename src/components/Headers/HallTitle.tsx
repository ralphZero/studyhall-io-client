import { Progress } from "antd";
import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const HallTitle = () => {
  return (
    <>
      <div className="title-header" style={style}>
        <div>
            <Breadcrumbs />
            <h1 className="title-header-title" style={{ fontSize: "28px", marginTop: "5px" }}>My study plan</h1>
            <h2 className="title-header-subtitle">Lorem Ipsum is simply dummy text.</h2>
        </div>
        <Progress type="circle" percent={30} width={70} />
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
    height: "120px"
}

export default HallTitle;
