import styles from './searchInput.module.scss';

export default function SearchInput({ value, onChange }) {
  return (
    <div className={styles.input}>
      <label htmlFor="query">Søg</label>
      <input
        id="query"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Søg produktnavn, beskrivelse, kategori..."
      />
    </div>
  );
}
