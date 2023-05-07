import { Button, Tooltip } from 'antd';
import React from 'react';
import PlanIcon from '../../Icons/PlanIcon';
import DashboardIcon from '../../Icons/DashboardIcon';
import InfoIcon from '../../Icons/InfoIcon';
import AlertIcon from '../../Icons/AlertIcon';
import SettingsIcon from '../../Icons/SettingsIcon';

const SideNavMenu = () => {
  return (
    <div className='flex flex-col justify-between flex-grow py-5'>
      <ul className='list-none p-0 m-0 flex flex-col gap-3'>
        <li className='flex justify-center items-center text'>
          <Tooltip title='Plans' placement='right'>
            <Button
              className='flex flex-col justify-center text-textLight hover:text-selectedTextLight'
              type='link'>
              <PlanIcon />
            </Button>
          </Tooltip>
        </li>
        <li className='flex justify-center items-center'>
          <Tooltip title='Dashboard' placement='right'>
            <Button
              className='flex flex-col justify-center text-textLight hover:text-selectedTextLight'
              type='link'>
              <DashboardIcon />
            </Button>
          </Tooltip>
        </li>
        <li className='flex justify-center items-center'>
          <Tooltip title='Info' placement='right'>
            <Button
              className='flex flex-col justify-center text-textLight hover:text-selectedTextLight'
              type='link'>
              <InfoIcon />
            </Button>
          </Tooltip>
        </li>
      </ul>
      <ul className='list-none p-0 m-0 flex flex-col gap-3'>
        <li className='flex justify-center items-center'>
          <Tooltip title='Notifications' placement='right'>
            <Button
              className='flex flex-col justify-center text-textLight hover:text-selectedTextLight'
              type='link'>
              <AlertIcon />
            </Button>
          </Tooltip>
        </li>
        <li className='flex justify-center items-center'>
          <Tooltip title='Settings' placement='right'>
            <Button
              className='flex flex-col justify-center text-textLight hover:text-selectedTextLight'
              type='link'>
              <SettingsIcon />
            </Button>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default SideNavMenu;
