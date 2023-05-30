import React from 'react';

interface IHeaderTitle {
  title: string;
  description: string;
  onHeaderInfoChanged?: (info: { title: string; description: string }) => void;
}

const HeaderTitle = ({ title, description }: IHeaderTitle) => {
  return (
    <div className='border-0 p-0 m-0 flex flex-col justify-center h-full'>
      <div className='border-0 p-0 m-0 font-sans font-medium text-base leading-5 text-primaryBlack'>
        {title}
      </div>
      <div className='border-0 p-0 m-0 font-sans font-normal text-xs text-textLight'>
        {description}
      </div>
    </div>
  );
};

export default HeaderTitle;
