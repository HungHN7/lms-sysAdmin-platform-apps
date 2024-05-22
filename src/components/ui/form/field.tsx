import React, { ReactNode, RefAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui';
import { cn } from 'src/utils/classnames';

type FieldProps<T> = T & {
  name: string;
  label?: string;
  formControl: UseFormReturn<any>;
  required?: boolean;
  classNameWrap?: string;
  direction?: 'vertical' | 'horizontal';
  Comp: (props: T, ref: RefAttributes<any>) => ReactNode;
  className?: string;
};

const FieldWithForm = <T,>({
  name,
  label,
  formControl,
  required,
  classNameWrap,
  direction = 'vertical',
  Comp,
  ...props
}: FieldProps<T>) => {
  const refInput = React.useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={formControl.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(direction === 'horizontal' && 'flex gap-4', classNameWrap)}>
          {label && (
            <FormLabel
              className={cn(
                direction === 'horizontal' && 'inline-flex items-center',
                'font-semibold',
              )}
              style={{
                ...(direction === 'horizontal'
                  ? { height: (refInput.current && refInput.current.clientHeight) || 40 + 'px' }
                  : {}),
              }}
            >
              {label}
              {required && <span className='text-destructive'> *</span>}
            </FormLabel>
          )}

          {direction === 'horizontal' ? (
            <div className='flex-1 flex flex-col gap-1'>
              <FormControl>
                <Comp
                  {...field}
                  {...props}
                  ref={refInput}
                />
              </FormControl>
              <FormMessage />
            </div>
          ) : (
            <>
              <FormControl>
                <Comp
                  {...field}
                  {...props}
                  ref={refInput}
                />
              </FormControl>
              <FormMessage />
            </>
          )}
        </FormItem>
      )}
    />
  );
};

export default FieldWithForm;
