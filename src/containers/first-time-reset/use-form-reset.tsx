import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormReset = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      new_password: '',
      retype_password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (value: z.infer<typeof FormSchema>) => {
    console.log('🚀 ~ onSubmit ~ value:', value);
  };

  return [{ form }, { onSubmit }] as const;
};
