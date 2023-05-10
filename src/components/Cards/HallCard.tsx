import React, { useContext } from 'react';
import { Button, Card, Popconfirm, Progress, Space } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';
import { DataContext } from '../../context/DataContext';

interface HallCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
}

const HallCard = ({
  id,
  title,
  description,
  progress,
  startDate,
  endDate,
}: HallCardProps) => {
  const { deleteHall } = useContext(DataContext);

  const onDeleteHall = () => {
    const hallId = id;
    deleteHall(hallId);
  };

  const extras = (
    <Space size='middle'>
      <Button className='kanban-col-header-btn' type='text'>
        <Link to={`/app/halls/${id}`}>open</Link>
      </Button>
      <Popconfirm
        style={{ padding: '3px' }}
        title='Are you sure to delete this task?'
        onConfirm={onDeleteHall}
        okText='Yes'
        cancelText='No'>
        <Button
          className='kanban-col-header-btn'
          type='text'
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </Space>
  );

  const formattedStart = moment(`${startDate}T12:00:00.000Z`);
  const formattedEnd = moment(`${endDate}T12:00:00.000Z`);

  return (
    <Card extra={extras} size='small' style={{ width: '100%' }}>
      <p className='hall-card-title'>{title}</p>
      <p className='hall-card-description'>{description}</p>
      <Progress percent={Math.round(progress * 100)} />
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBlock: 8,
          color: 'GrayText',
        }}>
        <span>{moment(formattedStart).format('ll')}</span>
        <span>{moment(formattedEnd).format('ll')}</span>
      </Space>
    </Card>
  );
};

export default HallCard;
