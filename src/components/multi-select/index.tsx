import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from 'src/components/ui/button';
import { Command, CommandGroup, CommandInput, CommandItem } from 'src/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { cn } from 'src/utils/classnames';
import { Checkbox, ScrollArea } from '../ui';
import { CloseIcon } from 'src/assets/icons';

export type OPTIONS = Record<'value' | 'label', string>;

interface MultiSelectProps {
  classNameScroll?: string;
  classNameValue?: string;
  classNameOptions?: string;
  width?: string | number;
  showSearch?: boolean;
  mode?: 'tags' | 'multiple';
  options: OPTIONS[];
  value: OPTIONS[];
  onChange: (value: OPTIONS[]) => void;
}

export default function MultiSelect({
  classNameScroll,
  classNameValue,
  classNameOptions,
  width,
  showSearch,
  mode = 'tags',
  options = [],
  value,
  onChange,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number>();
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  React.useEffect(() => {
    const buttonWidth = buttonRef.current?.offsetWidth;
    if (buttonWidth) {
      setPopoverWidth(buttonWidth);
    }
    if (buttonRef.current) {
      buttonRef.current?.addEventListener('resize', () => {
        setPopoverWidth(buttonRef.current?.offsetWidth);
      });
    }
  }, [buttonRef.current?.offsetWidth]);

  const toggleFramework = (option: OPTIONS) => {
    if (!value?.map((val) => val.value)?.includes(option.value)) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((el) => el.value !== option.value));
    }
    inputRef?.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur();
    setOpenCombobox(value);
  };

  const renderSelectedItems = () => {
    if (mode === 'multiple') {
      return value.length > 2
        ? `${value.length} labels selected`
        : value.length === 2
          ? value.map(({ label }) => label).join(', ')
          : value.length === 1
            ? value[0].label
            : 'Select labels';
    }

    const unSelectItem = (
      ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      selectedValue: string,
    ) => {
      ev.stopPropagation();
      const selectedItems = value.filter((item) => item.value !== selectedValue);
      onChange(selectedItems);
    };

    return (
      <div className='flex flex-row gap-[6px] flex-wrap'>
        {value.length === 0
          ? 'Select labels'
          : value.map((item, index) => (
              <div
                className='bg-primary/20 text-primary px-[10px] py-[6px] rounded-sm flex gap-2 items-center text-xs font-semibold'
                key={index}
              >
                {item.label}
                <button onClick={(ev) => unSelectItem(ev, item.value)}>
                  <CloseIcon />
                </button>
              </div>
            ))}
      </div>
    );
  };

  return (
    <Popover
      open={openCombobox}
      onOpenChange={onComboboxOpenChange}
    >
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant='outline'
          role='combobox'
          aria-expanded={openCombobox}
          className={cn(
            `min-w-[200px] w-full text-foreground bg-accent`,
            mode === 'tags' && 'py-[5px] h-[unset] min-h-10',
            classNameValue,
          )}
          style={{
            ...(width ? { width } : {}),
            ...(mode === 'tags' ? { minHeight: '2.5rem' } : {}),
          }}
        >
          <div className='flex-1 text-start'>{renderSelectedItems()}</div>
          <ChevronDownIcon className='ml-2 h-4 w-4 stroke-[3px]' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(`min-w-[200px]  p-0`, classNameOptions)}
        style={{ ...(width ? { width } : { width: popoverWidth && `${popoverWidth}px` }) }}
      >
        <Command loop>
          <CommandInput
            ref={inputRef}
            placeholder='Search framework...'
            value={inputValue}
            onValueChange={showSearch ? setInputValue : undefined}
            classNameWrapper={cn(!showSearch && 'w-0 h-0 border-none')}
            classNameIcon={cn(!showSearch && 'w-0 h-0')}
          />

          <ScrollArea className={cn(options.length >= 5 && 'h-[200px]', classNameScroll)}>
            <CommandGroup>
              {options.map((option) => {
                const isActive = value.findIndex((el) => el.value === option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggleFramework(option)}
                  >
                    <div className='mr-2 flex items-center'>
                      <Checkbox
                        checked={isActive !== -1}
                        className='pointer-events-none'
                        tabIndex={-1}
                        aria-readonly
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='truncate'>{option.label}</div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
