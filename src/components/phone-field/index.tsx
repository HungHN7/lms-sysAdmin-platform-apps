import React, { ChangeEvent } from 'react';
import { ControllerRenderProps, UseFormReturn, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputProps,
} from 'src/components/ui';
import { FIELD_KEY } from 'src/pages/tenant-registration/FormRegis';
import { useGetCountriesQuery } from 'src/services';
import { Show } from 'src/shared';
import { cn } from 'src/utils/classnames';
import styled from 'styled-components';
import { SelectPro, TSelectProOption } from '../select-pro';

export type TPhoneValue = {
  phone?: string;
  phone_code: string;
};

interface PhoneNumberFieldProps extends InputProps {
  name: string;
  label?: string;
  formControl: UseFormReturn<any>;
  required?: boolean;
  classNameWrap?: string;
  direction?: 'vertical' | 'horizontal';
  helpText?: string;
  isShowHelpText?: boolean;
  phoneValue?: TPhoneValue;
  hideMessage?: boolean;
}
function removeLeadingZeros(inputString: string) {
  // Use regular expression to remove leading zeros
  return inputString.replace(/^0+/, '');
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  label = 'Phone Number',
  formControl,
  required,
  classNameWrap,
  direction = 'vertical',
  helpText,
  isShowHelpText,
  hideMessage,
  ...props
}) => {
  const refInput = React.useRef<HTMLInputElement>(null);
  const { trigger } = useFormContext();
  const handleBlurPhoneNumber =
    (field: ControllerRenderProps<any, FIELD_KEY.phone>) => (e: ChangeEvent<HTMLInputElement>) => {
      const v = removeLeadingZeros(e.target.value);
      field.onChange(v);
      trigger(FIELD_KEY.phone);
    };
  const handleChangePhoneNumber =
    (field: ControllerRenderProps<any, FIELD_KEY.phone>) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 12) field.onChange(e.target.value.trim());
    };

  return (
    <Container className={cn(direction === 'horizontal' && 'flex gap-4', classNameWrap)}>
      {label && (
        <FormLabel
          className={cn(direction === 'horizontal' && 'inline-flex items-center', 'font-semibold')}
          style={{
            ...(direction === 'horizontal'
              ? { height: (refInput.current && refInput.current.clientHeight) || 40 + 'px' }
              : {}),
          }}
        >
          {label}
          {required && <span className='text-destructive'>*</span>}
        </FormLabel>
      )}
      <span className='flex relative bg-background rounded-md max-w-full w-full border border-input'>
        <FormField
          control={formControl.control}
          name={FIELD_KEY.phone_code}
          render={({ field }) => (
            <SelectCountryCode
              onChange={(opt) => field.onChange(opt.value)}
              value={field.value}
              disabled={props.disabled}
            />
          )}
        />
        <FormField
          name={FIELD_KEY.phone}
          control={formControl.control}
          render={({ field }) => (
            <div className='flex flex-1 ml-[4px]'>
              <FormControl>
                <Input
                  {...field}
                  onBlur={handleBlurPhoneNumber(field)}
                  onChange={handleChangePhoneNumber(field)}
                  ref={refInput}
                  type='number'
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                  }
                  {...props}
                />
              </FormControl>
              {isShowHelpText && <h3 className='text-[#707171] text-xs font-normal'>{helpText}</h3>}
            </div>
          )}
        />
      </span>
      <FormField
        name={FIELD_KEY.phone}
        control={formControl.control}
        render={() => (
          <Show when={!hideMessage}>
            <FormMessage />
          </Show>
        )}
      />
    </Container>
  );
};

const Container = styled(FormItem)`
  input[name='phone'],
  .phone-code__select-container .select__selected-container {
    height: 100%;
    border: none;
  }
  .phone-code__select-container {
    margin-right: 0.25rem;
    .selected__value {
      min-width: fit-content;
      .country {
        display: none;
      }
    }
    .value__container {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      width: 52px;
      justify-content: center;
    }
  }
  .dropdown__indicator {
    padding: 0;
  }
  .menu__container {
    width: fit-content;
  }

  .input-container {
    position: relative;
  }
  .input-container::before {
    left: -4px;
    z-index: 10;
    position: absolute;
    content: '|';
    color: #dedede;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default PhoneNumberField;

const SelectCountryCode = ({ value, onChange, disabled }: any) => {
  const { data } = useGetCountriesQuery({
    'pageable.paging_ignored': true,
    'pageable.sort': 'name,asc',
  });
  const options = data?.map((i) => ({
    value: '+' + i.phone_code.toString(),
    label: (
      <>
        +{i.phone_code} <span className='country'>{`(${i.label})`}</span>
      </>
    ),
  }));
  const valueOpt = options?.find((i) => i.value == value);

  return (
    <SelectPro
      disabled={disabled}
      options={(options as unknown as TSelectProOption[]) ?? []}
      value={valueOpt}
      onChange={onChange}
      classNameContainer={'phone-code__select-container'}
      placeholder='Code'
    />
  );
};
