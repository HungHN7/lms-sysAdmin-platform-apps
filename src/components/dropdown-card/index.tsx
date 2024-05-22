import { MoreVerticalIcon } from 'lucide-react';
import React, { FC, useId } from 'react';
import { cn } from 'src/utils/classnames';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui';

interface CardDropdownOptionProps {
  options: {
    text: string | React.ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
  }[];
  icon?: React.ReactNode;
  className?: string;
}

const CardDropdownOption: FC<CardDropdownOptionProps> = ({
  options,
  icon,
  className,
  ...props
}) => {
  const id = useId();
  const [sideState, setSideState] = React.useState('bottom');
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-side') {
          const dropdownContainer = document.getElementById(id);
          if (dropdownContainer) {
            const side = dropdownContainer.getAttribute('data-side');
            if (!side) return;
            setSideState(side);
          }
        }
      });
    });
    const dropdownContainer = document.getElementById(id);
    if (dropdownContainer) {
      observer.observe(dropdownContainer, {
        attributes: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [toggle]);

  return (
    <DropdownMenu
      {...props}
      modal={false}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            `flex items-center justify-center h-10 w-10 rounded-md data-[state=open]:relative data-[state=open]:bg-white data-[state=open]:z-[100] 
         text-popover-foreground data-[state=open]:border 
        `,
            sideState.includes('bottom') &&
              'data-[state=open]:rounded-b-none data-[state=open]:border-b-white',
            sideState.includes('top') &&
              'data-[state=open]:rounded-t-none data-[state=open]:border-t-white',
            sideState.includes('left') &&
              'data-[state=open]:rounded-l-none data-[state=open]:border-l-white',
            sideState.includes('right') &&
              'data-[state=open]:rounded-r-none data-[state=open]:border-r-white',
            className,
          )}
          style={{
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), none',
          }}
          onClick={() => {
            setTimeout(() => {
              const dropdownContainer = document.getElementById(id);
              if (dropdownContainer) {
                const side = dropdownContainer.getAttribute('data-side');
                if (!side) return;
                setSideState(side);
                setToggle((prev) => !prev);
              }
            }, 0);
          }}
        >
          {icon ? icon : <MoreVerticalIcon className='h-5 w-5 text-black' />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        id={id}
        side='bottom'
        align='end'
        unPortal={true}
        className={`relative right-0 rounded-tr-none rounded-br-none
            data-[side=bottom]:top-[-5px]
            data-[side=top]:bottom-[-5px] 
            data-[side=right]:left-[-5px]
            data-[side=left]:right-[-5px]
          `}
      >
        <DropdownMenuGroup>
          {options.map((item, index) =>
            item.disabled ? (
              <DropdownMenuItem
                disabled
                key={index}
              >
                {item.text}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  item.handleClick?.();
                }}
                key={index}
              >
                {item.text}
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardDropdownOption;
