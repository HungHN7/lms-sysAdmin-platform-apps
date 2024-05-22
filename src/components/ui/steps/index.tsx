import { Check, X } from 'lucide-react';
import React from 'react';
import { cn } from 'src/utils/classnames';

type Item = {
  description?: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
  disabled?: boolean;
};

interface StepsProps {
  items: Item[];
  status?: 'error';
  current: number;
  onChange?: (current: number) => void;
  direction?: 'vertical' | 'horizontal';
  labelPlacement?: 'vertical' | 'horizontal';
}

export const Steps: React.FC<StepsProps> = ({
  items,
  current,
  onChange,
  status,
  direction = 'horizontal',
  labelPlacement = 'horizontal',
}) => {
  return (
    <div className={cn('w-full gap-6', direction === 'horizontal' ? 'flex' : 'block')}>
      {items.map((item, index) => {
        const isActive = index === current;
        const isChecked = index < current;

        const isNotLastIndex = index !== items.length - 1;
        return (
          <div
            key={index}
            className={cn(
              'relative align-top',
              (isNotLastIndex || (labelPlacement === 'vertical' && direction === 'horizontal')) &&
                'flex-1',
              direction === 'horizontal' && labelPlacement === 'horizontal'
                ? 'inline-block overflow-hidden'
                : 'block overflow-visible',
              onChange && 'cursor-pointer',
              labelPlacement === 'vertical' &&
                direction === 'horizontal' &&
                'flex flex-col items-center',
            )}
            onClick={() => onChange?.(index)}
          >
            {(direction === 'vertical' || labelPlacement === 'vertical') && isNotLastIndex && (
              <div
                style={{
                  padding:
                    direction === 'horizontal' && labelPlacement === 'vertical'
                      ? '0 24px'
                      : '30px 0 4px',
                }}
                className={cn(
                  direction === 'vertical' &&
                    'absolute top-0 left-3 h-full w-[2px] after:w-[2px] after:h-full after:bg-grey-6 after:inline-block',
                  labelPlacement === 'vertical' &&
                    direction === 'horizontal' &&
                    'absolute -top-1 left-[calc(50%+12px)] w-full after:h-[2px] after:w-full after:bg-grey-6 after:inline-block',
                  isChecked && 'after:!bg-primary',
                )}
              ></div>
            )}

            <div
              className={cn(
                'w-6 h-6 border border-gray-6 rounded-full text-sm inline-flex items-center justify-center mr-2',
                (isActive || isChecked) && 'bg-primary text-primary-foreground border-primary',
                status === 'error' &&
                  isActive &&
                  '!bg-background !text-destructive !border-destructive',
              )}
            >
              {status === 'error' && isActive ? (
                <X size={12} />
              ) : isChecked ? (
                <Check size={12} />
              ) : (
                index + 1
              )}
            </div>
            <div
              className={cn(
                'align-top inline-block mt-[3px]',
                isNotLastIndex && direction === 'vertical' && 'min-h-[100px]',
              )}
            >
              <div
                className={cn(
                  'text-sm font-semibold text-grey-9',
                  direction === 'horizontal' &&
                    isNotLastIndex &&
                    labelPlacement === 'horizontal' &&
                    'pr-6 relative after:w-[1000px] after:absolute after:top-[9px] after:h-[2px] after:left-full after:bg-grey-6',
                  (isActive || isChecked) && 'text-foreground',
                  isChecked && 'after:!bg-primary',
                  status === 'error' && isActive && '!text-destructive',
                  direction === 'horizontal' && labelPlacement === 'vertical' && 'text-center',
                )}
              >
                {item.title}
              </div>
              <div
                className={cn(
                  'text-xs text-gray-8 max-w-full',
                  direction === 'horizontal' && labelPlacement === 'vertical' && 'text-center',
                )}
              >
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
