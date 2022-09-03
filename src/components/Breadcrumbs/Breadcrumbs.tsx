import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface Props {
  title: string
}
const Breadcrumbs = ({ title }: Props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <HomeOutlined />
        <Link to="/">Go back</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
