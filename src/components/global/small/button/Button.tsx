import React from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';

type ButtonProps = {
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  filled?: boolean;
  title: string;
};

export default function Button({ link, onClick, filled, title }: ButtonProps) {
  const className = `${styles.button} ${filled ? styles.filled : ''}`.trim();

  if (link) {
    return (
      <Link href={link} className={className}>
        {title}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
}
