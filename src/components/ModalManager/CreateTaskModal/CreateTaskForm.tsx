import { Input } from 'antd';
import React from 'react';

const CreateTaskForm = () => {
  return (
    <>
      <Input
        className='font-sans font-bold text-lg tracking-tight'
        placeholder='Your topic title'
        bordered={false}
      />
    </>
  );
};

export default CreateTaskForm;
