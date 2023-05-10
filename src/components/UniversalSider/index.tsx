import React from 'react';
import HallifyLogo from '../Headers/HallifyLogo';

interface UniversalSiderProps {
  children: JSX.Element[] | JSX.Element;
}

const UniversalSider = ({ children }: UniversalSiderProps) => {
  return (
    <aside className='w-[168px] bg-primaryBlack'>
      <HallifyLogo />
      <div className='px-2'>{children}</div>
    </aside>
  );
};

export default UniversalSider;
