import * as React from 'react';
import { cn } from 'src/utils/classnames';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  classWrapper?: string;
  hideReadonlyIcon?: boolean;
}
const FOCUS_CLASS = `focus:outline-primary-outline 
    focus:outline
    focus:outline-offset-1
    focus:outline-2
    focus:ring-1
    focus:ring-ring 
    focus:border-background `;
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, classWrapper, hideReadonlyIcon, ...props }, ref) => {
    const [valueLength, setValueLength] = React.useState<
      string | number | readonly string[] | undefined
    >(props.value?.toString().length ?? 0);
    return (
      <span
        className={cn(
          'relative inline-block bg-background rounded-md max-w-full w-full',
          classWrapper,
        )}
      >
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            className,
            FOCUS_CLASS,
            props.readOnly && 'cursor-not-allowed pr-[40px]',
          )}
          ref={ref}
          onChange={(e) => {
            props.onChange && props.onChange(e);
            setValueLength(e.target.value.length);
          }}
          {...props}
        />
        {props.readOnly && !hideReadonlyIcon && (
          <span
            className={cn(
              'absolute top-3 right-[10px] rounded-full focus:outline-none focus:ring-ring focus:ring-2 opacity-100',
            )}
          >
            <div>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.9577 8.5625L10.791 7.39583L12.4993 5.6875L11.3118 4.5L9.60352 6.20833L8.43685 5.04167L12.4993 0.979167C12.666 0.8125 12.85 0.690972 13.0514 0.614583C13.2528 0.538194 13.4646 0.5 13.6868 0.5C13.9091 0.5 14.1243 0.541667 14.3327 0.625C14.541 0.708333 14.7216 0.833333 14.8743 1L16.0202 2.16667C16.1868 2.31944 16.3084 2.5 16.3848 2.70833C16.4612 2.91667 16.4993 3.125 16.4993 3.33333C16.4993 3.55556 16.4612 3.76736 16.3848 3.96875C16.3084 4.17014 16.1868 4.35417 16.0202 4.52083L11.9577 8.5625ZM3.16602 13.8333H4.35352L8.41602 9.77083L7.83268 9.16667L7.22852 8.58333L3.16602 12.6458V13.8333ZM15.4993 16.8333L9.60352 10.9583L5.04102 15.5H1.49935V11.9792L6.06185 7.41667L0.166016 1.5L1.35352 0.3125L16.6868 15.6458L15.4993 16.8333ZM7.83268 9.16667L7.22852 8.58333L8.41602 9.77083L7.83268 9.16667Z'
                  fill='#707171'
                />
              </svg>
            </div>
          </span>
        )}
        {props.maxLength && (
          <span className='absolute -top-5 right-2 text-xs font-normal text-grey-9'>
            {valueLength}/{props.maxLength}
          </span>
        )}
      </span>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
