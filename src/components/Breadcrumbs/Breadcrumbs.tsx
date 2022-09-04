import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface Props {
  title: string | undefined
}
const Breadcrumbs = ({ title }: Props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
