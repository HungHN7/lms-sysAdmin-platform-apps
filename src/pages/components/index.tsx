import { ColumnDef } from '@tanstack/react-table';
import { Copy, SearchIcon } from 'lucide-react';
import { KeyboardEventHandler, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import {
  DataTable,
  Modal,
  Loading,
  MultiSelect,
  ModalConfirm,
  SelectPro,
  TabCard,
  AdvancedSetting,
  CodeEditor,
} from 'src/components';
import CardDropdownOption from 'src/components/dropdown-card';
import { OPTIONS } from 'src/components/multi-select';
import {
  BrowseFilesArea,
  BrowseFilesInput,
  Button,
  Checkbox,
  Input,
  Label,
  Link,
  NumberInput,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  RadioGroup,
  RadioGroupItem,
  Status,
  Stepper,
  Steps,
  Tag,
  Textarea,
  ToastAction,
  Tooltip,
  Typography,
} from 'src/components/ui';
import { AccordionDemo } from 'src/components/ui/accordion/accordion-demo';
import DemoAlert from 'src/components/ui/alert/demo-alert';
import { BreadcrumbDemo } from 'src/components/ui/breadcrumb2/demo-breadcrumb2';
import { DropdownMenuDemo } from 'src/components/ui/dropdown-menu/dropdown-menu-demo';
import { MenubarDemo } from 'src/components/ui/menu-bar/menu-bar-demo';
import { NavigationMenuDemo } from 'src/components/ui/navigation-menu/navigation-menu-demo';
import { NotificationDot } from 'src/components/ui/notification-dot';
import { ScrollAreaDemo } from 'src/components/ui/scroll-area/scroll-area-demo';
import { SelectDemo } from 'src/components/ui/select/select-demo';
import { SheetDemo } from 'src/components/ui/sheet/sheet-demo';
import { TabsDemo } from 'src/components/ui/tabs/tabs-demo';
import { FilePreview } from 'src/components/ui/upload/BrowseFilesArea';
import { useToast } from 'src/hooks';

const Components = () => {
  const tableInstance = DataTable.useTable();
  const columns: ColumnDef<{
    id: string;
    title: string;
    status: string;
    label: string;
    priority: string;
  }>[] = [
    {
      accessorKey: 'id',
      header: 'Task',
      cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => row.getValue('status'),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => row.getValue('priority'),
    },
    {
      id: 'actions',
      cell: '_',
    },
  ];

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { toast } = useToast();

  const [valueSelectBox, setValueSelectBox] = useState<OPTIONS[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { title: 'General Information' },
    { title: 'Scope & Conditions' },
    { title: 'Access Control Matrix' },
    { title: 'Review' },
  ];
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const [special, setSpecial] = useState('1');
  const [prefix, setPrefix] = useState('');

  const options1 = [
    {
      value: 'input1',
      type: 'component',
      label: (
        <span className='inline-flex items-center h-8 w-fit text-sm border'>
          <span className='flex items-center justify-center h-8 w-8 bg-primary'>1</span>
          <span className='flex items-center justify-center h-8 px-2'>Text input</span>
        </span>
      ),
    },
    {
      value: 'input2',
      type: 'component',
      label: (
        <span className='inline-flex items-center h-8 w-fit text-sm border'>
          <span className='flex items-center justify-center h-8 w-8 bg-primary'>2</span>
          <span className='flex items-center justify-center h-8 px-2'>Text input</span>
        </span>
      ),
    },
  ];

  const [vl, setVl] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setVl((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };

  const createOption = (label: string) => ({
    label: (
      <span className='inline-flex h-8 px-2 border items-center justify-center text-sm'>
        {label}
      </span>
    ),
    value: label,
  });

  /* Browse files input */
  const [selectedFilesMedium, setSelectedFilesMedium] = useState<File[]>([]);

  const handleFilesSelectedMedium = (files: File[]) => {
    setSelectedFilesMedium(files);
  };

  const handleRemoveFileMedium = (index: number) => {
    const updatedFiles = [...selectedFilesMedium];
    updatedFiles.splice(index, 1);
    setSelectedFilesMedium(updatedFiles);
  };

  /* Browse files area */
  const [selectedFilesSmall, setSelectedFilesSmall] = useState<FilePreview | null>(null);
  const [selectedFilesLarge, setSelectedFilesLarge] = useState<FilePreview[]>([]);

  const handleChangeFilesAreaSmall = (file) => {
    setSelectedFilesSmall({
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    });
  };

  const handleChangeFileAreaLarge = (newFiles) => {
    const previews = newFiles.map((file) => ({
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));
    setSelectedFilesLarge(previews);
  };

  const handleRemoveFileAreaSmall = () => {
    setSelectedFilesSmall(null);
  };

  const handleRemoveFileAreaLarge = (index: number) => {
    const updatedFiles = [...selectedFilesLarge];
    updatedFiles.splice(index, 1);
    setSelectedFilesLarge(updatedFiles);
  };

  const description = 'This is a description.';
  const demoOptions = [
    {
      text: 'Option 1',
      handleClick: () => {
        console.log('Option 1 clicked!');
      },
    },
    {
      text: 'Option 2',
      handleClick: () => {
        console.log('Option 2 clicked!');
      },
    },
    {
      text: 'Option 3',
      handleClick: () => {
        console.log('Option 3 clicked!');
      },
    },
  ];

  return (
    <div className='flex flex-col gap-4 py-4 p-4'>
      <div className='flex gap-2 items-center'>
        Card Dropdown:
        <CardDropdownOption options={demoOptions} />
      </div>
      Steps new:
      <Steps
        current={1}
        status='error'
        direction='vertical'
        items={[
          {
            title: 'General Information',
            description,
          },
          {
            title: 'Scope & Conditions',
            description,
          },
          {
            title: 'Access Control Matrix',
            description,
          },
          {
            title: 'Review',
            description,
          },
        ]}
      />
      <Steps
        current={1}
        items={[
          {
            title: 'General Information',
            description,
          },
          {
            title: 'Scope & Conditions',
            description,
          },
          {
            title: 'Access Control Matrix',
            description,
          },
          {
            title: 'Review',
            description,
          },
        ]}
      />
      <Steps
        current={1}
        status='error'
        labelPlacement='vertical'
        items={[
          {
            title: 'General Information',
            description,
          },
          {
            title: 'Scope & Conditions',
            description,
          },
          {
            title: 'Access Control Matrix',
            description,
          },
          {
            title: 'Review',
            description,
          },
        ]}
      />
      <div className='h-[1px] bg-foreground' />
      <div className='w-full'>
        Stepper
        <Stepper
          direction='horizontal'
          steps={steps}
          activeStep={activeStep}
        />
        <Stepper
          direction='horizontal'
          steps={steps}
          activeStep={activeStep}
          isTextUnderIcon
        />
        <div className='flex gap-4'>
          <Button onClick={handlePrevious}>Pre</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
      <BreadcrumbDemo />
      <Textarea
        placeholder='Type your message here.'
        maxLength={1000}
      />
      <RadioGroup defaultValue='comfortable'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='default'
            id='r1'
            danger
          />
          <Label
            htmlFor='r1'
            className='text-destructive'
          >
            Default
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='comfortable'
            id='r2'
            disabled
          />
          <Label
            className='text-grey-7'
            htmlFor='r2'
          >
            Comfortable
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='compact'
            id='r3'
          />
          <Label htmlFor='r3'>Compact</Label>
        </div>
      </RadioGroup>
      <Link
        type='standalone'
        to=''
        icon='right'
      >
        Link type standalone
      </Link>
      <Link
        type='inline'
        to=''
        icon='right'
      >
        Link type inline
      </Link>
      <div className='flex flex-row items-center'>
        Button type main:
        <Button
          typeButton='main'
          className='w-[200px] ml-2 mr-2'
          variant='primary'
        >
          Variant = primary
        </Button>
        <Button
          typeButton='main'
          className='ml-2 mr-2'
          variant='primary'
          size='icon'
          iconPlus
        />
        <Button
          typeButton='main'
          className='ml-2 mr-2'
          variant='primary'
          size='icon-circle'
          iconPlus
        />
        <Button
          typeButton='main'
          className='w-[200px] ml-2 mr-2'
          variant='secondary'
        >
          Variant = secondary
        </Button>
        <Button
          typeButton='main'
          className='w-[200px] ml-2 mr-2'
          variant='tertiary'
        >
          Variant = tertiary
        </Button>
      </div>
      <div className='flex flex-row items-center'>
        Button type ghost:
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='ghost'
          variant='primary'
        >
          Variant = primary
        </Button>
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='ghost'
          variant='secondary'
        >
          Variant = secondary
        </Button>
      </div>
      <div className='flex flex-row items-center'>
        Button type ghost no padding:
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='ghost-no-padding'
          variant='primary'
        >
          Variant = primary
        </Button>
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='ghost-no-padding'
          variant='secondary'
        >
          Variant = secondary
        </Button>
      </div>
      <div className='flex flex-row items-center'>
        Button type danger:
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='danger'
          variant='primary'
        >
          Variant = primary
        </Button>
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='danger'
          variant='secondary'
        >
          Variant = secondary
        </Button>
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='danger'
          variant='tertiary'
        >
          Variant = tertiary
        </Button>
      </div>
      <div className='flex flex-row items-center'>
        Button type split:
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='split'
          data={[
            {
              to: '',
              title: 'Button',
            },
            {
              to: '',
              title: 'Button',
            },
          ]}
          classNameContent='min-w-[175px]'
        >
          No icon
        </Button>
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='split'
          iconPlus='left'
          data={[
            {
              to: '',
              title: 'Button',
            },
            {
              to: '',
              title: 'Button',
            },
          ]}
          classNameContent='min-w-[175px]'
        >
          Icon plus left
        </Button>
        <Button
          className='w-[200px] ml-2 mr-2'
          typeButton='split'
          iconPlus='right'
          data={[
            {
              to: '',
              title: 'Button',
            },
            {
              to: '',
              title: 'Button',
            },
          ]}
          classNameContent='min-w-[175px]'
        >
          Icon plus right
        </Button>
      </div>
      <div>
        <BrowseFilesInput
          files={selectedFilesMedium}
          onChangeFile={handleFilesSelectedMedium}
          onRemoveFile={handleRemoveFileMedium}
          label='Upload Files (Medium)'
          sizeFilesInput='medium'
          accept='image/png'
          multiple
          required
        />
        <br />
        <div className='flex flex-col gap-3'>
          <BrowseFilesArea
            label='Upload Files (Small)'
            sizeFilesArea='small'
            onChangeFile={handleChangeFilesAreaSmall}
            onRemoveFile={handleRemoveFileAreaSmall}
            files={selectedFilesSmall ? [selectedFilesSmall] : []}
            accept={{
              'image/jpeg': [],
              'image/png': [],
            }}
            noClick
            noKeyboard
            required
          />
          <BrowseFilesArea
            label='Upload Files (Large)'
            sizeFilesPreview='large'
            dragAndDropForm='highlighted'
            onChangeFile={handleChangeFileAreaLarge}
            onRemoveFile={handleRemoveFileAreaLarge}
            files={selectedFilesLarge}
            multiple
            noClick
            noKeyboard
          />
          <BrowseFilesArea
            label='Upload Files (Small)'
            sizeFilesArea='small'
            files={[]}
            noDrag
          />
        </div>
      </div>
      <CodeEditor height='200px' />
      <AdvancedSetting
        options={options1}
        value={vl}
        onChange={(option, action) => {
          if (['select-option', 'deselect-option'].includes(action.action)) {
            setVl((prev) => prev.concat(action.option));
          } else if (action.action === 'clear') setVl([]);
          else if (action.action === 'pop-value') {
            setVl((prev) => prev.filter((vl, idx) => idx != prev.length - 1));
          }
        }}
        onInputChange={(newValue) => setInputValue(newValue)}
        inputValue={inputValue}
        onKeyDown={handleKeyDown}
      />
      <div>
        <Tooltip
          side='bottom'
          content='test tooltip'
        >
          <Button>Tooltip</Button>
        </Tooltip>
      </div>
      <div>
        <Input
          icon={<SearchIcon className='w-5 h-5' />}
          placeholder='Input'
          iconPlacement='left'
          sizeInput='small'
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          autoSize
          minWidth={200}
        />
        <br />
        <Input
          icon={<SearchIcon className='w-5 h-5' />}
          placeholder='Input'
          iconPlacement='right'
          allowClear
          sizeInput='small'
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
      </div>
      <div className='ml-10'>
        <NumberInput
          value={special}
          onValueChange={(v) => setSpecial(v)}
          variant='special'
          maxLength={3}
          max={5}
          min={1}
        />
      </div>
      <div>
        <NumberInput
          max={3}
          autoSize
          hiddenAction
          // variant='math'
        />
        <br />
        <NumberInput
          icon={<span className='px-3 text-sm'>$</span>}
          autoSize
          value={prefix}
          onChange={(e) => {
            setPrefix(e.target.value);
          }}
          hiddenAction
        />
      </div>
      <NumberInput
        max={3}
        hiddenAction={false}
      />
      <NumberInput
        icon={<span className='px-3 text-sm'>$</span>}
        value={prefix}
        onChange={(e) => {
          setPrefix(e.target.value);
        }}
      />
      <NumberInput
        icon={<span className='px-3 text-sm'>$</span>}
        iconPlacement='right'
        value={prefix}
        onChange={(e) => {
          setPrefix(e.target.value);
        }}
      />
      {/* Status */}
      <div className='flex items-center flex-wrap gap-4'>
        {[
          'blue',
          'green',
          'orange',
          'red',
          'yellow',
          'purple',
          'cyan',
          'magenta',
          'teal',
          'gray',
          'primary',
        ].map((item) => (
          <Status
            key={item}
            variant={item as any}
            type='bold'
          >
            Status
          </Status>
        ))}
      </div>
      <div className='flex items-center flex-wrap gap-4'>
        {[
          'blue',
          'green',
          'orange',
          'red',
          'yellow',
          'purple',
          'cyan',
          'magenta',
          'teal',
          'gray',
          'primary',
        ].map((item) => (
          <Status
            key={item}
            variant={item as any}
            type='subtle'
          >
            Status subtle
          </Status>
        ))}
      </div>
      <div className='flex items-center flex-wrap gap-4'>
        {[
          'blue',
          'green',
          'orange',
          'red',
          'yellow',
          'purple',
          'cyan',
          'magenta',
          'teal',
          'gray',
          'primary',
        ].map((item) => (
          <Status
            key={item}
            variant={item as any}
            type='ghost'
          >
            Status ghost
          </Status>
        ))}
      </div>
      {/* Notification Dot */}
      {['sm', 'md', 'lg'].map((size: any) => (
        <>
          <div className='flex items-center flex-wrap gap-4'>
            {[
              'gray',
              'red',
              'magenta',
              'orange',
              'purple',
              'yellow',
              'blue',
              'cyan',
              'teal',
              'green',
            ].map((dot, index) => (
              <NotificationDot
                key={dot}
                size={size}
                variant={dot as any}
                asChild
              >
                {index}
              </NotificationDot>
            ))}
          </div>
          <div className='flex items-center flex-wrap gap-4'>
            {[
              'gray',
              'red',
              'magenta',
              'orange',
              'purple',
              'yellow',
              'blue',
              'cyan',
              'teal',
              'green',
            ].map((dot) => (
              <NotificationDot
                key={dot}
                size={size}
                variant={dot as any}
              ></NotificationDot>
            ))}
          </div>
        </>
      ))}
      {/* Tag */}
      <div className='flex items-center flex-wrap gap-4'>
        {[
          'gray',
          'red',
          'magenta',
          'purple',
          'blue',
          'cyan',
          'teal',
          'green',
          'high-contrast',
          'primary',
        ].map((tag) => (
          <Tag
            key={tag}
            color={tag as any}
            closable
          >
            This is a tag
          </Tag>
        ))}
      </div>
      <div className='flex items-center flex-wrap gap-4'>
        {[
          'gray',
          'red',
          'magenta',
          'purple',
          'blue',
          'cyan',
          'teal',
          'green',
          'high-contrast',
          'primary',
        ].map((tag) => (
          <Tag
            key={tag}
            color={tag as any}
            disabled
          >
            This is a tag
          </Tag>
        ))}
      </div>
      <div className='flex items-center flex-wrap gap-4'>
        {[
          'gray',
          'red',
          'magenta',
          'purple',
          'blue',
          'cyan',
          'teal',
          'green',
          'high-contrast',
          'primary',
        ].map((tag) => (
          <Tag
            key={tag}
            color={tag as any}
            size='small'
          >
            This is a tag
          </Tag>
        ))}
      </div>
      <Typography variant='h1'>Typography H1</Typography>
      <Typography variant='h2'>Typography H2</Typography>
      <Typography variant='h3'>Typography H3</Typography>
      <Typography variant='h4'>Typography H4</Typography>
      <Typography variant='h5'>Typography H5</Typography>
      <Typography variant='h6'>Typography H6</Typography>
      <Typography>Typography</Typography>
      <div className='flex items-center gap-4'>
        <Checkbox
          defaultChecked
          variant='circle'
        >
          A
        </Checkbox>
        <Checkbox defaultChecked>B</Checkbox>
        <Checkbox
          defaultChecked
          danger
        >
          C
        </Checkbox>
        <Checkbox danger />
        <Checkbox />
        <Checkbox checked='indeterminate' />
      </div>
      <TabCard
        type='number'
        active='general'
        items={[
          {
            label: 'General',
            value: 'general',
          },
          {
            label: 'Layout',
            value: 'layout',
          },
          {
            label: 'Metadata',
            value: 'metadata',
          },
        ]}
      />
      <TabCard
        active='general'
        items={[
          {
            label: 'General',
            value: 'general',
          },
          {
            label: 'Layout',
            value: 'layout',
          },
          {
            label: 'Metadata',
            value: 'metadata',
          },
        ]}
      />
      <TabCard
        active='layout'
        type='secondary'
        items={[
          {
            label: 'General',
            value: 'general',
          },
          {
            label: 'Layout',
            value: 'layout',
          },
          {
            label: 'Metadata',
            value: 'metadata',
          },
        ]}
      />
      <TabCard
        active='metadata'
        type='ghost'
        items={[
          {
            label: 'General',
            value: 'general',
          },
          {
            label: 'Layout',
            value: 'layout',
          },
          {
            label: 'Metadata',
            value: 'metadata',
          },
        ]}
      />
      <SelectPro
        options={[
          {
            value: 'hallo',
            label: <span className='text-red-700'> Hallo</span>,
            // isFixed: true,
          },
          { value: 'blue', label: 'Blue', isDisabled: true },
          { value: 'purple', label: 'Purple' },
          { value: 'red', label: 'Red', isFixed: true },
          { value: 'orange', label: 'Orange' },
          { value: 'yellow', label: 'Yellow' },
          { value: 'green', label: 'Green' },
          { value: 'forest', label: 'Forest' },
          { value: 'slate', label: 'Slate' },
          { value: 'silver', label: 'Silver' },
        ]}
      />
      <SelectPro
        isMulti
        options={[
          {
            value: 'hallo',
            label: <span className='text-red-700'> Hallo</span>,
            // isFixed: true,
          },
          { value: 'blue', label: 'Blue', isDisabled: true },
          { value: 'purple', label: 'Purple' },
          { value: 'red', label: 'Red', isFixed: true },
          { value: 'orange', label: 'Orange' },
          { value: 'yellow', label: 'Yellow' },
          { value: 'green', label: 'Green' },
          { value: 'forest', label: 'Forest' },
          { value: 'slate', label: 'Slate' },
          { value: 'silver', label: 'Silver' },
        ]}
      />
      <Button
        className='w-[180px]'
        onClick={() => setOpenConfirm(true)}
        // asChild
      >
        Modal Confirm
      </Button>
      <ModalConfirm
        open={openConfirm}
        setOpen={setOpenConfirm}
        title={
          <span className='flex items-center justify-center text-destructive'>
            <MdDelete className='w-10 h-10' />
          </span>
        }
        message='Are you sure that you want to delete this program series?'
        action={{
          type: 'danger',
          label: 'Continue',
          handle: (e) => {
            console.log(e);
          },
        }}
      />
      <Button
        className='w-[180px]'
        onClick={() => setOpen(true)}
        // asChild
      >
        Modal Demo
      </Button>
      <Modal
        title='Modal'
        description='Test modal description'
        isOpen={open}
        onClose={() => setOpen(false)}
        footer={
          <Button
            type='submit'
            className='px-3'
          >
            Footer
          </Button>
        }
      >
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label
              htmlFor='link'
              className='sr-only'
            >
              Link
            </Label>
            <Input
              id='link'
              readOnly
            />
          </div>
          <Button
            type='submit'
            className='px-3'
          >
            <span className='sr-only'>Copy</span>
            <Copy className='h-4 w-4' />
          </Button>
        </div>
      </Modal>
      <DemoAlert />
      <div className='flex gap-4'>
        <Button
          className='w-[180px]'
          onClick={() => {
            toast({
              variant: 'info',
              title: 'Uh oh! Something went wrong.',
              // description: 'There was a problem with your request.',
              showIcon: true,
              action: <ToastAction altText='Try again'>Try again</ToastAction>,
              closable: true,
            });
          }}
          variant='primary'
        >
          Toast info
        </Button>
        <Button
          className='w-[180px]'
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              showIcon: true,
              action: <ToastAction altText='Try again'>Try again</ToastAction>,
            });
          }}
          variant='primary'
        >
          Toast danger
        </Button>
        <Button
          className='w-[180px]'
          onClick={() => {
            toast({
              variant: 'success',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              showIcon: true,
              action: <ToastAction altText='Try again'>Try again</ToastAction>,
              closable: true,
            });
          }}
          variant='primary'
          typeButton='danger'
        >
          Toast success
        </Button>
        <Button
          className='w-[180px]'
          onClick={() => {
            toast({
              variant: 'warning',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              action: <ToastAction altText='Try again'>Try again</ToastAction>,
              closable: true,
            });
          }}
          variant='primary'
        >
          Toast warning
        </Button>
        <Button
          className='w-[180px]'
          onClick={() => {
            toast({
              variant: 'successLight',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              showIcon: true,
              action: <ToastAction altText='Try again'>Try again</ToastAction>,
            });
          }}
          variant='primary'
        >
          Toast successLight
        </Button>
      </div>
      <BreadcrumbDemo />
      <div className='w-full'>
        <div>
          Stepper
          <Stepper
            direction='horizontal'
            steps={steps}
            activeStep={activeStep}
          />
          <div className='flex gap-4'>
            <Button onClick={handlePrevious}>Pre</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>

        <MultiSelect
          onChange={setValueSelectBox}
          value={valueSelectBox}
          mode='tags'
          options={[
            {
              value: 'next.js',
              label: 'Next.js',
            },
            {
              value: 'sveltekit',
              label: 'SvelteKit',
            },
            {
              value: 'nuxt.js',
              label: 'Nuxt.js',
            },
            {
              value: 'remix',
              label: 'Remix',
            },
            {
              value: 'astro',
              label: 'Astro',
            },
            {
              value: 'wordpress',
              label: 'WordPress',
            },
          ]}
        />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Loading isLoading>
        <h5>Noteworthy technology acquisitions 2021</h5>
        <p>
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
          chronological order.
        </p>
      </Loading>
      <div>
        <ScrollAreaDemo />
      </div>
      <div>
        <DropdownMenuDemo />
      </div>
      <div>
        <SheetDemo />
      </div>
      <SelectDemo />
      <Button className='w-[180px]'>Button</Button>
      <MenubarDemo />
      <NavigationMenuDemo />
      <TabsDemo />
      <div>
        <AccordionDemo />
      </div>
    </div>
  );
};

export default Components;

const _dataTable = [
  {
    id: 'TASK-8782',
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: 'in progress',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-7878',
    title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
    status: 'backlog',
    label: 'documentation',
    priority: 'medium',
    subRows: [
      {
        id: 'TASK-8777',
        title: "You can't compress the program without quantifying the open-source SSD pixel!",
        status: 'in progress',
        label: 'documentation',
        priority: 'medium',
        subRows: [
          {
            id: 'TASK-8788',
            title: "You can't compress the program without quantifying the open-source SSD pixel!",
            status: 'in progress',
            label: 'documentation',
            priority: 'medium',
          },
        ],
      },
      {
        id: 'TASK-7236',
        title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
        status: 'backlog',
        label: 'documentation',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'TASK-7839',
    title: 'We need to bypass the neural TCP card!',
    status: 'todo',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-5562',
    title:
      'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
    status: 'backlog',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-8686',
    title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: 'canceled',
    label: 'feature',
    priority: 'medium',
  },
];
