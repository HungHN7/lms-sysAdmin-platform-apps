import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from 'lucide-react';
import * as React from 'react';
import { ClearInputIcon, ReadOnlyIcon } from 'src/assets/icons';
import { Show } from 'src/shared';
import { cn } from 'src/utils/classnames';
import { roundingNumber } from 'src/utils/helpers/numbers';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPlacement?: 'left' | 'right';
  classNameIcon?: string;
  sizeInput?: 'small' | 'medium' | 'large';
  allowClear?: boolean;
  classNameInputWrapper?: string;
  autoSize?: boolean;
  minWidth?: number | string;
  maxWidth?: number | string;
  classNameAutoSize?: string;
  isError?: boolean;
  isShowfocus?: boolean;
  hideReadonlyIcon?: boolean;

  // isShowIconDisableField?: boolean;
}

const FOCUS_CLASS = `focus:outline-primary-outline 
    focus:outline
    focus:outline-offset-1
    focus:outline-2
    focus:ring-1
    focus:ring-ring 
    focus:border-background `;
const FOCUS_WITHIN_CLASS = `focus-within:outline-primary-outline 
    focus-within:outline
    focus-within:outline-offset-1
    focus-within:outline-2
    focus-within:ring-1
    focus-within:ring-ring 
    focus-within:border-background `;
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classNameInputWrapper,
      type,
      icon,
      iconPlacement = 'left',
      classNameIcon,
      sizeInput = 'medium',
      allowClear,
      onChange,
      autoSize,
      minWidth,
      maxWidth,
      classNameAutoSize,
      isError,
      isShowfocus = true,
      // isShowIconDisableField,

      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState(props.value);
    const [focus, setFocus] = React.useState<boolean>(false);
    const [width, setWidth] = React.useState(minWidth || 16);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const autoSizeRef = React.useRef<HTMLSpanElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    const currentValue = React.useMemo(() => props.value || value, [props.value, value]);

    const setAutoSize = React.useCallback(() => {
      if (autoSize && autoSizeRef.current) {
        setWidth(Number(autoSizeRef.current?.offsetWidth) + 4);
      }
    }, [currentValue, autoSize]);

    React.useEffect(() => {
      setAutoSize();
    }, [setAutoSize]);

    return (
      <span
        className={cn(
          'relative inline-block bg-background rounded-md max-w-full',
          !autoSize && 'w-full',
          'input-container',
          classNameInputWrapper,
        )}
      >
        {icon && (
          <span
            className={cn(
              'absolute inset-y-0 flex items-center justify-center pointer-events-none w-10',
              iconPlacement === 'right' ? 'end-0 pe-0' : 'start-0 ps-0',
              'input-icon',
              classNameIcon,
            )}
          >
            {icon}
          </span>
        )}

        <input
          value={currentValue}
          type={type}
          className={cn(
            `flex 
            h-full 
            w-full 
            rounded-md 
            border 
            border-input 
            bg-transparent 
            text-sm
            ring-offset-background 
            file:border-0 
            file:bg-transparent 
            file:text-sm 
            file:font-medium 
            text-grey-12
            disabled:cursor-not-allowed 
            disabled:opacity-50,
            max-w-full
            `,
            icon ? (iconPlacement === 'right' ? 'pr-12 pl-3' : 'pr-4 pl-12') : 'px-3',
            sizeInput === 'medium'
              ? 'py-2.5 min-h-[40px]'
              : sizeInput === 'small'
                ? 'py-2 min-h-[32px]'
                : 'py-4 min-h-[48px]',
            isError
              ? 'border-destructive focus:outline-none'
              : (isShowfocus && !props.readOnly)
                ? FOCUS_CLASS
                : 'focus:outline-none',
            ` 
              `,
            'input-content',
            props.readOnly && 'cursor-not-allowed !pr-10',

            className,
          )}
          ref={inputRef}
          {...props}
          onFocus={(e) => {
            setFocus(true);
            props?.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            props?.onBlur?.(e);
          }}
          onChange={handleChange}
          style={{
            ...(autoSize && { width, minWidth }),
            ...props.style,
          }}
        />

        {autoSize && (
          <span
            className={cn(
              'invisible fixed left-0 box-content text-sm min-w-6',
              icon ? (iconPlacement === 'right' ? 'pr-10 pl-3' : 'pr-3 pl-10') : 'px-3',
              sizeInput === 'medium' ? 'py-3' : sizeInput === 'small' ? 'py-2' : 'py-4',
              classNameAutoSize,
            )}
            ref={autoSizeRef}
            style={{ minWidth, maxWidth }}
          >
            {currentValue}
          </span>
        )}

        {allowClear && !props.readOnly && (
          <button
            className={cn(
              'absolute top-1/2 -translate-y-1/2 right-3 rounded-full focus:outline-none focus:ring-ring focus:ring-2 opacity-0',
              iconPlacement === 'right' && 'right-10',
              value && focus && 'opacity-100',
              !value && 'pointer-events-none',
            )}
            disabled={!value}
            onClick={(e) => {
              if (!onChange) {
                setValue('');

                inputRef.current?.focus();
                return;
              }
              let event;

              if (e.type === 'click') {
                event = cloneEvent(e, inputRef.current as HTMLInputElement, '');
                onChange(event as React.ChangeEvent<HTMLInputElement>);

                inputRef.current?.focus();
                return;
              }
            }}
            type='button'
          >
            <ClearInputIcon />
          </button>
        )}
        <Show when={props.readOnly && !props.hideReadonlyIcon}>
          <span className={cn('absolute top-1/2 -translate-y-1/2 right-3')}>
            <div>
              <ReadOnlyIcon />
            </div>
          </span>
        </Show>
      </span>
    );
  },
);
Input.displayName = 'Input';

const NumberInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    onValueChange?: (value: string) => void;
    inputType?: 'integer' | 'decimal';
    decimal?: {
      separator: 'DOT' | 'COMMA';
      place: number;
    };
    variant?: 'number' | 'special' | 'math';
    hiddenAction?: boolean;
    specialNode?: React.ReactNode;
    isPositiveNumber?: boolean;
  }
>(
  (
    {
      onValueChange,
      inputType = 'integer',
      variant = 'number',
      decimal,
      sizeInput,
      className,
      hiddenAction = true,
      isError,
      specialNode,
      isPositiveNumber,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const [value, setValue] = React.useState(props.value);

    const inputMode = React.useMemo(
      () => (decimal ? 'decimal' : inputType === 'integer' ? 'numeric' : 'decimal'),
      [decimal, inputType],
    );
    const regex = React.useMemo(
      () =>
        decimal?.separator
          ? new RegExp(
              `^${isPositiveNumber ? '' : '-?'}\\d*(${
                decimal?.separator === 'DOT' ? '\\.' : ','
              }\\d{0,${decimal.place}})?$`,
            )
          : inputType === 'integer'
            ? new RegExp(`^${isPositiveNumber ? '' : '-?'}\\d*$`)
            : new RegExp(`^${isPositiveNumber ? '' : '-?'}\\d*\\.?\\d*$`),
      [decimal, inputType],
    );

    const currentValue = React.useMemo(() => props.value || value, [props.value, value]);

    const condition = (valueChange: string | number) =>
      ((props.min &&
        props.max &&
        Number(valueChange) >= Number(props.min) &&
        Number(valueChange) <= Number(props.max)) ||
        (props.min && Number(valueChange) >= Number(props.min)) ||
        (props.max && Number(valueChange) <= Number(props.max)) ||
        (!props.min && !props.max)) &&
      ((regex.test(valueChange.toString()) && variant !== 'number') || variant === 'number');

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (condition(inputValue)) {
        setValue(inputValue);
        onValueChange?.(inputValue);

        props.onChange?.(e);
      }
    };

    const updateValue = React.useCallback(() => {
      if (props.value) {
        if (decimal) {
          onValueChange?.(
            roundingNumber(
              props.value as string,
              decimal?.separator === 'DOT' ? '.' : ',',
              decimal.place,
            ),
          );
        } else {
          onValueChange?.(roundingNumber(props.value as string));
        }
      }
    }, [decimal?.separator, decimal?.place]);

    React.useEffect(() => {
      updateValue();
    }, [updateValue]);

    const onHandleChange =
      (type: 'plus' | 'minus') => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const valueChange =
          type === 'plus'
            ? Math.round(Number(currentValue ?? 0)) + 1
            : Math.round(Number(currentValue ?? 0)) - 1;

        if (condition(valueChange)) {
          setValue(valueChange);
          onValueChange?.(valueChange.toString());

          const event = cloneEvent(e, inputRef.current as HTMLInputElement, valueChange);
          props.onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
        }
      };

    return (
      <div
        className={cn(
          !props.readOnly && 'border rounded-md ring-ring focus-within:ring-2 flex items-center group h-10',
          sizeInput === 'large' ? 'h-[52px]' : sizeInput === 'small' ? 'h-[35px]' : 'h-10',
          variant === 'special' &&
            'border-background focus-within:ring-0 hover:border-border focus-within:border-border w-fit px-2 gap-1 relative group',
          props.autoSize && 'w-fit max-w-full',
          (isError || props.readOnly) ? '!border-destructive focus-within:!border-background' : FOCUS_WITHIN_CLASS,

          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        <Input
          value={currentValue}
          ref={inputRef}
          {...props}
          inputMode={inputMode}
          onChange={onChangeInput}
          className={cn(
            'border-none flex-1 bg-transparent focus:outline-none',
            sizeInput === 'small' && 'py-1.5',
            variant === 'special' && 'px-1',
          )}
          classNameInputWrapper={cn('bg-transparent', props.classNameInputWrapper)}
          {...(variant === 'number' && { type: 'number' })}
          {...(variant === 'special' && {
            autoSize: true,
            minWidth: 4,
            classNameAutoSize: 'px-1',
          })}
          isShowfocus={false}
        />
        {variant === 'number' && !props.icon && !hiddenAction && (
          <div
            className='w-10 h-full flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100  
          '
          >
            <span
              role='button'
              className={cn('w-3.5 h-3.5 flex items-center justify-center rounded hover:bg-accent')}
              onClick={onHandleChange('plus')}
            >
              <ChevronUpIcon className='w-3 h-3' />
            </span>
            <span
              role='button'
              className='w-3.5 h-3.5 flex items-center justify-center rounded hover:bg-accent'
              onClick={onHandleChange('minus')}
            >
              <ChevronDownIcon className='w-3 h-3' />
            </span>
          </div>
        )}

        {variant === 'special' && (
          <span className='block text-sm -mb-[2px]'>{specialNode ? specialNode : 'Points'}</span>
        )}
        {variant === 'special' && (
          <div className='absolute w-fit h-fit flex flex-col border -left-7 z-1 bg-background rounded-sm invisible group-hover:visible group-focus-within:visible input-handle'>
            <button
              role='button'
              className={cn(
                'h-5 w-5 flex items-center justify-center border-b-[0.5px]',
                props.max && Number(props.max) === Number(currentValue) && 'text-muted',
              )}
              onClick={onHandleChange('plus')}
              disabled={Number(props.max) === Number(currentValue)}
            >
              <PlusIcon className='w-3 h-3' />
            </button>
            <button
              role='button'
              className={cn(
                'h-5 w-5 flex items-center justify-center border-t-[0.5px]',
                props.min && Number(props.min) === Number(currentValue) && 'text-muted',
              )}
              onClick={onHandleChange('minus')}
              disabled={Number(props.min) === Number(currentValue)}
            >
              <MinusIcon className='w-3 h-3' />
            </button>
          </div>
        )}
      </div>
    );
  },
);

export { Input, NumberInput };

function cloneEvent<
  EventType extends React.SyntheticEvent<any, any>,
  Element extends HTMLInputElement | HTMLTextAreaElement,
>(event: EventType, target: Element, value: any): EventType {
  const currentTarget = target.cloneNode(true) as Element;

  const newEvent = Object.create(event, {
    target: { value: currentTarget },
    currentTarget: { value: currentTarget },
  });

  currentTarget.value = value;

  if (typeof target.selectionStart === 'number' && typeof target.selectionEnd === 'number') {
    currentTarget.selectionStart = target.selectionStart;
    currentTarget.selectionEnd = target.selectionEnd;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newEvent;
}
