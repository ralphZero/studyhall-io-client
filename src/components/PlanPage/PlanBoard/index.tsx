import { Collapse, CollapseProps } from 'antd';
import React, { CSSProperties } from 'react';
import { ReactComponent as CollapseCaret } from '../../../assets/collapse_caret.svg';
import './CollapseGroup.css';

const PlanBoard = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
    panelStyle
  ) => [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
      style: panelStyle,
    },
  ];

  const panelStyle = {
    marginBottom: 24,
    background: 'white',
    borderRadius: 16,
    border: 'none',
  };

  return (
    <main className='grow mx-6 pt-2'>
      <Collapse
        className='bg-transparent'
        bordered={false}
        defaultActiveKey={['1']}
        expandIconPosition='end'
        expandIcon={({ isActive }) => (
          <span className={isActive ? 'expandIconActive' : 'expandIcon'}>
            <CollapseCaret height={32} width={32} />
          </span>
        )}
        items={getItems(panelStyle)}
      />
    </main>
  );
};

export default PlanBoard;
