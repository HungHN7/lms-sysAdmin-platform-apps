import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { DayPicker, useNavigation } from 'react-day-picker';
import { cn } from 'src/utils/classnames';
import { buttonVariants } from 'src/components/ui';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const { currentMonth, goToMonth, nextMonth, previousMonth } = useNavigation();
  const handlePrevYearClick = () => {
    // const prevYearDate = new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth());
    const prevYearDate = new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth());
    goToMonth(prevYearDate);
  };
  const handleNextYearClick = () => {
    const nextYearDate = new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth());
    goToMonth(nextYearDate);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: cn('flex flex-col sm:flex-row space-y sm:space-x sm:space-y-0 divide-x'),
        month: cn(''),
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants('ghost')({ variant: 'secondary' }),
          'h-7 w-7 bg-transparent p-0 ',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-foreground rounded-md w-9 font-normal text-sm last:text-destructive last:font-semibold [&:nth-last-child(2)]:text-destructive [&:nth-last-child(2)]:font-semibold',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-end)>button]:rounded-l-none [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected].day-range-start)>button]:rounded-r-none [&:has([aria-selected].day-range-end.day-range-start)>button]:rounded-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 last:text-destructive [&:nth-last-child(2)]:text-destructive',
        day: cn(
          buttonVariants('ghost')({ variant: 'secondary' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end !bg-primary-foreground !border-2 !border-primary !text-black',
        day_selected:
          'bg-primary text-primary-foreground hover:!bg-primary hover:!text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today:
          'text-primary relative after:absolute after:bottom-[3px] after:left-[45%]  after:h-1 after:w-1 after:bg-primary',
        day_outside:
          'day-outside text-grey-8  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-primary-light aria-selected:text-accent-foreground aria-selected:rounded-none',
        day_hidden: 'invisible',
        day_range_start: 'day-range-start ',
        ...classNames,
      }}
      month={currentMonth}
      // toMonth={nextMonth}
      components={{
        // IconLeft: () => <ChevronLeft size={20} />,
        // IconRight: () => <ChevronRight className='h-4 w-4' />,
        // CaptionLabel: ({ displayMonth }) => (
        //   <div className='text-sm font-medium flex gap-3'>
        //     {/* Month number to month name */}
        //     <span>{displayMonth.toLocaleString('en-us', { month: 'long' })}</span>
        //     <span className='text-primary'>{displayMonth.getFullYear()}</span>
        //   </div>
        // ),

        Caption({ displayIndex }) {
          return (
            <div
              className={cn(
                'flex pt-1 relative items-center mb-5',
                props.mode === 'single'
                  ? 'justify-between'
                  : displayIndex === 0
                    ? 'justify-start'
                    : 'justify-end',
              )}
            >
              {props.mode === 'range' && (
                <>
                  {displayIndex === 0 && (
                    <>
                      <button
                        className={cn(
                          buttonVariants('ghost')({ variant: 'secondary' }),
                          'h-8 w-8 bg-transparent p-0',
                        )}
                        aria-label='Previous month'
                        onClick={handlePrevYearClick}
                      >
                        <ChevronsLeft size={20} />
                      </button>
                      <button
                        className={cn(
                          buttonVariants('ghost')({ variant: 'secondary' }),
                          'h-8 w-8 bg-transparent p-0',
                        )}
                        aria-label='Previous month'
                        onClick={() => goToMonth(previousMonth)}
                      >
                        <ChevronLeft size={20} />
                      </button>
                    </>
                  )}
                  <div
                    className={cn('flex gap-3 items-center', displayIndex === 0 ? 'ml-5' : 'mr-5')}
                  >
                    <span className='text-base font-semibold'>
                      {displayIndex === 0
                        ? currentMonth.toLocaleString('en-us', { month: 'long' })
                        : nextMonth?.toLocaleString('en-us', { month: 'long' })}
                    </span>
                    <span className='text-primary'>
                      {displayIndex === 0 ? currentMonth.getFullYear() : nextMonth?.getFullYear()}
                    </span>
                  </div>

                  {displayIndex === 1 && (
                    <>
                      {' '}
                      <button
                        className={cn(
                          buttonVariants('ghost')({ variant: 'secondary' }),
                          'h-8 w-8 bg-transparent p-0',
                        )}
                        aria-label='Next month'
                        onClick={() => goToMonth(nextMonth)}
                      >
                        <ChevronRight size={20} />
                      </button>
                      <button
                        className={cn(
                          buttonVariants('ghost')({ variant: 'secondary' }),
                          'h-8 w-8 bg-transparent p-0',
                        )}
                        aria-label='Next month'
                        onClick={handleNextYearClick}
                      >
                        <ChevronsRight size={20} />
                      </button>
                    </>
                  )}
                </>
              )}
              {props.mode === 'single' && (
                <>
                  <button
                    className={cn(
                      buttonVariants('ghost')({ variant: 'secondary' }),
                      'h-8 w-8 bg-transparent p-0',
                    )}
                    aria-label='Previous month'
                    onClick={handlePrevYearClick}
                  >
                    <ChevronsLeft size={20} />
                  </button>
                  <button
                    className={cn(
                      buttonVariants('ghost')({ variant: 'secondary' }),
                      'h-8 w-8 bg-transparent p-0',
                    )}
                    aria-label='Previous month'
                    onClick={() => goToMonth(previousMonth)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className='flex gap-3 items-center'>
                    <span className='text-base font-semibold'>
                      {displayIndex === 0
                        ? currentMonth.toLocaleString('en-us', { month: 'long' })
                        : nextMonth?.toLocaleString('en-us', { month: 'long' })}
                    </span>
                    <span className='text-primary'>
                      {displayIndex === 0 ? currentMonth.getFullYear() : nextMonth?.getFullYear()}
                    </span>
                  </div>

                  <button
                    className={cn(
                      buttonVariants('ghost')({ variant: 'secondary' }),
                      'h-8 w-8 bg-transparent p-0',
                    )}
                    aria-label='Next month'
                    onClick={() => goToMonth(nextMonth)}
                  >
                    <ChevronRight size={20} />
                  </button>
                  <button
                    className={cn(
                      buttonVariants('ghost')({ variant: 'secondary' }),
                      'h-8 w-8 bg-transparent p-0',
                    )}
                    aria-label='Next month'
                    onClick={handleNextYearClick}
                  >
                    <ChevronsRight size={20} />
                  </button>
                </>
              )}
            </div>
          );
        },
      }}
      ISOWeek
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
