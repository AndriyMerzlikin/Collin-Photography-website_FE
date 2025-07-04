'use client';

import React from 'react';
import styles from './ContactForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  TContactFormSchema,
} from '@/components/ContactForm/contactFormSchema';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<TContactFormSchema> = async (data) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Message sent successfully!', {
          icon: '📩',
        });
        reset();
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server is unavailable!');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <input
          {...register('name')}
          type="text"
          placeholder="Name *"
          className={clsx({ [styles.inputError]: errors.name })}
        />
        {errors.name && (
          <p className={styles.errorText}>{errors.name.message}</p>
        )}
        <input
          {...register('email')}
          type="email"
          placeholder="Email *"
          className={clsx({ [styles.inputError]: errors.email })}
        />
        {errors.email && (
          <p className={styles.errorText}>{errors.email.message}</p>
        )}
        <input
          {...register('phone')}
          type="phone"
          placeholder="Phone"
          className={clsx({ [styles.inputError]: errors.phone })}
        />
        {errors.phone && (
          <p className={styles.errorText}>{errors.phone.message}</p>
        )}
        <textarea
          {...register('comment')}
          placeholder="Comment..."
          className={clsx({ [styles.inputError]: errors.comment })}
        />
        {errors.comment && (
          <p className={styles.errorText}>{errors.comment.message}</p>
        )}
      </div>
      <button type="submit" className={styles.submitButton} disabled={!isValid}>
        send message
      </button>
    </form>
  );
};

export default ContactForm;
