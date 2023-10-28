import React from 'react';
import HallifyLogo from '../shared/header/HallifyLogo';

interface UniversalSiderProps {
  children: any;
}

const UniversalSider = ({ children }: UniversalSiderProps) => {
  return (
    <aside className='w-[216px] min-w-[216px] bg-primaryBlack'>
      <HallifyLogo />
      <div className='px-2'>{children}</div>
    </aside>
  );
};

export default UniversalSider;
