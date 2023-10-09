import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import Icon, { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ReactComponent as MoreOptionsIcon } from '../../../assets/more_option_icon.svg';
import { useDispatch } from 'react-redux';
import { updateActiveModal } from '../../../features/ui/globalUiSlice';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';

const MoreOptions = () => {
  const dispatch = useDispatch();

  const items: MenuProps['items'] = [
    {
      icon: <EditOutlined />,
      label: 'Edit plan',
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      icon: <DeleteOutlined />,
      label: 'Delete plan',
      key: '2',
      danger: true,
    },
  ];

  const handleMenuInteraction: MenuProps['onClick'] = ({ key }) => {
    if (key === '2') {
      dispatch(updateActiveModal({ status: true, tag: ModalType.DELETE_PLAN }));
    }
  };

  const menuProps: MenuProps = {
    items,
    onClick: handleMenuInteraction,
  };

  return (
    <Dropdown menu={menuProps}>
      <Button
        type='text'
        shape='circle'
        icon={<Icon component={MoreOptionsIcon} />}
      />
    </Dropdown>
  );
};

export default MoreOptions;
