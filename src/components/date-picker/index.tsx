import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Calendar,
  CalendarProps,
} from 'src/components/ui';
import { cn } from 'src/utils/classnames';
import { Matcher, NavigationProvider, DayPickerProvider } from 'react-day-picker';
import { ReadOnlyIcon } from 'src/assets/icons';

interface DatePickerProps {
  className?: string;
  placeholder?: string;
  date?: Date;
  setDate?: (day: Date | undefined) => void;
  formatDate?: string;
  disabled?: Matcher | Matcher[];
  disabledClick?: boolean;
  classNameCalendar?: string;
  readonly?: boolean;
}
const FOCUS_CLASS = `outline-primary-outline 
    outline
    outline-offset-1
    outline-2
    ring-1
    ring-ring 
    border-background `;
const DatePicker: React.FC<DatePickerProps & CalendarProps> = ({
  className,
  placeholder,
  date,
  setDate,
  formatDate = 'dd/MM/yyyy',
  classNameCalendar,
  readonly = false,
  disabledClick,
  ...props
}) => {
  const [datePicker, setDatePicker] = React.useState<Date>();
  const [openState, setOpenState] = React.useState(false);
  const _date = date ? date : datePicker;

  return (
    <Popover
      onOpenChange={(open) => {
        setOpenState(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant='tertiary'
          className={cn(
            'w-[280px] justify-between font-normal px-2',
            !_date && 'text-muted-foreground',
            openState === true && FOCUS_CLASS,
            className,
          )}
          disabled={disabledClick}
          onClick={(e) => {
            readonly && e.preventDefault();
          }}
        >
          <span className='truncate flex-1 text-start'>
            {_date ? (
              format(_date, formatDate)
            ) : (
              <span>{placeholder ? placeholder : formatDate.toLocaleLowerCase()}</span>
            )}
          </span>
          <span className='text-foreground flex gap-4'>
            {readonly && <ReadOnlyIcon />}
            <CalendarIcon className='mr-l h-4 w-4' />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0'
        align='start'
      >
        <DayPickerProvider
          initialProps={{
            fromYear: new Date().getFullYear() - 100,
            toYear: new Date().getFullYear() + 100,
          }}
        >
          <NavigationProvider>
            <Calendar
              {...props}
              mode='single'
              selected={_date}
              onSelect={(date) => {
                setDate?.(date);
                setDatePicker(date);
              }}
              initialFocus
              className={classNameCalendar}
            />
          </NavigationProvider>
        </DayPickerProvider>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
