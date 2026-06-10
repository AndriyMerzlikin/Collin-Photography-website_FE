'use client';

import { Listbox } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './CategorySelect.module.scss';

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
};

const GenericSelect = <T extends string>({
  value,
  onChange,
  options,
}: Props<T>) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={styles.wrapper}>
        <Listbox.Button className={styles.button}>
          {selectedOption?.label}
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

export default GenericSelect;
