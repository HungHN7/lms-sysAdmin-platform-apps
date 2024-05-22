import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { Else, If, Then } from 'react-if';
import { useNavigate } from 'react-router-dom';
import { SelectPro, SelectProProps, TSelectProOption, TextField } from 'src/components';
import PhoneNumberField from 'src/components/phone-field';
import { Button, Checkbox, Form, Label, Link, Switch } from 'src/components/ui';
import FieldWithForm from 'src/components/ui/form/field';
import { Option } from 'src/components/ui/select/select-custom';
import { useToast } from 'src/hooks';
import { SITE_MAP } from 'src/routes/site-map';
import { useCreateTenantAccountMutation } from 'src/services';
import { useGetCountriesQuery } from 'src/services/country.service';
import { useGetProvincesQuery } from 'src/services/province.service';
import { cn } from 'src/utils/classnames';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  SUBDOMAIN_REGEX,
  USERNAME_REGEX,
} from 'src/utils/constants/regex';
import styled from 'styled-components';
import * as z from 'zod';
const USA_and_Canada = ['Canada', 'United States'];

export enum FIELD_KEY {
  firstname = 'firstname',
  lastname = 'lastname',
  username = 'admin_username',
  password = 'admin_password',
  domain = 'domain',
  account_contact_email = 'account_contact_email',
  city = 'city',
  province = 'province',
  country_id = 'country_id',
  zip_postal_code = 'zip_postal_code',
  tenant_name = 'tenant_name',
  phone = 'phone',
  email = 'email',
  address = 'address',
  phone_code = 'phone_code',
}
function removeSpacing(inputString: string) {
  // Use regular expression to remove leading zeros
  return inputString.replace(/\s/g, '');
}
const FormRegis = () => {
  const [createTenant, { isLoading }] = useCreateTenantAccountMutation();
  const [countryName, setCountryName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [isUseYourEmail, setIsUseYourEmail] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const FormSchema = z.object({
    [FIELD_KEY.username]: z
      .string()
      .min(1, {
        message: 'Username is required.',
      })
      .min(8, { message: 'Username must be at least 8 characters.' })
      .regex(USERNAME_REGEX, {
        message: 'Invalid username format. Please provide a valid username format.',
      }),
    [FIELD_KEY.password]: z
      .string()
      .min(1, {
        message: 'Password is required.',
      })
      .regex(/^(?! ).*(?<! )$/, {
        message: "Your password can't start or end with a blank space.",
      })
      .min(8, {
        message: 'Password must be at least 8 characters.',
      })
      .regex(PASSWORD_REGEX, {
        message: 'Invalid password format. Please provide a valid password format.',
      }),
    [FIELD_KEY.firstname]: z.string().min(1, {
      message: 'First name is required.',
    }),
    [FIELD_KEY.lastname]: z.string().min(1, {
      message: 'Last name is required.',
    }),
    [FIELD_KEY.domain]: z
      .string()
      .min(1, {
        message: 'Account domain is required.',
      })
      .regex(SUBDOMAIN_REGEX, {
        message: 'Invalid account domain format. Please provide a valid account domain format.',
      }),
    [FIELD_KEY.account_contact_email]: z
      .string()
      .min(1, {
        message: 'Account contact email is required.',
      })
      .regex(EMAIL_REGEX, {
        message: 'Invalid email format. Please provide a valid email format.',
      }),
    [FIELD_KEY.city]: z.string().min(1, {
      message: 'City is required.',
    }),
    [FIELD_KEY.province]: z.string().min(1, {
      message: 'State/Province is required.',
    }),
    [FIELD_KEY.country_id]: z.string().min(1, {
      message: 'Country/Region is required.',
    }),
    [FIELD_KEY.zip_postal_code]: z.string().min(1, {
      message: 'Zip/Postal code is required.',
    }),
    [FIELD_KEY.tenant_name]: z.string().min(1, {
      message: 'Company name is required.',
    }),
    [FIELD_KEY.phone]: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (val === undefined || val === null || val === '') {
            return true; // If the field is blank, it is valid
          }
          return val.length >= 6 && val.length <= 12; // Validate length if the field has a value
        },
        {
          message: 'Phone number must be at least 6 characters.',
        },
      ),
    [FIELD_KEY.phone_code]: z.string(),
    [FIELD_KEY.email]: z
      .string()
      .min(1, {
        message: 'Email is required.',
      })
      .regex(EMAIL_REGEX, {
        message: 'Invalid email format. Please provide a valid email format.',
      }),
    [FIELD_KEY.address]: z.string().min(1, {
      message: 'Address is required.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      [FIELD_KEY.firstname]: '',
      [FIELD_KEY.lastname]: '',
      [FIELD_KEY.username]: '',
      [FIELD_KEY.password]: '',
      [FIELD_KEY.domain]: '',
      [FIELD_KEY.account_contact_email]: '',
      [FIELD_KEY.city]: '',
      [FIELD_KEY.province]: '',
      [FIELD_KEY.country_id]: '',
      [FIELD_KEY.zip_postal_code]: '',
      [FIELD_KEY.tenant_name]: '',
      [FIELD_KEY.phone]: '',
      [FIELD_KEY.phone_code]: '+1',
      [FIELD_KEY.email]: '',
      [FIELD_KEY.address]: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (body: z.infer<typeof FormSchema>) => {
    createTenant({
      ...body,
      [FIELD_KEY.account_contact_email]: isUseYourEmail
        ? body[FIELD_KEY.email].toLowerCase()
        : body[FIELD_KEY.account_contact_email].toLowerCase(),
      [FIELD_KEY.domain]: body[FIELD_KEY.domain] + process.env.HOST_DOMAIN,
      [FIELD_KEY.email]: body[FIELD_KEY.email].toLowerCase(),
      [FIELD_KEY.username]: body[FIELD_KEY.username].toLowerCase(),
      [FIELD_KEY.phone_code]: body[FIELD_KEY.phone] ? body[FIELD_KEY.phone_code] : '',
    })
      .unwrap()
      .then((data) => {
        if (data?.id) {
          navigate(`${SITE_MAP.CHECK_EMAIL.path}?email=${body[FIELD_KEY.email]}`);
        }
        if (data?.error) {
          if (data?.error?.details) {
            data?.error.details.forEach((i) => {
              if (i.key == 'DOMAIN_ALREADY_EXIST') {
                form.setError(FIELD_KEY.domain, {
                  message: 'Account domain already exists.',
                });
              }
              if (i.key == 'PHONE_NUMBER_INVALID') {
                form.setError(FIELD_KEY.phone, {
                  message: 'Phone number is invalid format.',
                });
              }
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'Username or password is incorrect.',
            });
          }
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Username or password is incorrect.',
        });
      });
  };
  const classNameTextField = 'rounded-lg';
  const clTextFieldWrapper = 'w-[355px] flex flex-col ';
  const handleChangeCountry = (opt?: Option) => {
    form.setValue(FIELD_KEY.country_id, opt?.value ?? '');
    form.setValue(FIELD_KEY.province, '');
    form.trigger(FIELD_KEY.country_id);
    opt && setCountryName(opt.label as string);
  };
  const handleChangeField = (fieldName: FIELD_KEY) => (e?: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.value !== undefined && e?.target.value !== ' ') {
      e.preventDefault();
      form.setValue(fieldName, removeSpacing(e?.target.value));
      if (fieldName == FIELD_KEY.email) {
        isUseYourEmail &&
          form.setValue(FIELD_KEY.account_contact_email, removeSpacing(e?.target.value));
        form.trigger(FIELD_KEY.account_contact_email);
      }
      form.trigger(fieldName);
    }
  };
  const handleSwitchAdvanced = (checked: boolean) => {
    if (checked) {
      form.setValue(FIELD_KEY.account_contact_email, form.getValues(FIELD_KEY.email));
    } else {
      form.resetField(FIELD_KEY.account_contact_email);
    }
    setIsUseYourEmail(checked);
  };

  const trimWhenBlur = (field: FIELD_KEY) => (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue(field, e.target.value.trim());
    form.trigger(field);
  };

  const groupField = [
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={clTextFieldWrapper}
        label='First name'
        name={FIELD_KEY.firstname}
        formControl={form}
        placeholder='Enter your first name'
        maxLength={50}
        required
      />
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={clTextFieldWrapper}
        label='Last name'
        name={FIELD_KEY.lastname}
        formControl={form}
        placeholder='Enter your last name'
        maxLength={50}
        required
      />
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={clTextFieldWrapper}
        label='Username'
        name={FIELD_KEY.username}
        autoComplete={'off'}
        formControl={form}
        onChange={(e) => form.setValue(FIELD_KEY.username, removeSpacing(e.target.value))}
        onBlur={handleChangeField(FIELD_KEY.username)}
        placeholder='Enter your username'
        disabled={isLoading}
        maxLength={50}
        required
      />
      <PhoneNumberField
        className={classNameTextField}
        classNameWrap={clTextFieldWrapper}
        label='Phone number'
        name={FIELD_KEY.phone}
        formControl={form}
        placeholder='Enter your phone number'
        phoneValue={{
          phone_code: form.getValues(FIELD_KEY.phone_code),
          phone: form.getValues(FIELD_KEY.phone),
        }}
      />
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={cn(clTextFieldWrapper, 'w-full')}
        label='Email'
        name={FIELD_KEY.email}
        formControl={form}
        onChange={(e) => form.setValue(FIELD_KEY.email, removeSpacing(e.target.value))}
        placeholder='Enter your email address'
        maxLength={50}
        onBlur={handleChangeField(FIELD_KEY.email)}
        required
      />
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={cn(clTextFieldWrapper, 'w-full')}
        label='Password'
        name={FIELD_KEY.password}
        formControl={form}
        placeholder='Enter your password'
        disabled={isLoading}
        required
        type={showPassword ? 'text' : 'password'}
        icon={
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            type='button'
            tabIndex={-1}
          >
            {showPassword ? <EyeIcon className='w-5 h-5' /> : <EyeOffIcon className='w-5 h-5' />}
          </button>
        }
        iconPlacement='right'
        classNameIcon='pointer-events-auto cursor-pointer'
        maxLength={50}
        isShowHelpText={true}
        helpText={
          'Should be at least 8 characters including: a minimum of 1 lowercase, 1 uppercase, 1 number, and 1 special character.'
        }
      />
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={cn(clTextFieldWrapper, 'w-full')}
        label='Company name'
        name={FIELD_KEY.tenant_name}
        formControl={form}
        placeholder='Enter your company name'
        maxLength={255}
        required
      />
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={cn(clTextFieldWrapper, 'relative')}
        label='Account domain'
        name={FIELD_KEY.domain}
        formControl={form}
        maxLength={25}
        placeholder='Enter account subdomain'
        required
      />
      <span className='text-[20px] text-[#00938F] h-[40px] bg-[#F6F6F6] mt-[22px]'>
        .authoringtool.com
      </span>
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={cn(
          clTextFieldWrapper,
          'w-full relative field__contact-email',
          isUseYourEmail ? 'disabled' : '',
        )}
        label='Account contact email'
        name={FIELD_KEY.account_contact_email}
        formControl={form}
        placeholder={isUseYourEmail ? 'Using your email address' : 'Enter account email address'}
        isShowError={!isUseYourEmail}
        onBlur={handleChangeField(FIELD_KEY.account_contact_email)}
        onChange={(e) =>
          form.setValue(FIELD_KEY.account_contact_email, removeSpacing(e.target.value))
        }
        maxLength={50}
        disabled={isUseYourEmail}
        rightAction={
          <div className='flex items-center gap-1 h-[14px]'>
            <span className='font-normal'>Using your email</span>{' '}
            <Switch
              checked={isUseYourEmail}
              onCheckedChange={handleSwitchAdvanced}
            />
          </div>
        }
        required
      />
    </>,
    <>
      <FieldWithForm<SelectProProps>
        className={classNameTextField}
        classNameWrap={clTextFieldWrapper}
        label='Country/Region'
        name={FIELD_KEY.country_id}
        formControl={form}
        placeholder='Select country/region'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={handleChangeCountry}
        Comp={SelectCountry}
        required
      />

      <If condition={USA_and_Canada.includes(countryName)}>
        <Then>
          <FieldWithForm<PropsSelectProvince>
            className={classNameTextField}
            classNameWrap={clTextFieldWrapper}
            label='State/Province'
            name={FIELD_KEY.province}
            formControl={form}
            placeholder='Select province'
            countryId={form.getValues(FIELD_KEY.country_id)}
            required
            Comp={SelectProvince}
          />
        </Then>
        <Else>
          <TextField
            labelClassName='text-black'
            className={classNameTextField}
            classNameWrap={clTextFieldWrapper}
            label='State/Province'
            name={FIELD_KEY.province}
            formControl={form}
            placeholder='Enter province'
            onBlur={trimWhenBlur(FIELD_KEY.province)}
            maxLength={50}
            required
          />
        </Else>
      </If>
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={clTextFieldWrapper}
        label='City'
        name={FIELD_KEY.city}
        formControl={form}
        placeholder='Enter city'
        maxLength={50}
        onBlur={trimWhenBlur(FIELD_KEY.city)}
        required
      />
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={clTextFieldWrapper}
        label='Zip/Postal code'
        name={FIELD_KEY.zip_postal_code}
        formControl={form}
        placeholder='Enter zip/postal code'
        maxLength={10}
        required
        onBlur={trimWhenBlur(FIELD_KEY.zip_postal_code)}
      />
    </>,
    <>
      <TextField
        labelClassName='text-black'
        className={classNameTextField}
        classNameWrap={cn(clTextFieldWrapper, 'w-full')}
        label='Address'
        name={FIELD_KEY.address}
        formControl={form}
        placeholder='Enter street number and street name'
        maxLength={50}
        onBlur={trimWhenBlur(FIELD_KEY.address)}
        required
      />
    </>,
  ];

  return (
    <Form {...form}>
      <FormContainer
        onSubmit={form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>}
        className='flex flex-col gap-4 w-full'
      >
        {groupField.map((i, index) => (
          <div
            className='flex gap-6'
            key={'registraion-field-' + index.toString()}
          >
            {i}
          </div>
        ))}

        <div className={''}>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='remember'
                checked={isRemember}
                onCheckedChange={(check: boolean) => setIsRemember(check)}
              />
              <Label
                htmlFor='remember'
                className='cursor-pointer flex items-center'
              >
                <span>By signing up, I agree with the</span>
                <Link
                  to={'/'}
                  visited
                  className='tenant-regis__link'
                >
                  Terms of Use
                </Link>
                &
                <Link
                  visited
                  to={'/'}
                  className='tenant-regis__link'
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>
        </div>

        <Button
          disabled={isLoading || !isRemember}
          type='submit'
          className='mt-4 h-14 rounded-xl text-base'
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Try it free for 14 days
        </Button>
      </FormContainer>
    </Form>
  );
};

export default FormRegis;

const SelectCountry = (props: SelectProProps) => {
  const { data } = useGetCountriesQuery({
    'pageable.paging_ignored': true,
    'pageable.sort': 'name,asc',
  });
  const value = data?.find((i) => i.value == props.value);
  return (
    <SelectPro
      {...props}
      value={value}
      options={data}
    />
  );
};

type PropsSelectProvince = SelectProProps & {
  countryId: string;
};

const SelectProvince = ({ countryId, ...props }: PropsSelectProvince) => {
  const { data } = useGetProvincesQuery({
    'pageable.paging_ignored': true,
    'pageable.sort': 'name,asc',
    country_id: countryId,
  });
  const value = data?.find((i) => i.value == props.value);
  const { trigger } = useFormContext();
  const onChange = (v) => {
    props.onChange && props.onChange(v.value);
    trigger(FIELD_KEY.province);
  };
  return (
    <SelectPro
      {...props}
      value={value}
      onChange={onChange}
      options={(data as unknown as TSelectProOption[]) ?? []}
      classNameContainer={'phone-code__select-container'}
    />
  );
};

const FormContainer = styled.form`
  .field__contact-email {
  }
  .disabled {
    input {
      background-color: #f2f2f2;
      color: #bdc1ca;
    }
  }
  input[name='email'],
  input[name='admin_username'],
  input[name='account_contact_email'] {
    text-transform: lowercase;
  }
  input::placeholder {
    text-transform: none;
  }
  .tenant-regis__link {
    color: #353636 !important;
    text-decoration: underline;
  }
`;
