import React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from 'src/utils/classnames';

type TColor =
  | 'gray'
  | 'red'
  | 'magenta'
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'high-contrast'
  | 'primary';

interface TagProps {
  className?: string;
  closable?: boolean;
  onClose?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  color?: TColor;
  size?: 'small' | 'medium';
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Tag = ({
  className,
  closable,
  onClose,
  color = 'primary',
  size = 'medium',
  children,
  disabled,
}: TagProps) => {
  const getColor = (color: TColor) =>
    new Map<TColor, string>([
      ['gray', 'bg-accent text-grey-10'],
      ['red', 'bg-red-1 text-destructive'],
      ['magenta', 'bg-magenta-1 text-magenta-6'],
      ['purple', 'bg-purple-1 text-purple-6'],
      ['blue', 'bg-blue-1 text-blue-6'],
      ['cyan', 'bg-cyan-1 text-cyan-8'],
      ['teal', 'bg-teal-1 text-teal-8'],
      ['green', 'bg-green-1 text-green-6'],
      ['high-contrast', 'bg-grey-12 text-white'],
      ['primary', 'bg-primary text-white'],
    ]).get(color) ?? 'bg-primary text-white';

  const hoverStyles = {
    gray: 'hover:bg-muted',
    red: 'hover:bg-red-2',
    magenta: 'hover:bg-magenta-2',
    purple: 'hover:bg-purple-2',
    blue: 'hover:bg-blue-2',
    cyan: 'hover:bg-cyan-2',
    teal: 'hover:bg-teal-2',
    green: 'hover:bg-green-2',
    'high-contrast': 'hover:bg-grey-10',
    primary: 'hover:bg-[#01b0ab]',
  };

  return (
    <span
      className={cn(
        'z-1 text-xs leading-4 rounded-3xl py-1 px-2 h-6 inline-block',
        size === 'small' && 'py-0.5 h-5',
        getColor(color),
        !closable && hoverStyles[color],
        closable && 'flex gap-1 items-center !pr-0',
        disabled && 'pointer-events-none select-none opacity-70 bg-grey-5 text-grey-8',
        className,
      )}
      aria-disabled={disabled}
    >
      {children}
      {closable && (
        <span
          role='button'
          aria-label='close'
          className={cn(
            'h-6 w-6 aspect-square flex items-center justify-center rounded-full z-2',
            size === 'small' && 'w-5 h-5',
            hoverStyles[color],
          )}
          onClick={onClose}
          aria-disabled={disabled}
        >
          <XIcon className='w-3 h-3 text-inherit' />
        </span>
      )}
    </span>
  );
};
