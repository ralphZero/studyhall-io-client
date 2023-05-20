import { Button, Layout } from 'antd';
import React from 'react';

const Login = () => {
  return (
    <Layout className='h-screen'>
      <Layout.Content className='flex flex-col justify-center items-center'>
        <h1>Login</h1>
        <Button type='primary' size='large' className='w-36'>
          Sign in
        </Button>
      </Layout.Content>
    </Layout>
  );
};

export default Login;
