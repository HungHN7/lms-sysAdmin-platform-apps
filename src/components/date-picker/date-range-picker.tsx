import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange, DayPickerProvider, NavigationProvider } from 'react-day-picker';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Calendar,
  CalendarProps,
} from 'src/components/ui';
import { cn } from 'src/utils/classnames';

interface DateRangePickerProps {
  className?: string;
  formatDate?: string;
  dateRange?: DateRange;
  setDateRange?: (date: DateRange | undefined) => void;
  placeholder?: string;
  classNameCalendar?: string;
}
const FOCUS_CLASS = `outline-primary-outline 
    outline
    outline-offset-1
    outline-2
    ring-1
    ring-ring 
    border-background `;
const DateRangePicker: React.FC<DateRangePickerProps & CalendarProps> = ({
  className,
  formatDate = 'dd/MM/yyyy',
  dateRange,
  setDateRange,
  placeholder,
  classNameCalendar,
  ...props
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [openState, setOpenState] = React.useState(false);

  const _dateRange = dateRange ? dateRange : date;

  return (
    <Popover
      onOpenChange={(open) => {
        setOpenState(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant='tertiary'
          className={cn(
            'w-[300px] justify-between text-left font-normal',
            !_dateRange && 'text-muted-foreground',
            openState === true && FOCUS_CLASS,
            className,
          )}
        >
          <span className='truncate flex-1 text-start'>
            {_dateRange?.from ? (
              _dateRange.to ? (
                <>
                  {format(_dateRange.from, formatDate)} - {format(_dateRange.to, formatDate)}
                </>
              ) : (
                format(_dateRange.from, formatDate)
              )
            ) : (
              <span>{placeholder ? placeholder : 'Pick a date range picker'}</span>
            )}
          </span>

          <span className='text-foreground'>
            <CalendarIcon className='ml-2 h-4 w-4' />
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
              initialFocus
              mode='range'
              defaultMonth={_dateRange?.from}
              selected={_dateRange}
              onSelect={(date) => {
                setDate(date);
                setDateRange?.(date);
              }}
              numberOfMonths={2}
              className={classNameCalendar}
            />
          </NavigationProvider>
        </DayPickerProvider>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
