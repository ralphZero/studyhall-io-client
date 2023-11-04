import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Tabs, TabsProps } from 'antd';
import React from 'react';

const DescriptionEditor = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <EditOutlined />
          <span>Edit</span>
        </>
      ),
      className: 'pt-0',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: (
        <>
          <EyeOutlined />
          <span>Preview</span>
        </>
      ),
      className: 'pt-0',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <Card
      bordered={false}
      style={{ boxShadow: 'none', paddingTop: '0px' }}
      className='mt-3 bg-primaryWhite [&_.ant-card-body]:pt-0'
      size='small'>
      <Tabs defaultActiveKey='1' size='small' items={items} indicatorSize={0} />
    </Card>
  );
};

export default DescriptionEditor;
