/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from 'src/utils/classnames';
import { Loader2, Plus } from 'lucide-react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';

export type TTypeButton = 'main' | 'ghost' | 'ghost-no-padding' | 'danger' | 'split';
type TVariant = 'primary' | 'secondary' | 'tertiary';
type TSize = 'default' | 'icon' | 'icon-circle' | 'large' | 'small' | 'extraLarge';
type TDataTypeSplit = {
  to: string;
  state?: any;
  title: string;
};

const buttonVariants = (typeButton?: TTypeButton) => {
  let variant = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary-hover  hover:border-primary disabled:bg-muted disabled:text-grey-7',
    secondary:
      'border border-primary text-primary bg-background hover:bg-primary/20 disabled:border-muted disabled:hover:bg-background hover:border-primary',
    tertiary:
      'border border-muted placeholder:text-muted-foreground hover:bg-accent disabled:hover:bg-background hover:border-primary',
  };

  switch (typeButton) {
    case 'main':
      variant = {
        primary:
          'bg-primary text-primary-foreground disabled:text-grey-7 disabled:bg-muted hover:bg-primary-hover hover:border-primary focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2',
        secondary:
          'border border-primary text-primary bg-background disabled:border-muted disabled:hover:bg-background disabled:text-grey-7 hover:bg-primary/20 hover:border-primary focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2',
        tertiary:
          'border border-muted placeholder:text-muted-foreground hover:bg-accent disabled:hover:bg-background disabled:text-grey-7 focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2 text-grey-9',
      };
      break;
    case 'ghost':
      variant = {
        primary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:border-primary hover:bg-primary/20 focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2',
        secondary:
          'hover:bg-accent disabled:hover:bg-background disabled:text-grey-7 hover:border-primary focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2 text-grey-12',
        tertiary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:border-primary hover:bg-primary/20 focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2',
      };
      break;
    case 'ghost-no-padding':
      variant = {
        primary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:text-teal-5 focus:text-teal-7',
        secondary:
          'text-grey-12 disabled:hover:bg-background disabled:text-grey-7 hover:text-primary focus:text-grey-10',
        tertiary:
          'text-primary disabled:hover:bg-background disabled:text-grey-7 hover:text-teal-5 focus:text-teal-7',
      };
      break;
    case 'danger':
      variant = {
        primary:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover disabled:bg-muted disabled:text-grey-7 hover:border-destructive focus:border-red-3 focus:border-2 active:border-red-3 active:border-2',
        secondary:
          'border border-destructive text-destructive hover:bg-destructive-light disabled:border-muted disabled:hover:bg-background disabled:text-grey-7 hover:border-destructive focus:border-red-3 focus:border-2 active:border-red-3 active:border-2',
        tertiary:
          'text-destructive hover:bg-destructive-light disabled:hover:bg-background disabled:text-grey-7 hover:border-destructive focus:border-red-3 focus:border-2 active:border-red-3 active:border-2',
      };
      break;
    case 'split':
      variant = {
        primary:
          'bg-primary text-primary-foreground disabled:text-grey-7 hover:bg-primary-hover disabled:bg-muted focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2',
        secondary:
          'bg-primary text-primary-foreground disabled:text-grey-7 hover:bg-primary-hover disabled:bg-muted focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2',
        tertiary:
          'bg-primary text-primary-foreground disabled:text-grey-7 hover:bg-primary-hover disabled:bg-muted focus:border-teal-3 focus:border-2 active:border-teal-3 active:border-2',
      };
      break;
    default:
      variant;
      break;
  }
  return cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-50',
    {
      variants: {
        variant,
        size: {
          default: 'h-10 rounded-md px-4', //medium
          icon: 'h-10 w-10',
          'icon-circle': 'h-10 w-10 rounded-full',
          large: 'h-12 rounded-md px-5',
          extraLarge: 'h-14 rounded-md px-6',
          small: 'h-8 rounded-md px-3',
        },
      },
      defaultVariants: {
        variant: 'primary',
        size: 'default',
      },
    },
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isLoading?: boolean;
  variant?: TVariant;
  size?: TSize;
  typeButton?: TTypeButton;
  iconPlus?: 'left' | 'right' | boolean;
  data?: TDataTypeSplit[];
  classNameContent?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      typeButton = 'main',
      iconPlus = false,
      data = [],
      classNameContent,
      ...props
    },
    ref,
  ) => {
    const leftStyleChildren = (size: TSize) => {
      switch (size) {
        case 'default':
          return 'pl-4';
        case 'large':
          return 'pl-5';
        case 'extraLarge':
          return 'pl-6';
        case 'small':
          return 'pl-3';
        default:
          return 'justify-center';
      }
    };
    return asChild ? (
      <Slot
        className={cn(buttonVariants(typeButton)({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    ) : typeButton === 'split' ? (
      <button
        className={cn(buttonVariants(typeButton)({ variant, size, className }), 'px-0')}
        ref={ref}
        {...props}
        disabled={isLoading || props.disabled}
      >
        <div
          className={`flex items-center gap-2 w-full border-r border-primary-foreground ${leftStyleChildren(
            size as TSize,
          )}`}
        >
          {iconPlus === 'left' && <Plus size={20} />}
          {iconPlus === true ? <Plus size={20} /> : props.children}
          {iconPlus === 'right' && <Plus size={20} />}
        </div>
        <div className='flex pl-1 pr-1'>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className='group'
            >
              <Button
                disabled={isLoading || props.disabled}
                size={'icon'}
                className={cn(
                  size === 'small' ? 'h-6 w-6' : 'h-8 w-8',
                  'disabled:text-grey-7 disabled:bg-muted',
                )}
              >
                <Icon
                  icon='mingcute:down-fill'
                  className='text-xl group-data-[state=open]:rotate-180 transition-all duration-300'
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn(`min-w-[150px] translate-x-1 translate-y-1`, classNameContent)}
              side='bottom'
              align='end'
            >
              {data.map((e, ind) => {
                return (
                  <DropdownMenuItem
                    key={ind}
                    asChild
                    className='cursor-pointer'
                  >
                    <Link
                      to={e.to}
                      state={e.state}
                    >
                      {e.title}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </button>
    ) : (
      <button
        className={cn(buttonVariants(typeButton)({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isLoading || props.disabled}
      >
        <>
          {isLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <>
              {iconPlus === 'left' && <Plus size={20} />}
              {iconPlus === true ? <Plus size={20} /> : props.children}
              {iconPlus === 'right' && <Plus size={20} />}
            </>
          )}
        </>
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
