import { Form } from 'react-hook-form';
import { useFormReset } from './use-form-reset';
import { Input } from 'src/components/ui';

function FirstTimeReset() {
  const [{ form }, { onSubmit }] = useFormReset();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>}
        className='flex flex-col gap-4 w-full'
      >
        <Input
          title='New Password'
          required
          placeholder='Enter your password'
        />
        <Input
          title='Re-enter Password'
          required
          placeholder='Re-enter your password'
        />
      </form>
    </Form>
  );
}

export default FirstTimeReset;
