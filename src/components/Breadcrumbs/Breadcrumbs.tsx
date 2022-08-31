import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <HomeOutlined />
        <Link to="/halls">Go back</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>This plan</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
