import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Minimum 3 characters long')
    .max(45, 'Can`t be more than 45 characters long')
    .nonempty('This field is required'),
  email: z.string().email('Invalid email').nonempty('This field is required'),
  phone: z.string(),
  comment: z.string().max(120, 'Can`t be more than 120 characters long'),
});

export type TContactFormSchema = z.infer<typeof contactFormSchema>;
