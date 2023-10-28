import React from 'react';
import { Button, Tooltip } from 'antd';
import PlanIcon from '../../shared/Icons/PlanIcon';
import DashboardIcon from '../../shared/Icons/DashboardIcon';
import InfoIcon from '../../shared/Icons/InfoIcon';
import AlertIcon from '../../shared/Icons/AlertIcon';
import SettingsIcon from '../../shared/Icons/SettingsIcon';
import { NavLink } from 'react-router-dom';

interface SideNavMenuProps {
  currentRoute: string;
}

const SideNavMenu = (props: SideNavMenuProps) => {
  const { currentRoute } = props;
  const setActive = (route: string) => {
    return route === currentRoute
      ? 'text-accent-secondary hover:text-accent-secondary focus:text-accent-secondary'
      : ' text-textLight hover:text-selectedTextLight';
  };

  return (
    <div className='flex flex-col justify-between flex-grow py-5'>
      <ul className='list-none p-0 m-0 flex flex-col gap-3'>
        <li className='flex justify-center items-center text'>
          <Tooltip title='Plans' placement='right'>
            <NavLink to='/app/plan'>
              <Button
                className={`flex flex-col justify-center ${setActive('plan')}`}
                type='link'>
                <PlanIcon />
              </Button>
            </NavLink>
          </Tooltip>
        </li>
        <li className='flex justify-center items-center'>
          <Tooltip title='Dashboard' placement='right'>
            <NavLink to='/app/dashboard'>
              <Button
                className={`flex flex-col justify-center ${setActive(
                  'dashboard'
                )}`}
                type='link'>
                <DashboardIcon />
              </Button>
            </NavLink>
          </Tooltip>
        </li>
        <li className='flex justify-center items-center'>
          <Tooltip title='Info' placement='right'>
            <NavLink to='/app/info'>
              <Button
                className={`flex flex-col justify-center ${setActive('info')}`}
                type='link'>
                <InfoIcon />
              </Button>
            </NavLink>
          </Tooltip>
        </li>
      </ul>
      <ul className='list-none p-0 m-0 flex flex-col gap-3'>
        <li className='flex justify-center items-center'>
          <Tooltip title='Notifications' placement='right'>
            <NavLink to='/app/notifications'>
              <Button
                className={`flex flex-col justify-center ${setActive(
                  'notifications'
                )}`}
                type='link'>
                <AlertIcon />
              </Button>
            </NavLink>
          </Tooltip>
        </li>
        <li className='flex justify-center items-center'>
          <Tooltip title='Settings' placement='right'>
            <NavLink to='/app/settings'>
              <Button
                className={`flex flex-col justify-center ${setActive(
                  'settings'
                )}`}
                type='link'>
                <SettingsIcon />
              </Button>
            </NavLink>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default SideNavMenu;
