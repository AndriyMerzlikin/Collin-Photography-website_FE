import { z } from 'zod';

export const categories = ['landscape', 'birds', 'mammals'] as const;

export const photoUploadFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Minimum 3 characters long')
    .max(45, "Can't be more than 45 characters long"),

  description: z
    .string()
    .trim()
    .max(1000, "Can't be more than 1000 characters long"),

  category: z.enum(categories, {
    errorMap: () => ({
      message: 'Please select a valid category',
    }),
  }),

  price: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === '' || val === null || val === undefined) return 0;
      return Number(val);
    })
    .refine((val) => !isNaN(val), {
      message: 'Invalid price',
    })
    .refine((val) => val >= 0, {
      message: 'Price cannot be negative',
    }),

  file: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      return file.type.startsWith('image/');
    }, 'Only images allowed'),
});

export type PhotoUploadFormInput = z.input<typeof photoUploadFormSchema>;
export type PhotoUploadFormValues = z.output<typeof photoUploadFormSchema>;
