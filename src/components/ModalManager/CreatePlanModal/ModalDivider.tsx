import React from 'react';

const ModalDivider = () => {
  return (
    <div className='flex items-center gap-2'>
      <hr className='inline-block w-full border-[0.5px] border-solid text-[#000000]' />
      <span className='font-sans text-sm'>OR</span>
      <hr className='inline-block w-full border-[0.5px] border-solid text-[#000000]' />
    </div>
  );
};

export default ModalDivider;
