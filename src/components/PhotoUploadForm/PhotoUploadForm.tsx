'use client';

import { useEffect, useState } from 'react';
import styles from './PhotoUploadForm.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import GenericSelect, {
  SelectOption,
} from '@/components/CategorySelect/GenericSelect';
import { GalleryCategory } from '@/types/galleryTypes';
import { photoUploadFormSchema } from './photoUploadFormSchema';
import { PhotoFormData, PhotoFormInitialData } from '@/types/photoPhormTypes';
import { createPhoto, updatePhoto } from '@/api/galleryApi';

const categoryOptions: SelectOption<GalleryCategory>[] = [
  { value: 'birds', label: 'birds' },
  { value: 'landscape', label: 'landscape' },
  { value: 'mammals', label: 'mammals' },
];

type Props = {
  mode: 'create' | 'edit';
  photoId?: string;
  initialData?: PhotoFormInitialData;
};

const PhotoUploadForm = ({ mode, photoId, initialData }: Props) => {
  const [preview, setPreview] = useState<string | null>(
    initialData?.previewUrl ?? null,
  );

  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<PhotoFormData>({
    resolver: zodResolver(photoUploadFormSchema),
    mode: 'onTouched',
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      category: initialData?.category ?? 'landscape',
      price: initialData?.price ?? 0,
    },
  });

  useEffect(() => {
    if (!initialData) return;

    reset({
      title: initialData.title,
      description: initialData.description,
      category: initialData.category,
      price: initialData.price,
    });

    setPreview(initialData.previewUrl ?? null);
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<PhotoFormData> = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', String(data.price));

      if (data.file) {
        formData.append('file', data.file);
      }

      if (mode === 'create') {
        await createPhoto(formData);
      } else {
        if (!photoId) {
          throw new Error('Photo id is missing');
        }

        await updatePhoto(photoId, formData);
      }

      toast.success(
        mode === 'create'
          ? 'Photo uploaded successfully!'
          : 'Photo updated successfully!',
        {
          icon: '✅',
        },
      );

      if (mode === 'create') {
        reset();

        if (preview?.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }

        setPreview(null);
      }
    } catch (err) {
      console.error(err);

      toast.error(
        mode === 'create' ? 'Error adding photo!' : 'Error updating photo!',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <input
          {...register('title')}
          type="text"
          placeholder="Title"
          className={styles.formInput}
        />

        {errors.title && (
          <p className={styles.errorText}>{errors.title.message}</p>
        )}

        <textarea
          {...register('description')}
          placeholder="Description..."
          className={styles.formInput}
        />

        {errors.description && (
          <p className={styles.errorText}>{errors.description.message}</p>
        )}

        <input
          {...register('price', {
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Price"
          className={styles.formInput}
        />

        {errors.price && (
          <p className={styles.errorText}>{errors.price.message}</p>
        )}

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <GenericSelect
              value={field.value}
              onChange={field.onChange}
              options={categoryOptions}
            />
          )}
        />

        {errors.category && (
          <p className={styles.errorText}>{errors.category.message}</p>
        )}

        <input
          className={styles.formInput}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setValue('file', file, {
              shouldValidate: true,
              shouldTouch: true,
            });

            setPreview(URL.createObjectURL(file));
          }}
        />

        {errors.file && (
          <p className={styles.errorText}>{errors.file.message as string}</p>
        )}

        {preview && (
          <img src={preview} alt="Preview" className={styles.previewImage} />
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !isValid}
        className={styles.submitButton}
      >
        {loading
          ? mode === 'create'
            ? 'Uploading...'
            : 'Saving...'
          : mode === 'create'
            ? 'Upload Photo'
            : 'Save Changes'}
      </button>
    </form>
  );
};

export default PhotoUploadForm;
