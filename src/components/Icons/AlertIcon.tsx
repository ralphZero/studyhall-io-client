import React from 'react';

const AlertIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width='12'
      height='16'
      viewBox='0 0 12 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M11.3438 12.5H10.9219V6.52344C10.9219 4.04316 9.08848 1.99355 6.70312 1.65254V0.96875C6.70312 0.580273 6.38848 0.265625 6 0.265625C5.61152 0.265625 5.29688 0.580273 5.29688 0.96875V1.65254C2.91152 1.99355 1.07812 4.04316 1.07812 6.52344V12.5H0.65625C0.345117 12.5 0.09375 12.7514 0.09375 13.0625V13.625C0.09375 13.7023 0.157031 13.7656 0.234375 13.7656H4.03125C4.03125 14.852 4.91367 15.7344 6 15.7344C7.08633 15.7344 7.96875 14.852 7.96875 13.7656H11.7656C11.843 13.7656 11.9062 13.7023 11.9062 13.625V13.0625C11.9062 12.7514 11.6549 12.5 11.3438 12.5ZM6 14.6094C5.53418 14.6094 5.15625 14.2314 5.15625 13.7656H6.84375C6.84375 14.2314 6.46582 14.6094 6 14.6094ZM2.34375 12.5V6.52344C2.34375 5.54609 2.72344 4.62852 3.41426 3.9377C4.10508 3.24687 5.02266 2.86719 6 2.86719C6.97734 2.86719 7.89492 3.24687 8.58574 3.9377C9.27656 4.62852 9.65625 5.54609 9.65625 6.52344V12.5H2.34375Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default AlertIcon;