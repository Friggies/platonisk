export const formatVariantLabel = (variantName: string): string => {
  const [, size] = variantName.split(' / ');

  const sizeMap: Record<string, string> = {
    xs: 'Ekstra Lille',
    s: 'Lille',
    m: 'Medium',
    l: 'Stor',
    xl: 'Ekstra Stor',
    '2xl': '2x Ekstra Stor',
  };

  const lowerSize = size?.toLowerCase();
  if (sizeMap[lowerSize]) {
    return sizeMap[lowerSize];
  }
  return size ? size : 'Størrelsesløs';
};
