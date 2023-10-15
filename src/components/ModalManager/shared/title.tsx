import React from 'react';

interface ModalTitleProps {
  title: string;
  subtitle: string;
}

const ModalTitle = ({ title, subtitle }: ModalTitleProps) => {
  return (
    <div className='font-sans'>
      <h3 className='m-0 font-semibold tracking-tight text-primaryBlack'>
        {title}
      </h3>
      <h4 className='m-0 text-sm font-normal text-general'>{subtitle}</h4>
    </div>
  );
};

export default ModalTitle;
