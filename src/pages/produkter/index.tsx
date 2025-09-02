import { NextSeo } from 'next-seo';
import ProductGrid from '../../components/product/ProductGrid';
import Section from '../../components/global/small/section/Section';
import { getAllProducts } from '../../lib/get-all-products';
import { useMemo, useState, useEffect, useRef } from 'react';
import localProducts from '../../data/products.json';

export const getStaticProps = async () => {
  const products = await getAllProducts();
  return {
    props: { products },
  };
};

// —— utilities ——
const dedupe = (arr = []) => Array.from(new Set(arr.filter(Boolean)));

const extractFacets = (products = []) => {
  const categories = dedupe(products.flatMap((p) => p.categories || []));
  const genders = dedupe(products.map((p) => p.gender));
  const colors = dedupe(products.map((p) => p.color));
  const collections = dedupe(products.map((p) => p.collection));
  const materials = dedupe(products.map((p) => p.material));
  const fits = dedupe(products.map((p) => p.fit));
  return { categories, genders, colors, collections, materials, fits };
};

const applyFilters = (
  products,
  { query, categories, gender, colors, collections, materials, fits }
) => {
  const q = (query || '').trim().toLowerCase();
  const hasAny = (arr = [], sel = []) =>
    sel.length ? arr.some((v) => sel.includes(v)) : true;
  const oneOf = (val, sel = []) => (sel.length ? sel.includes(val) : true);
  const genderMatch = (val, g) =>
    g ? String(val || '').toLowerCase() === String(g).toLowerCase() : true;

  return (products || []).filter((p) => {
    const text =
      `${p.name ?? ''} ${p.description ?? ''} ${p.slug ?? ''}`.toLowerCase();
    const matchQ = !q || text.includes(q);
    const matchCats = hasAny(p.categories || [], categories || []);
    const matchGender = genderMatch(p.gender, gender);
    const matchColor = oneOf(p.color || '', colors || []);
    const matchCollection = oneOf(p.collection || '', collections || []);
    const matchMaterial = oneOf(p.material || '', materials || []);
    const matchFit = oneOf(p.fit || '', fits || []);
    return (
      matchQ &&
      matchCats &&
      matchGender &&
      matchColor &&
      matchCollection &&
      matchMaterial &&
      matchFit
    );
  });
};

// —— simple input components ——
const QueryInput = ({ value, onChange }) => (
  <div>
    <label
      htmlFor="query"
      style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}
    >
      Søg
    </label>
    <input
      id="query"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Søg navn, beskrivelse, kategori..."
      style={{
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: 8,
      }}
    />
  </div>
);

// One reusable dropdown facet supporting single (radio) and multi (checkbox)
const FacetDropdown = ({
  title,
  options = [],
  selected,
  onChange,
  mode = 'multi',
}) => {
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
    <div className="facet" ref={ref}>
      <button
        type="button"
        className={`facetTrigger ${open ? 'open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="facetTitle">{title}</span>
        {(() => {
          const count = Array.isArray(selected)
            ? selected.length
            : selected
              ? 1
              : 0;
          return count ? (
            <span className="countBadge" aria-label={`${count} aktive filtre`}>
              {count}
            </span>
          ) : null;
        })()}
        <svg
          className="chev"
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
      </button>

      {open && (
        <div className="facetMenu" role="listbox" tabIndex={-1}>
          {!isMulti && (
            <label className="row">
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
            <label className="row" key={opt}>
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={`facet-${title}`}
                checked={isChecked(opt)}
                onChange={() => toggle(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}

          <div className="menuActions">
            <button type="button" className="clearBtn" onClick={clear}>
              Nulstil
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .facet {
          position: relative;
        }
        .facetTrigger {
          width: 100%;
          text-align: left;
          padding: 10px 12px;
          border: 1px solid #eee;
          border-radius: 10px;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: space-between;
        }
        .facetMenu {
          position: absolute;
          z-index: 20;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          max-height: 260px;
          overflow: auto;
          border: 1px solid #eee;
          border-radius: 10px;
          background: #fff;
          padding: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        .row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px;
        }
        .row:hover {
          background: #fafafa;
          border-radius: 8px;
        }
        .menuActions {
          display: flex;
          justify-content: flex-end;
          padding-top: 8px;
        }
        .countBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          border-radius: 999px;
          border: 1px solid #eee;
          font-size: 12px;
        }
        .chev {
          transition: transform 0.15s ease;
        }
        .facetTrigger.open .chev {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

function Index({ products }) {
  // fallback to local data if needed
  const allProducts =
    Array.isArray(products) && products.length ? products : localProducts;

  // derive filter options directly from product JSON
  const facets = useMemo(() => extractFacets(allProducts), [allProducts]);

  // —— states ——
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]); // multi
  const [gender, setGender] = useState(); // single
  const [colors, setColors] = useState([]); // multi
  const [collections, setCollections] = useState([]); // multi
  const [materials, setMaterials] = useState([]); // multi (adjust if you want single)
  const [fits, setFits] = useState([]); // multi

  const filtered = useMemo(
    () =>
      applyFilters(allProducts, {
        query,
        categories,
        gender,
        colors,
        collections,
        materials,
        fits,
      }),
    [
      allProducts,
      query,
      categories,
      gender,
      colors,
      collections,
      materials,
      fits,
    ]
  );

  const chips = useMemo(() => {
    const arr = [];
    if (query && query.trim())
      arr.push({
        key: `query:${query}`,
        label: `Søg: ${query}`,
        remove: () => setQuery(''),
      });
    (categories || []).forEach((v) =>
      arr.push({
        key: `cat:${v}`,
        label: `Kategori: ${v}`,
        remove: () => setCategories((prev) => prev.filter((x) => x !== v)),
      })
    );
    if (gender)
      arr.push({
        key: `gender:${gender}`,
        label: `Køn: ${gender}`,
        remove: () => setGender(undefined),
      });
    (colors || []).forEach((v) =>
      arr.push({
        key: `color:${v}`,
        label: `Farve: ${v}`,
        remove: () => setColors((prev) => prev.filter((x) => x !== v)),
      })
    );
    (collections || []).forEach((v) =>
      arr.push({
        key: `col:${v}`,
        label: `Kollektion: ${v}`,
        remove: () => setCollections((prev) => prev.filter((x) => x !== v)),
      })
    );
    (materials || []).forEach((v) =>
      arr.push({
        key: `mat:${v}`,
        label: `Materiale: ${v}`,
        remove: () => setMaterials((prev) => prev.filter((x) => x !== v)),
      })
    );
    (fits || []).forEach((v) =>
      arr.push({
        key: `fit:${v}`,
        label: `Fit: ${v}`,
        remove: () => setFits((prev) => prev.filter((x) => x !== v)),
      })
    );
    return arr;
  }, [query, categories, gender, colors, collections, materials, fits]);

  const clearAll = () => {
    setQuery('');
    setCategories([]);
    setGender(undefined);
    setColors([]);
    setCollections([]);
    setMaterials([]);
    setFits([]);
  };

  return (
    <>
      <NextSeo title="Alle Produkter" />
      <Section>
        <h1>Alle produkter</h1>

        {/* —— simple, auto‑generated filters —— */}
        <div className="filters">
          <QueryInput value={query} onChange={setQuery} />
          <FacetDropdown
            mode="multi"
            title="Kategorier"
            options={facets.categories}
            selected={categories}
            onChange={setCategories}
          />
          <FacetDropdown
            mode="single"
            title="Køn"
            options={facets.genders}
            selected={gender}
            onChange={setGender}
          />
          <FacetDropdown
            mode="multi"
            title="Farver"
            options={facets.colors}
            selected={colors}
            onChange={setColors}
          />
          <FacetDropdown
            mode="multi"
            title="Kollektioner"
            options={facets.collections}
            selected={collections}
            onChange={setCollections}
          />
          <FacetDropdown
            mode="multi"
            title="Materialer"
            options={facets.materials}
            selected={materials}
            onChange={setMaterials}
          />
          <FacetDropdown
            mode="multi"
            title="Fits"
            options={facets.fits}
            selected={fits}
            onChange={setFits}
          />

          <div style={{ alignSelf: 'end' }}>
            <button type="button" onClick={clearAll} className="clearBtn">
              Nulstil filtre
            </button>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="activeChips">
            {chips.map((c) => (
              <button
                key={c.key}
                className="chip"
                onClick={c.remove}
                aria-label={`Fjern ${c.label}`}
              >
                <span>{c.label}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3l6 6M9 3L3 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            ))}
            <button type="button" className="clearBtn small" onClick={clearAll}>
              Ryd alle
            </button>
          </div>
        )}

        <p style={{ opacity: 0.7, marginTop: 8 }}>
          {filtered.length} produkter
        </p>

        {/* Pass both filtered products and the active filters to the grid (in case it wants to display tags/badges) */}
        <ProductGrid products={filtered} />
      </Section>

      <style jsx>{`
        .filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin: 12px 0 8px;
        }
        fieldset {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 10px;
        }
        legend {
          padding: 0 4px;
          font-weight: 600;
        }
        .clearBtn {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #fff;
          cursor: pointer;
        }
        .clearBtn:hover {
          background: #f9f9f9;
        }
        .activeChips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 8px 0 12px;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border: 1px solid #ddd;
          border-radius: 999px;
          background: #fff;
          cursor: pointer;
        }
        .chip:hover {
          background: #f5f5f5;
        }
        .clearBtn.small {
          padding: 6px 10px;
          border-radius: 999px;
        }
      `}</style>
    </>
  );
}

export default Index;
