import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";

const Breadcrumbs = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <HomeOutlined />
        <span>Study plans</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>This plan</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
