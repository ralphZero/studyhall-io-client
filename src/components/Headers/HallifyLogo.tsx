import React from 'react';
import hallifyLogo from '../../assets/full_logo.svg';
import { NavLink } from 'react-router-dom';

const HallifyLogo = () => {
  return (
    <NavLink to='/app/plan'>
      <div className='global-header-style'>
        <img className='h-8' src={hallifyLogo} alt='Hallify' />
      </div>
    </NavLink>
  );
};

export default HallifyLogo;
