import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon } from 'lucide-react';
import styles from './SearchInput.module.scss';

export default function SearchInput({
  value,
  onChange,
  setShowFilters,
  showFilters,
}) {
  return (
    <div className={styles.input}>
      <input
        id="query"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Søg produktnavn, beskrivelse, kategori..."
      />
      <label htmlFor="query">Søg</label>
      <button
        className={styles.sortbutton}
        onClick={() => setShowFilters((prev) => !prev)}
        aria-label="Skjul/vis filtre"
      >
        {!showFilters ? (
          <ArrowDownWideNarrowIcon size={16} />
        ) : (
          <ArrowUpWideNarrowIcon size={16} />
        )}
      </button>
    </div>
  );
}
