import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputProps,
} from 'src/components/ui';
import { Show } from 'src/shared';
import { cn } from 'src/utils/classnames';

interface TextFieldProps extends InputProps {
  name: string;
  label?: string;
  formControl: UseFormReturn<any>;
  required?: boolean;
  classNameWrap?: string;
  direction?: 'vertical' | 'horizontal';
  helpText?: string;
  isShowHelpText?: boolean;
  isShowError?: boolean;
  rightAction?: JSX.Element;
  labelClassName?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  formControl,
  required,
  classNameWrap,
  direction = 'vertical',
  helpText,
  isShowHelpText,
  rightAction,
  isShowError = true,
  labelClassName,
  ...props
}) => {
  const refInput = React.useRef<HTMLInputElement>(null);
  return (
    <FormField
      control={formControl.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn(direction === 'horizontal' && 'flex gap-4', classNameWrap)}>
          {label && (
            <FormLabel
              className={cn(
                direction === 'horizontal' && 'inline-flex items-center',
                'font-semibold',
                'flex justify-between',
              )}
              style={{
                ...(direction === 'horizontal'
                  ? { height: (refInput.current && refInput.current.clientHeight) || 40 + 'px' }
                  : {}),
              }}
            >
              <div className={cn(labelClassName, props.disabled && 'text-grey-7')}>
                {label}
                {required && <span className='text-destructive'> *</span>}
              </div>
              <Show when={rightAction}>{rightAction}</Show>
            </FormLabel>
          )}

          {direction === 'horizontal' ? (
            <div className='flex-1 flex flex-col gap-1 mt-2'>
              <FormControl>
                <Input
                  {...field}
                  ref={refInput}
                  {...props}
                />
              </FormControl>
              {isShowHelpText && (
                <h3
                  className={cn('text-grey-8 text-xs font-normal', props.disabled && 'text-grey-7')}
                >
                  {helpText}
                </h3>
              )}
              <Show when={isShowError}>
                <FormMessage />
              </Show>
            </div>
          ) : (
            <>
              <FormControl className={`${isShowError && error ? 'border-red-5' : ''}`}>
                <Input
                  {...field}
                  ref={refInput}
                  {...props}
                />
              </FormControl>
              {isShowHelpText && (
                <h3
                  className={cn('text-grey-8 text-xs font-normal', props.disabled && 'text-grey-7')}
                >
                  {helpText}
                </h3>
              )}
              <Show when={isShowError}>
                <FormMessage />
              </Show>
            </>
          )}
        </FormItem>
      )}
    />
  );
};

export default TextField;
