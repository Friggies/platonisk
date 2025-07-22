import { useEffect, useRef } from 'react';
import styles from './Menu.module.scss';
import Link from 'next/link';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleAnimationEnd = (e: AnimationEvent) => {
      dialog.classList.remove(styles.hidden);
      dialog.close();
    };

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) {
        dialog.classList.add(styles.hidden);
        dialog.addEventListener('animationend', handleAnimationEnd, {
          once: true,
        });
      }
    }

    // Clean up if the component unmounts mid-animation
    return () => {
      dialog.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.menu}
      onClick={handleBackdropClick}
    >
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close menu"
      >
        &#x2715;
      </button>
      <Link href="/produkter">Produkter</Link>
      <Link href="/kollektioner">Kollektioner</Link>
      <Link href="/onskeliste">Blog</Link>
      <Link href="/levering">Levering</Link>
      <Link href="/kontakt">Kontakt</Link>
    </dialog>
  );
}
