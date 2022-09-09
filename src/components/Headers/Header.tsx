import React, { useContext } from "react";
import { Avatar, Button, Layout, Menu, Popover, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import { UserContext } from "../../context/UserContext";
import logo from "../../assets/logo.svg";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
interface Props {
  title?: string;
  showMenu?: boolean;
}

const Header = ({ title, showMenu = true }: Props) => {
  const { user, logIn, signOut } = useContext(UserContext);

  const content = (
    <Menu defaultSelectedKeys={["mail"]}>
      <Menu.Item onClick={signOut} danger key="logout" icon={<LoginOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header>
      <Space size={45}>
        <div>
          <img height={32} src={logo} alt="..." />
        </div>
        {showMenu && <Breadcrumbs title={title} />}
      </Space>
      {user ? (
        <Popover
          title={<Space style={titleStyle}>{user.displayName}</Space>}
          content={content}
          trigger="click"
          placement="bottomRight"
        >
          <Avatar src={user.photoURL as string} />
        </Popover>
      ) : (
        <Button onClick={logIn} type="text" className="ant-btn-primary">
          Login
        </Button>
      )}
    </Layout.Header>
  );
};

const titleStyle: React.CSSProperties = {
  paddingBlock: 5
}

export default Header;
