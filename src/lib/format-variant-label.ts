export const formatVariantLabel = (size: string, color): string => {
  return color ? `${color} - ${size}` : size;
};
