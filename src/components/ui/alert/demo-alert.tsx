import { AlertMessage } from '.';

const DemoAlert = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <AlertMessage
          variant='info'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='info'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='info'
          message='Alert text'
          description='Odio fringilla sed aliquet tristique. '
        />
      </div>
      <div className='flex flex-col gap-4'>
        <AlertMessage
          variant='success'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='success'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='success'
          message='Alert text'
          description='Odio fringilla sed aliquet tristique. '
        />
      </div>
      <div className='flex flex-col gap-4'>
        <AlertMessage
          showIcon
          variant='error'
          message='Alert text'
        />
        <AlertMessage
          variant='error'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='error'
          message='Alert text'
          description='Odio fringilla sed aliquet tristique. '
        />
      </div>
      <div className='flex flex-col gap-4'>
        <AlertMessage
          variant='warning'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='warning'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='warning'
          message='Alert text'
          description='Odio fringilla sed aliquet tristique. '
        />
      </div>
      <div className='flex flex-col gap-4'>
        <AlertMessage
          showIcon
          variant='successLight'
          message='Alert text'
        />
        <AlertMessage
          variant='successLight'
          message='Alert text'
        />
        <AlertMessage
          showIcon
          variant='successLight'
          message='Alert text'
          description='Odio fringilla sed aliquet tristique. '
        />
      </div>
    </div>
  );
};

export default DemoAlert;
