import { ChevronDownIcon, Search } from 'lucide-react';
import { RiCheckFill, RiCloseLine } from 'react-icons/ri';
import Select, {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  OptionProps,
  ValueContainerProps,
  components,
} from 'react-select';
import { cn } from 'src/utils/classnames';
import { Tag } from '../ui';

import React, { useCallback, useState } from 'react';
import { If, Then } from 'react-if';
import { JSX } from 'react/jsx-runtime';
import { ClearInputIcon, ReadOnlyIcon } from 'src/assets/icons';
import { getTextFromJSX } from 'src/utils/helpers/get-text';
import './styles.css';

export type TSelectProOption = {
  value: string;
  label: string | React.ReactNode | JSX.Element;
  isFixed?: boolean;
  isDisabled?: boolean;
};

export interface SelectProProps {
  isMulti?: boolean;
  isClearable?: boolean;
  options?: TSelectProOption[];
  NoOptionsMessage?: string | React.ReactNode;
  onChange?: (option: TSelectProOption) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  value?: unknown | TSelectProOption;
  defaultValue?: unknown | TSelectProOption;
  classNameContainer?: string;
  placement?: 'bottom' | 'top';
  onInputChange?: (input: string) => void;
  isShowSelectedItemCount?: boolean;
  isShowSearchIcon?: boolean;
  isReadOnly?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  selectSize?: 'small' | 'medium' | 'large';
  menuPosition?: 'absolute' | 'fixed';
  styleMenuPortal?: React.CSSProperties;
  menuPortalTarget?: HTMLElement | null | undefined;
  id?: string;
  menuPlacement?: 'top' | 'bottom' | 'auto';
  onMenuScrollToBottom?: ((event: WheelEvent | TouchEvent) => void) | undefined;
}
const classNamePlacement = {
  top: '',
  bottom: 'top-unset bottom-[calc(100%+6px)]',
};

export const SelectPro: React.FC<SelectProProps> = ({
  isMulti,
  isClearable,
  isShowSelectedItemCount = false,
  isShowSearchIcon = false,
  isReadOnly = false,
  NoOptionsMessage,
  options,
  placeholder,
  disabled,
  loading,
  error,
  value,
  defaultValue,
  classNameContainer,
  placement = 'top',
  selectSize = 'medium',
  onBlur,
  onChange,
  onInputChange,
  menuPosition,
  styleMenuPortal,
  menuPortalTarget,
  id,
  menuPlacement = 'auto',
  onMenuScrollToBottom,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const heightClasses = {
    small: '32px',
    medium: '40px',
    large: '48px',
  };

  const handleMenuOpen = () => {
    if (!isReadOnly) {
      setMenuIsOpen(true);
    }
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  const componentsToRender = {
    Option,
    ClearIndicator: isReadOnly ? () => null : ClearIndicator,
    MultiValueRemove: useCallback(
      (props: MultiValueRemoveProps & { isReadOnly?: boolean }) => (
        <MultiValueRemove
          {...props}
          isReadOnly={isReadOnly}
        />
      ),
      [isReadOnly],
    ),
    DropdownIndicator: useCallback(
      (
        props: DropdownIndicatorProps & {
          isReadOnly?: boolean;
        },
      ) => (
        <DropdownIndicator
          {...props}
          isReadOnly={isReadOnly}
        />
      ),
      [isReadOnly],
    ),
    Control: useCallback(
      (
        props: JSX.IntrinsicAttributes &
          ControlProps<unknown, boolean, GroupBase<unknown>> & {
            isShowIconSearch?: boolean | undefined;
            isReadOnly?: boolean;
          },
      ) => (
        <Control
          {...props}
          isShowSearchIcon={isShowSearchIcon}
          isReadOnly={isReadOnly}
        />
      ),
      [isShowSearchIcon, isReadOnly],
    ),
    ...(isShowSelectedItemCount &&
      isMulti && {
        ValueContainer: useCallback(
          (
            props: ValueContainerProps & {
              isShowSelectedItemCount?: boolean;
            },
          ) => (
            <ValueContainer
              {...props}
              isShowSelectedItemCount={isShowSelectedItemCount && isMulti}
            />
          ),
          [],
        ),
      }),
  };

  if (isShowSelectedItemCount) {
    componentsToRender['MultiValue'] = () => null;
  }

  const clearableProp = isShowSelectedItemCount ? false : isClearable;

  const handleFilter = (option, searchText) => {
    const value = option.value;
    // Get text from the label to search
    const label = getTextFromJSX(option.label);
    if (
      label.toLowerCase().includes(searchText.toLowerCase()) ||
      value.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  return (
    <Select
      id={id}
      menuPortalTarget={menuPortalTarget}
      menuPosition={menuPosition}
      menuShouldBlockScroll={!isShowSelectedItemCount}
      isSearchable={!isReadOnly}
      onBlur={onBlur}
      value={value}
      defaultValue={defaultValue}
      isClearable={clearableProp}
      isMulti={isMulti}
      options={options}
      onMenuOpen={handleMenuOpen}
      filterOption={handleFilter}
      onMenuClose={handleMenuClose}
      menuIsOpen={menuIsOpen}
      menuPlacement={menuPlacement}
      onChange={(option) => {
        onChange?.(option as TSelectProOption);
      }}
      onInputChange={onInputChange}
      closeMenuOnSelect={!isMulti}
      hideSelectedOptions={false}
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
        control: (base) => ({
          ...base,
          minHeight: heightClasses[selectSize] || heightClasses.medium,
          transition: 'none',
          backgroundColor: disabled ? '#FAFAFA !important' : isReadOnly ? 'white' : '',
        }),
        menuPortal: (base) => ({
          ...base,
          ...styleMenuPortal,
        }),
      }}
      components={componentsToRender}
      noOptionsMessage={() => NoOptionsMessage}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            'border rounded-md bg-background hover:cursor-pointer border-input',
            isFocused && !error && !isReadOnly && 'border-background ring-ring ring-2',
            isReadOnly && 'hover:cursor-not-allowed',
            'select__selected-container',
            error && 'border-destructive focus:outline-none',
          ),
        placeholder: () => 'text-muted-foreground text-sm',
        input: () => 'text-sm',
        valueContainer: () =>
          cn('value__container', 'px-3 py-1 gap-1', isShowSelectedItemCount && '!pr-0'),
        singleValue: () => 'text-sm selected__value',
        multiValue: () => 'bg-accent rounded-xl px-1 text-sm',
        multiValueLabel: () => 'text-sm px-1',
        // multiValueRemove: () => '',
        // indicatorsContainer: () => '',
        // clearIndicator: () => '',
        indicatorSeparator: () => 'hidden',
        dropdownIndicator: () => 'pr-2.5 pl-2.5 dropdown__indicator',
        indicatorsContainer: () => '',
        menu: () =>
          cn(
            'menu__container',
            'p-1 mt-2 border bg-background rounded-lg',
            classNamePlacement[placement],
          ),
        // groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected, isDisabled, isMulti }) => {
          const baseClass = 'hover:cursor-pointer px-3 py-2 rounded text-sm';
          const selectedClass = 'font-semibold bg-teal-1 hover:teal-1 text-grey-12';
          const disabledClass = 'opacity-70 hover:cursor-not-allowed';

          return cn(
            baseClass,
            isFocused && 'bg-accent',
            isSelected && selectedClass,
            isDisabled && disabledClass,
            !isMulti && isSelected && 'text-primary',
          );
        },
        noOptionsMessage: () =>
          'bg-background text-foreground px-3 py-2 rounded text-sm text-center',
        menuList: () => 'text-sm select-pro-menu-list',
        container: () => cn(classNameContainer),
      }}
      placeholder={placeholder}
      isDisabled={disabled}
      isLoading={loading}
      onMenuScrollToBottom={onMenuScrollToBottom}
    />
  );
};

const Control = ({
  children,
  isReadOnly,
  isShowSearchIcon,
  ...props
}: ControlProps & { isShowSearchIcon?: boolean; isReadOnly?: boolean }) => {
  return (
    <components.Control {...props}>
      {isShowSearchIcon && (
        <div style={{ paddingLeft: '0.5rem' }}>
          <Search className='h-5 w-5' />
        </div>
      )}
      {children}
      {isReadOnly && (
        <div className='absolute right-8 flex items-center pointer-events-none'>
          <ReadOnlyIcon />
        </div>
      )}
    </components.Control>
  );
};

const Option = (props: OptionProps) => {
  return (
    <components.Option {...props}>
      <div className='flex items-center justify-between'>
        <span className='flex-1 text-start truncate'>
          {React.isValidElement(props.label) ? (
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {props.label}
            </div>
          ) : (
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              dangerouslySetInnerHTML={{ __html: props.label }}
            />
          )}
        </span>
        {props.isSelected && props.isMulti && <RiCheckFill className='w-4 h-4 text-foreground' />}
      </div>
    </components.Option>
  );
};

// const SingleValueShow = (props) => {
//   return (
//     <components.ValueContainer {...props}>
//       <div
//         className='text-sm css-w54w9q-singleValue'
//         style={{
//           gridArea: `1 / 1 / 2 / 3`,
//           maxWidth: '100%',
//           overflow: 'hidden',
//           textOverflow: 'ellipsis',
//           whiteSpace: 'nowrap',
//           boxSizing: 'border-box',
//         }}
//       >
//         <div dangerouslySetInnerHTML={{ __html: props.selectProps.value?.label }} />
//         <div
//           className='text-sm css-1f9wskw-Input'
//           data-value=''
//         ></div>
//       </div>
//     </components.ValueContainer>
//   );
// };

const DropdownIndicator = (
  props: DropdownIndicatorProps & {
    isReadOnly?: boolean;
  },
) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className='flex gap-2 items-center'>
        <ChevronDownIcon
          className={cn(
            'w-4 h-4 text-foreground transition-all duration-300',
            props.isFocused && !props.isReadOnly && 'rotate-180',
          )}
        />
      </div>
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <ClearInputIcon />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = ({
  isReadOnly,
  ...props
}: MultiValueRemoveProps & { isReadOnly?: boolean }) => {
  if (isReadOnly) {
    return (
      <div className='flex justify-center items-center'>
        <RiCloseLine className='w-4 h-4 text-foreground' />
      </div>
    );
  }

  return (
    <components.MultiValueRemove {...props}>
      <RiCloseLine className='w-4 h-4 text-foreground' />
    </components.MultiValueRemove>
  );
};

const ValueContainer = (
  props: ValueContainerProps & {
    isShowSelectedItemCount?: boolean;
  },
) => {
  const { children, isShowSelectedItemCount, getValue, setValue, selectProps } = props;
  const selectedCount = getValue().length;

  const handleClear = () => {
    setValue(null, 'select-option');
  };

  return (
    <components.ValueContainer
      innerProps={props.innerProps}
      {...props}
    >
      <If condition={isShowSelectedItemCount && !selectProps.menuIsOpen && selectedCount > 0}>
        <Then>
          <span className='text-sm'>{selectProps.placeholder}</span>
        </Then>
      </If>

      {children}

      <If condition={isShowSelectedItemCount && selectedCount > 0}>
        <Then>
          <Tag
            color='primary'
            closable
            onClose={handleClear}
          >
            {selectedCount}
          </Tag>
        </Then>
      </If>
    </components.ValueContainer>
  );
};
