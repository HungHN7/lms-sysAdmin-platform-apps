const UserIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.98741 13.0142C6.49138 13.0142 3.50586 13.5437 3.50586 15.6643C3.50586 17.7849 6.47244 18.3334 9.98741 18.3334C13.4834 18.3334 16.4681 17.803 16.4681 15.6833C16.4681 13.5635 13.5024 13.0142 9.98741 13.0142Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.98734 9.98952C12.2816 9.98952 14.1411 8.12591 14.1411 5.82766C14.1411 3.5294 12.2816 1.66666 9.98734 1.66666C7.6931 1.66666 5.83275 3.5294 5.83275 5.82766C5.825 8.11815 7.67244 9.98176 9.95807 9.98952H9.98734Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default UserIcon;
