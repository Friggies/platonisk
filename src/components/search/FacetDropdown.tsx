import { useEffect, useRef, useState } from 'react';
import styles from './FacetDropdown.module.scss';

export default function FacetDropdown({
  title,
  options = [],
  selected,
  onChange,
  mode = 'multi',
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const isMulti = mode !== 'single';
  const isChecked = (opt) =>
    isMulti
      ? Array.isArray(selected) && selected.includes(opt)
      : selected === opt;

  const toggle = (opt) => {
    if (isMulti) {
      const set = new Set(Array.isArray(selected) ? selected : []);
      set.has(opt) ? set.delete(opt) : set.add(opt);
      onChange(Array.from(set));
    } else {
      onChange(selected === opt ? undefined : opt);
      setOpen(false);
    }
  };

  const clear = (e) => {
    e.stopPropagation();
    onChange(isMulti ? [] : undefined);
  };

  return (
    <div className={styles.facet} ref={ref}>
      <button
        type="button"
        className={`${styles.facetTrigger} ${open && styles.open}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.facetTitle}>{title}</span>
        {(() => {
          const count = Array.isArray(selected)
            ? selected.length
            : selected
              ? 1
              : 0;
          return count ? (
            <span aria-label={`${count} aktive filtre`}>({count})</span>
          ) : (
            <svg
              className={styles.chev}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        })()}
      </button>

      {open && (
        <div className={styles.facetMenu} role="listbox">
          {!isMulti && (
            <label className={styles.row}>
              <input
                type="radio"
                name={`facet-${title}`}
                checked={selected == null}
                onChange={() => onChange(undefined)}
              />
              <span>Alle</span>
            </label>
          )}

          {options.map((opt) => (
            <label className={styles.row} key={opt}>
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={`facet-${title}`}
                checked={isChecked(opt)}
                onChange={() => toggle(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}

          <div className={styles.menuActions}>
            <button type="button" onClick={clear}>
              Nulstil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
