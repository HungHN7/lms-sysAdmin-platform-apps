import * as React from 'react';
import { Check, ChevronDown, Circle } from 'lucide-react';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  useCommand,
} from '../ui';
import { cn } from 'src/utils/classnames';
import Loading from '../loading';

type TOption = {
  label: string;
  value: string;
};

interface ComboboxProps {
  options: TOption[];
  placeholder?: string;
  placeholderSearch?: string;
  textEmpty?: string;
  value?: string;
  onSelect?: (value: string) => void;
  iconCheck?: boolean;
  loading?: boolean;
}

export function Combobox({
  options,
  placeholder,
  placeholderSearch,
  textEmpty,
  value,
  onSelect,
  iconCheck,
  loading,
}: ComboboxProps) {
  const refValue = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const ScrollItem = (props) => {
    const count = useCommand((state) => state.filtered.count);

    return (
      <ScrollArea
        {...props}
        className={cn(count > 9 ? 'h-[288px]' : 'h-full')}
      />
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      modal
    >
      <PopoverTrigger asChild>
        <Button
          ref={refValue}
          variant='tertiary'
          typeButton='main'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between py-2 px-3',
            open && 'ring-ring ring-2 border-background',
            !value && 'text-muted-foreground',
          )}
        >
          <span className='flex-1 inline-block text-start'>
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder
                ? placeholder
                : 'Select option...'}
          </span>

          <ChevronDown className='h-5 w-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: (refValue.current && refValue.current.clientWidth) ?? 200 + 'px' }}
        className='w-full p-0'
      >
        <Command>
          <CommandInput placeholder={placeholderSearch ? placeholderSearch : 'Search option...'} />
          <CommandEmpty>{textEmpty ? textEmpty : 'No option found.'}</CommandEmpty>
          <CommandGroup>
            <Loading isLoading={loading}>
              <ScrollItem>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onSelect?.(option.value);
                      setOpen(false);
                    }}
                    className='line-clamp-1 flex'
                  >
                    {iconCheck ? (
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === option.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    ) : (
                      <span
                        className={cn(
                          'flex h-4 w-4 items-center justify-center border-[1.5px] border-foreground rounded-full mr-2',
                        )}
                      >
                        {value === option.value && (
                          <Circle className='h-2.5 w-2.5 fill-current text-current' />
                        )}
                      </span>
                    )}

                    {option.label}
                  </CommandItem>
                ))}
              </ScrollItem>
            </Loading>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
