import { PASSWORD_REGEX } from 'src/utils/constants/regex';
import * as z from 'zod';

export enum FIELD_NAME {
  new_password = 'new_password',
  retype_password = 'retype_password',
}

const FormShape = z.object({
  [FIELD_NAME.new_password]: z
    .string()
    .min(8, {
      message: 'Password is required!',
    })
    .regex(PASSWORD_REGEX, {
      message: 'Invalid password format. Please provide a valid password.',
    }),
  [FIELD_NAME.retype_password]: z.string().min(8, { message: 'Password is required!' }),
});

export const FormSchema = FormShape.required({
  new_password: true,
  retype_password: true,
});
