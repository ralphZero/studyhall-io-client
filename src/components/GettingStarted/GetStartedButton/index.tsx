import { Button } from 'antd';
import React from 'react';

import './GetStarted.css';
interface GetStartedButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

const GetStartedButton = ({ onClick }: GetStartedButtonProps) => {
  return (
    <Button
      className='getstartedbtn font-sans tracking-tight'
      onClick={onClick}
      type='link'>
      get started
    </Button>
  );
};

export default GetStartedButton;
