import React from 'react';
import hallifyLogo from '../../assets/full_logo.svg';
import { NavLink } from 'react-router-dom';

const HallifyLogo = () => {
  return (
    <NavLink to='/app'>
      <div className='py-[12px] px-2 border-0 border-b border-divider border-solid'>
        <img src={hallifyLogo} alt='Hallify' />
      </div>
    </NavLink>
  );
};

export default HallifyLogo;
