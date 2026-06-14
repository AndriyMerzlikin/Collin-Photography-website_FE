import { PhotoUploadFormValues } from '@/components/PhotoUploadForm/photoUploadFormSchema';

export type PhotoFormInitialData = Omit<PhotoUploadFormValues, 'file'> & {
  previewUrl?: string;
};
