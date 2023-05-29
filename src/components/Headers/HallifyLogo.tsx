import React from 'react';
import hallifyLogo from '../../assets/full_logo.svg';
import { NavLink } from 'react-router-dom';

const HallifyLogo = () => {
  return (
    <NavLink to='/app/plan'>
      <div className='flex items-center px-2 border-0 border-b border-divider border-solid h-14'>
        <img className='h-8' src={hallifyLogo} alt='Hallify' />
      </div>
    </NavLink>
  );
};

export default HallifyLogo;
