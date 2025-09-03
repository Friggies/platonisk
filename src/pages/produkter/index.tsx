import { NextSeo } from 'next-seo';
import ProductGrid from '../../components/product/ProductGrid';
import Section from '../../components/global/small/section/Section';
import { useMemo, useState } from 'react';
import SearchFilters from '../../components/search/SearchFilters';
import SearchContainer from '../../components/search/SearchContainer';
import SearchInput from '../../components/search/SearchInput';
import { getAllProducts } from '../../lib/get-all-products';
import FacetDropdown from '../../components/search/FacetDropdown';

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

function Index({ products }) {
  // derive filter options directly from product JSON
  const facets = useMemo(() => extractFacets(products), [products]);

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
      applyFilters(products, {
        query,
        categories,
        gender,
        colors,
        collections,
        materials,
        fits,
      }),
    [products, query, categories, gender, colors, collections, materials, fits]
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
        <SearchContainer>
          <SearchInput value={query} onChange={setQuery} />
          <SearchFilters>
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
          </SearchFilters>
        </SearchContainer>

        <div style={{ alignSelf: 'end' }}>
          <button type="button" onClick={clearAll} className="clearBtn">
            Nulstil filtre
          </button>
        </div>

        {chips.length > 0 && (
          <div className="chips" aria-label="Aktive filtre">
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
    </>
  );
}

export default Index;
