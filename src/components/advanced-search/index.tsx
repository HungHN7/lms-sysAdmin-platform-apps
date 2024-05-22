import React, { KeyboardEventHandler } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import Select, {
  components,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  MultiValueRemoveProps,
  OptionProps,
  ActionMeta,
  MultiValue,
  OptionsOrGroups,
  GroupBase,
} from 'react-select';
import { RiCloseCircleFill, RiCloseLine } from 'react-icons/ri';
import { cn } from 'src/utils/classnames';

import './styles.css';

interface SelectProProps {
  isMulti?: boolean;
  isClearable?: boolean;
  options?: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
  NoOptionsMessage?: string | React.ReactNode;
  onChange?: (option: MultiValue<unknown>, action: ActionMeta<unknown>) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  value?: unknown;
  defaultValue?: unknown;
  classNameContainer?: string;
  placement?: 'bottom' | 'top';
  onInputChange?: (input: string) => void;
  inputValue?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  isSearchable?: boolean;
  menuIsOpen?: boolean;
  openMenuOnClick?: boolean;
  openMenuOnFocus?: boolean;
  innerRef?: React.RefAttributes<any> | undefined;
}
const classNamePlacement = {
  top: '',
  bottom: 'top-unset bottom-[calc(100%+6px)]',
};

export const AdvancedSetting: React.FC<SelectProProps> = ({
  NoOptionsMessage,
  onChange,
  options,
  placeholder,
  isClearable,
  disabled,
  loading,
  error,
  value,
  defaultValue,
  classNameContainer,
  placement = 'top',
  onInputChange,
  inputValue,
  onKeyDown,
  isSearchable,
  menuIsOpen,
  openMenuOnClick,
  openMenuOnFocus,
  innerRef,
}) => {
  return (
    <Select
      ref={innerRef as any}
      openMenuOnClick={openMenuOnClick}
      openMenuOnFocus={openMenuOnFocus}
      menuIsOpen={menuIsOpen}
      isSearchable={isSearchable}
      value={value}
      defaultValue={defaultValue}
      isClearable={isClearable}
      isMulti
      options={options}
      onChange={onChange}
      onInputChange={onInputChange}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      placeholder={placeholder}
      isDisabled={disabled}
      isLoading={loading}
      inputValue={inputValue}
      onKeyDown={onKeyDown}
      filterOption={() => true}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none',
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: 'normal',
          overflow: 'visible',
        }),
        multiValueRemove: (base) => ({
          ...base,
          display: 'none',
        }),
        control: (base) => ({
          ...base,
          transition: 'none',
        }),
      }}
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        Option,
      }}
      noOptionsMessage={() => NoOptionsMessage}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            'border rounded-md bg-background hover:cursor-pointer min-h-10 border-input',
            isFocused && 'border-background ring-ring ring-2',
            error && 'ring-destructive',
          ),
        placeholder: () => 'text-muted-foreground text-sm',
        input: () => 'text-sm',
        valueContainer: () => 'px-3 py-1 gap-1',
        singleValue: () => 'text-sm selected-value',
        // multiValue: () => 'bg-accent rounded-xl px-1 text-sm',
        multiValueLabel: () => 'text-sm',
        // multiValueRemove: () => '',
        // indicatorsContainer: () => '',
        // clearIndicator: () => '',
        indicatorSeparator: () => 'hidden',
        dropdownIndicator: () => 'pr-2.5 pl-2.5',
        menu: () => cn('p-1 mt-2 border bg-background rounded-lg', classNamePlacement[placement]),
        // groupHeading: () => groupHeadingStyles,
        option: ({
          isFocused,
          // isSelected, isDisabled
        }) =>
          cn(
            'hover:cursor-pointer px-3 py-2 rounded text-sm',
            isFocused && 'bg-accent',
            // isSelected && 'bg-primary/20 hover:bg-primary/20',
            // isDisabled && 'opacity-70 hover:cursor-not-allowed',
          ),
        noOptionsMessage: () =>
          'bg-background text-foreground px-3 py-2 rounded text-sm text-center',
        menuList: () => 'text-sm select-pro-menu-list',
        container: () => cn(classNameContainer),
      }}
    />
  );
};

const Option = (props: OptionProps) => {
  return (
    <components.Option {...props}>
      <div className='flex items-center justify-between'>
        <span className='flex-1 text-start truncate'>{props.label}</span>
        {/* {props.isSelected && props.isMulti && <RiCheckFill className='w-4 h-4 text-foreground' />} */}
      </div>
    </components.Option>
  );
};
const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon
        className={cn(
          'w-4 h-4 text-foreground transition-all duration-300',
          props.isFocused && 'rotate-180',
        )}
      />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <RiCloseCircleFill className='w-4 h-4 text-foreground' />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <RiCloseLine className='w-4 h-4 text-foreground' />
    </components.MultiValueRemove>
  );
};
