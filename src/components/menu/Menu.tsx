import { useEffect, useRef } from 'react';
import styles from './Menu.module.scss';

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
        ×
      </button>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ab
        accusamus eligendi id. Repudiandae dolore, officiis sit aspernatur, quae
        commodi temporibus quibusdam illo ipsam eius assumenda iure ullam
        expedita odit?
      </p>
    </dialog>
  );
}
