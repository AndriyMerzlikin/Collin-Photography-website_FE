import React, { JSX, ReactNode } from 'react';
import styles from './Typography.module.scss';

type TypographyProps = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'body-large'
    | 'body-medium'
    | 'body-small';
  children: ReactNode;
  className?: string;
  color?: string;
};

const Typography = ({
  variant = 'body-medium',
  children,
  className = '',
  color,
}: TypographyProps) => {
  const typographyClass = `${styles[variant]} ${className}`;
  const style = color ? { color } : {};

  const Tag = variant.startsWith('h')
    ? (variant as keyof JSX.IntrinsicElements)
    : 'p';

  return (
    <Tag className={typographyClass} style={style}>
      {children}
    </Tag>
  );
};

export default Typography;
