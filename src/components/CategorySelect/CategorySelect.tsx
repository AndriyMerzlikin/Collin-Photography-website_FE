'use client';

import { Listbox } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './CategorySelect.module.scss';
import { GalleryCategoryAll } from '@/types/galleryTypes';

const options: { value: GalleryCategoryAll; label: string }[] = [
  { value: 'all', label: 'all categories' },
  { value: 'birds', label: 'birds' },
  { value: 'landscape', label: 'landscape' },
  { value: 'mammals', label: 'mammals' },
];

type Props = {
  value: GalleryCategoryAll;
  onChange: (value: GalleryCategoryAll) => void;
};

const CategorySelect = ({ value, onChange }: Props) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={styles.wrapper}>
        <Listbox.Button className={styles.button}>
          {selectedOption?.label || value}
          <FiChevronDown className={styles.icon} />
        </Listbox.Button>
        <Listbox.Options className={styles.options}>
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={styles.option}
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default CategorySelect;
