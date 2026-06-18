'use client';

import { useEffect, useState } from 'react';
import styles from './PhotoUploadForm.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Image from 'next/image';
import GenericSelect, {
  SelectOption,
} from '@/components/CategorySelect/GenericSelect';
import { GalleryCategory } from '@/types/galleryTypes';
import {
  PhotoUploadFormInput,
  photoUploadFormSchema,
  PhotoUploadFormValues,
} from './photoUploadFormSchema';
import { PhotoFormInitialData } from '@/types/photoPhormTypes';
import { uploadPhoto } from '@/lib/useUploadPhoto';
import { createBrowserPreview } from '@/lib/create-browser-preview';
import { updatePhoto } from '@/lib/updatePhoto';

const categoryOptions: SelectOption<GalleryCategory>[] = [
  { value: 'birds', label: 'birds' },
  { value: 'landscape', label: 'landscape' },
  { value: 'mammals', label: 'mammals' },
];

type Props = {
  mode: 'create' | 'edit';
  photoId?: string;
  initialData?: PhotoFormInitialData;
  onSuccess?: () => void;
};

const PhotoUploadForm = ({ mode, photoId, initialData, onSuccess }: Props) => {
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
  } = useForm<PhotoUploadFormInput, unknown, PhotoUploadFormValues>({
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

  const onSubmit: SubmitHandler<PhotoUploadFormValues> = async (data) => {
    setLoading(true);

    try {
      if (mode === 'create') {
        if (!data.file) {
          toast.error('File is required');
          return;
        }

        const originalFile = data.file;
        const previewFile = await createBrowserPreview(data.file);

        await uploadPhoto(originalFile, previewFile, {
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
        });

        toast.success('Photo uploaded successfully!', { icon: '✅' });

        reset();
        setPreview(null);
        onSuccess?.();

        return;
      }

      // =========================
      // EDIT MODE
      // =========================

      if (!photoId) {
        throw new Error('Photo id missing');
      }

      const file = data.file; // optional

      await updatePhoto(
        photoId,
        {
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
        },
        file, // 👈 тільки тут передаємо file як 3-й аргумент
      );

      toast.success('Photo updated successfully!', { icon: '✅' });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(mode === 'create' ? 'Upload failed' : 'Update failed');
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
          {...register('price', { valueAsNumber: true })}
          type="number"
          step="0.01"
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
          <div className={styles.previewWrapper}>
            <Image
              src={preview}
              alt="Preview"
              fill
              className={styles.previewImage}
              unoptimized
            />
          </div>
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
