import React, { useContext } from "react";
import { Avatar, Button, Layout, Menu, Popover } from "antd";
import { FireOutlined, LoginOutlined } from "@ant-design/icons";


import { UserContext } from "../../context/UserContext";
import logo from "../../assets/logo.svg";

const Header = () => {
  const { user, logIn, signOut } = useContext(UserContext);

  const content = (
    <Menu defaultSelectedKeys={['mail']}>
      <Menu.Item key="change" icon={<FireOutlined />}>
        Change theme
      </Menu.Item>
      <Menu.Item onClick={signOut} danger key="logout" icon={<LoginOutlined />}>
        Logout
      </Menu.Item>
  </Menu>
  );

  return (
    <Layout.Header>
      <div>
        <img height={32} src={logo} alt="..." />
      </div>
      {user ? (
        <Popover
          title={user.displayName}
          content={content}
          trigger="click"
          placement="bottomRight"
        >
          <Avatar src={user.photoURL as string} />
        </Popover>
      ) : (
        <Button onClick={logIn} type="text">
          Login
        </Button>
      )}
    </Layout.Header>
  );
};

export default Header;
