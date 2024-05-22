import React from 'react';
import styled from 'styled-components';

import { cn } from 'src/utils/classnames';

type TItemTab = {
  label: React.ReactNode;
  value: string | number;
};

interface TabCardProps {
  active?: string | number;
  onChange?: (value: string | number) => void;
  items: TItemTab[];
  type?: 'primary' | 'secondary' | 'ghost' | 'number';
  classNameContainer?: string;
  className?: string;
}

export const TabCard: React.FC<TabCardProps> = ({
  items,
  type = 'primary',
  active,
  onChange,
  classNameContainer,
  className,
}) => {
  const [activeItem, setActiveItem] = React.useState<string | number>(active || '');

  const currentActive = React.useMemo(() => (active ? active : activeItem), [active, activeItem]);

  const onClick = (value: string | number) => {
    onChange?.(value);
    setActiveItem(value);
  };

  return (
    <div className={cn(type !== 'number' && 'border-b', classNameContainer)}>
      <ul
        className={cn(
          'flex flex-wrap -mb-px text-sm font-medium text-center',
          type === 'secondary' && 'gap-x-6',
          className,
        )}
        role='tablist'
      >
        {items.map((item, index) => (
          <li
            role='presentation'
            key={item.value}
          >
            <StyledItem
              type={type}
              className={cn(
                'inline-block px-5 py-2 border-b rounded-t-lg transition-all',
                type === 'ghost' &&
                  'hover:border-primary hover:text-primary aria-selected:border-primary aria-selected:text-primary',
                type === 'primary' &&
                  'hover:border-primary hover:bg-primary hover:text-primary-foreground aria-selected:border-primary aria-selected:bg-primary aria-selected:text-primary-foreground',
                type === 'secondary' &&
                  `
                  rounded-t-[20px]
                  border 
                  bg-accent 
                  z-1
                  relative 
                  aria-selected:border-b-background 
                  aria-selected:bg-background
                  aria-selected:z-3
                  before:bg-accent
                  before:border-t
                  before:border-b
                  before:border-r
                  aria-selected:before:bg-background
                  aria-selected:before:border-b-background
                  `,
                type === 'number' &&
                  `
                  rounded-md
                  aria-selected:text-primary
                  border-none
                  py-3
                  flex
                  items-center
                  gap-x-2
                  group
                  `,
                currentActive === item.value && 'active',
              )}
              aria-selected={currentActive === item.value}
              onClick={() => {
                onClick(item.value);
              }}
            >
              {type === 'number' && (
                <span
                  className={cn(
                    'w-6 h-6 flex items-center justify-center rounded-full border group-hover:bg-accent',
                    currentActive === item.value &&
                      'group-aria-selected:bg-primary group-aria-selected:text-primary-foreground border-primary',
                  )}
                >
                  {index + 1}
                </span>
              )}

              {item.label}
            </StyledItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const StyledItem = styled.button<{ type?: 'primary' | 'secondary' | 'ghost' | 'number' }>`
  &::before {
    display: ${(props) => (props.type === 'secondary' ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: -1px;
    height: calc(100% + 2px);
    width: 36px;
    transition: all 250ms ease;
  }
  &.active {
    &::before {
      z-index: 3;
    }
  }

  &::before {
    right: -20px;
    border-radius: 0 24px 0 0;
    transform: skew(30deg, 0deg);
  }
`;
