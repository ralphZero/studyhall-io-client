import React from 'react'
import { Avatar, Layout } from 'antd';

import logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <Layout.Header>
        <div>
            <img height={32} src={logo} alt='...' />
        </div>
        <Avatar>RP</Avatar>
    </Layout.Header>
  )
}

export default Header