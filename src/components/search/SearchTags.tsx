import styles from './SearchTags.module.scss';

export default function SearchTags({ tags }) {
  return (
    <div className={styles.tags} aria-label="Aktive filtre">
      {tags.map((tag) => (
        <button
          key={tag.key}
          className={styles.tag}
          onClick={tag.remove}
          aria-label={`Fjern ${tag.label}`}
        >
          <span>{tag.label}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M3 3l6 6M9 3L3 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
