export const formatVariantLabel = (variantName: string): string => {
  const [, size] = variantName.split(' / ');

  const sizeMap: Record<string, string> = {
    xs: 'Størrelse: XS',
    s: 'Størrelse: S',
    m: 'Størrelse: M',
    l: 'Størrelse: L',
    xl: 'Størrelse: XL',
    '2xl': 'Størrelse: 2XL',
    '3xl': 'Størrelse: 3XL',
    '4xl': 'Størrelse: 4XL',
  };

  const lowerSize = size?.toLowerCase();
  if (sizeMap[lowerSize]) {
    return sizeMap[lowerSize];
  }
  return size ? size : 'Størrelse: OS';
};
