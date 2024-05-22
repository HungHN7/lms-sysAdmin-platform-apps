const CurriculumIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      {...props}
    >
      {props.fill !== 'none' ? (
        <path
          d='M5.48611 9.30557C2.34079 9.30557 1.66667 8.63145 1.66667 5.48611C1.66667 2.34079 2.34079 1.66667 5.48611 1.66667C8.63145 1.66667 9.30554 2.34079 9.30554 5.48611C9.30557 8.63145 8.63145 9.30557 5.48611 9.30557ZM5.48611 18.3333C2.34079 18.3333 1.66667 17.6592 1.66667 14.5139C1.66667 11.3686 2.34079 10.6945 5.48611 10.6945C8.63145 10.6945 9.30554 11.3686 9.30554 14.5139C9.30557 17.6592 8.63145 18.3333 5.48611 18.3333ZM10.6944 14.5139C10.6944 17.6592 11.3686 18.3333 14.5139 18.3333C17.6592 18.3333 18.3333 17.6592 18.3333 14.5139C18.3333 11.3686 17.6592 10.6945 14.5139 10.6945C11.3686 10.6945 10.6944 11.3686 10.6944 14.5139ZM15.2083 3.05557C15.2083 2.67204 14.8974 2.36114 14.5139 2.36114C14.1304 2.36114 13.8195 2.67204 13.8195 3.05557V4.79167H12.0833C11.6998 4.79167 11.3889 5.10258 11.3889 5.48611C11.3889 5.86963 11.6998 6.18054 12.0833 6.18054H13.8194V7.91667C13.8194 8.3002 14.1303 8.6111 14.5139 8.6111C14.8974 8.6111 15.2083 8.3002 15.2083 7.91667V6.18057H16.9444C17.3279 6.18057 17.6388 5.86967 17.6388 5.48614C17.6388 5.10261 17.328 4.79167 16.9444 4.79167H15.2083V3.05557Z'
          fill='currentColor'
          stroke='currentColor'
        />
      ) : (
        <>
          <path
            d='M15.2083 3.05555C15.2083 2.67202 14.8974 2.36111 14.5139 2.36111C14.1304 2.36111 13.8195 2.67202 13.8195 3.05555V4.79165H12.0833C11.6998 4.79165 11.3889 5.10255 11.3889 5.48608C11.3889 5.86961 11.6998 6.18051 12.0833 6.18051H13.8194V7.91665C13.8194 8.30018 14.1303 8.61108 14.5139 8.61108C14.8974 8.61108 15.2083 8.30018 15.2083 7.91665V6.18055H16.9444C17.3279 6.18055 17.6388 5.86964 17.6388 5.48611C17.6388 5.10259 17.328 4.79165 16.9444 4.79165H15.2083V3.05555Z'
            fill='currentColor'
          />
          <path
            d='M6.96975 1.66675H3.93944C3.33668 1.66675 2.7586 1.9062 2.33238 2.33242C1.90616 2.75863 1.66672 3.33671 1.66672 3.93948V6.96978C1.66672 7.57254 1.90616 8.15062 2.33238 8.57684C2.7586 9.00306 3.33668 9.24251 3.93944 9.24251H6.96975C7.57251 9.24251 8.15059 9.00306 8.57681 8.57684C9.00303 8.15062 9.24247 7.57254 9.24247 6.96978V3.93948C9.24247 3.33671 9.00303 2.75863 8.57681 2.33242C8.15059 1.9062 7.57251 1.66675 6.96975 1.66675ZM7.72732 6.96978C7.72732 7.1707 7.64751 7.36339 7.50543 7.50547C7.36336 7.64754 7.17067 7.72735 6.96975 7.72735H3.93944C3.73852 7.72735 3.54583 7.64754 3.40376 7.50547C3.26168 7.36339 3.18187 7.1707 3.18187 6.96978V3.93948C3.18187 3.73855 3.26168 3.54586 3.40376 3.40379C3.54583 3.26172 3.73852 3.1819 3.93944 3.1819H6.96975C7.17067 3.1819 7.36336 3.26172 7.50543 3.40379C7.64751 3.54586 7.72732 3.73855 7.72732 3.93948V6.96978ZM16.0607 10.7577H13.0303C12.4276 10.7577 11.8495 10.9971 11.4233 11.4233C10.9971 11.8495 10.7576 12.4276 10.7576 13.0304V16.0607C10.7576 16.6635 10.9971 17.2415 11.4233 17.6677C11.8495 18.094 12.4276 18.3334 13.0303 18.3334H16.0607C16.6634 18.3334 17.2415 18.094 17.6677 17.6677C18.0939 17.2415 18.3334 16.6635 18.3334 16.0607V13.0304C18.3334 12.4276 18.0939 11.8495 17.6677 11.4233C17.2415 10.9971 16.6634 10.7577 16.0607 10.7577ZM16.8182 16.0607C16.8182 16.2616 16.7384 16.4543 16.5963 16.5964C16.4543 16.7384 16.2616 16.8183 16.0607 16.8183H13.0303C12.8294 16.8183 12.6367 16.7384 12.4947 16.5964C12.3526 16.4543 12.2728 16.2616 12.2728 16.0607V13.0304C12.2728 12.8295 12.3526 12.6368 12.4947 12.4947C12.6367 12.3526 12.8294 12.2728 13.0303 12.2728H16.0607C16.2616 12.2728 16.4543 12.3526 16.5963 12.4947C16.7384 12.6368 16.8182 12.8295 16.8182 13.0304V16.0607ZM6.96975 10.7577H3.93944C3.33668 10.7577 2.7586 10.9971 2.33238 11.4233C1.90616 11.8495 1.66672 12.4276 1.66672 13.0304V16.0607C1.66672 16.6635 1.90616 17.2415 2.33238 17.6677C2.7586 18.094 3.33668 18.3334 3.93944 18.3334H6.96975C7.57251 18.3334 8.15059 18.094 8.57681 17.6677C9.00303 17.2415 9.24247 16.6635 9.24247 16.0607V13.0304C9.24247 12.4276 9.00303 11.8495 8.57681 11.4233C8.15059 10.9971 7.57251 10.7577 6.96975 10.7577ZM7.72732 16.0607C7.72732 16.2616 7.64751 16.4543 7.50543 16.5964C7.36336 16.7384 7.17067 16.8183 6.96975 16.8183H3.93944C3.73852 16.8183 3.54583 16.7384 3.40376 16.5964C3.26168 16.4543 3.18187 16.2616 3.18187 16.0607V13.0304C3.18187 12.8295 3.26168 12.6368 3.40376 12.4947C3.54583 12.3526 3.73852 12.2728 3.93944 12.2728H6.96975C7.17067 12.2728 7.36336 12.3526 7.50543 12.4947C7.64751 12.6368 7.72732 12.8295 7.72732 13.0304V16.0607Z'
            fill='currentColor'
          />
        </>
      )}
    </svg>
  );
};

export default CurriculumIcon;
