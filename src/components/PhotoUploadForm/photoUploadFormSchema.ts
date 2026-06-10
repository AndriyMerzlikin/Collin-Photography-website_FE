import { z } from 'zod';

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

  category: z.enum(['landscape', 'birds', 'mammals'], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),

  price: z.coerce.number().min(0, 'Price cannot be negative'),

  file: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    }, 'Only JPG, PNG and WEBP are allowed')
    .refine((file) => {
      if (!file) return true;
      return file.size <= 10 * 1024 * 1024;
    }, 'Image size must be less than 10MB'),
});

export type TPhotoUploadFormSchema = z.infer<typeof photoUploadFormSchema>;
