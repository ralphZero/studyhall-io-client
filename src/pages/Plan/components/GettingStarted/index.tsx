import React from 'react';
import GetStartedButton from '../../../../components/GettingStarted/GetStartedButton';

const GettingStarted = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-9 bg-gradient-to-b from-[#FFFFFF] via-50% via-powderBlue to-powderBlue'>
      <h1 className='text-4xl font-sans font-light tracking-tight'>
        Hello there👋
      </h1>
      <h2 className='text-4xl font-semibold font-sans tracking-tight'>
        Get organized and achieve your goals
      </h2>
      <h3 className='text-center w-[465px] text-sm text-general font-sans tracking-tight'>
        Create a personalized study plan that fits your unique style. Whether
        you're studying for a big exam or just want to boost your knowledge, a
        solid plan will set you up for success. Don't wait any longer, take
        action now and click 'get started' to create your plan today!
      </h3>
      <GetStartedButton />
    </div>
  );
};

export default GettingStarted;
