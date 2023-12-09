import React from 'react';
import { Button, ConfigProvider, Dropdown, MenuProps } from 'antd';

export interface PriorityControlProps {
  onChange?: (value: number) => void;
  value?: number;
}

const PriorityControl = (props: PriorityControlProps) => {
  const { onChange, value = '2' } = props;

  const items = [
    {
      key: '1',
      label: 'Lowest',
    },
    {
      key: '2',
      label: 'Low',
    },
    {
      key: '3',
      label: 'Medium',
    },
    {
      key: '4',
      label: 'High',
    },
    {
      key: '5',
      label: 'Highest',
    },
  ];

  const itemColor = [
    {
      key: '1',
      textColor: '#1f8b4c',
      bgColor: '#c7e2d2',
    },
    {
      key: '2',
      textColor: '#2e86fa',
      bgColor: '#b3d4ff',
    },
    {
      key: '3',
      textColor: '#c19400',
      bgColor: '#fad9ad',
    },
    {
      key: '4',
      textColor: '#EC5703',
      bgColor: '#facec0',
    },
    {
      key: '5',
      textColor: '#EC0303',
      bgColor: '#ffb6b6',
    },
  ];

  const handleSelection: MenuProps['onSelect'] = (e) => {
    onChange?.(parseInt(e.key));
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimaryHover: itemColor.find(
              (item) => item.key === value.toString()
            )?.textColor,
            colorBorder: 'transparent',
            colorText: itemColor.find((item) => item.key === value.toString())
              ?.textColor,
            colorBgContainer: itemColor.find(
              (item) => item.key === value.toString()
            )?.bgColor,
          },
        },
      }}>
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ['2'],
          onSelect: handleSelection,
        }}>
        <Button type='default' style={{ borderRadius: 18 }}>
          <span>
            {items.find((item) => item.key === value.toString())?.label}
          </span>
        </Button>
      </Dropdown>
    </ConfigProvider>
  );
};

export default PriorityControl;
