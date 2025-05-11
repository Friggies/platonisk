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

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
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
        aria-label="Luk menu"
      >
        ×
      </button>
      {/* TODO: Add menu items here */}
    </dialog>
  );
}
